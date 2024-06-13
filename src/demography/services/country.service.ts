import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from '../../users/interfaces';
import { CreateCountryDTO } from '../dto/country/create-country.dto';
import { UpdateCountryDTO } from '../dto/country/update-country.dto';
import { CountryDTO } from '../dto/country/country.dto';
import { ICountry, IPaginatedCountry } from '../interfaces';
import { SearchQueryDTO } from '../../common/dto';
import { createSearchQuery } from '../../common/utils/helper';
import { Country } from 'country-state-city';
import { CountryWithContinents } from '../../common/mock/country-with-continents';
import { Continent } from '../../common/mock/constant.mock';
/**
 * Country Service
 */
@Injectable()
export class CountryService {
  private readonly logger = new Logger(CountryService.name);
  /**
   * Constructor
   * @param {Model<ICountry>} countryModel
   * @param {Service<HttpService>} httpService
   */
  constructor(
    @InjectModel('Country')
    private readonly countryModel: Model<ICountry>,
    private readonly httpService: HttpService,
  ) {}

  /**
   * Create country
   * @param {IUser} user
   * @param {CreateCountryDTO} createCountryDTO
   * @returns {Promise<ICountry>}
   */
  async create(
    user: IUser,
    createCountryDTO: CreateCountryDTO,
  ): Promise<ICountry> {
    try {
      const country = await this.countryModel.findOne({
        name: createCountryDTO.name,
      });
      const countryDTO = new CountryDTO();
      if (!country) {
        // countryDTO.cBy = user._id;
        countryDTO.cBy = 'roomeyrahman@gmail.com';
        const setCountry = { ...createCountryDTO, ...countryDTO };
        const registerDoc = new this.countryModel(setCountry);
        return registerDoc.save();
      } else {
        if (country.isDeleted === true) {
          countryDTO.isDeleted = false;
          const setcountry = { ...createCountryDTO, ...countryDTO };
          return await country.set(setcountry).save();
        } else {
          return Promise.reject(new ConflictException('Country already exist'));
        }
      }
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Edit country
   * @param {string} id
   * @param {UpdateCountryDTO} updateCountryDTO
   * @param {IUser} user
   * @returns {Promise<ICountry>} mutated country data
   */
  async update(
    id: string,
    updateCountryDTO: UpdateCountryDTO,
    user: IUser,
  ): Promise<ICountry> {
    try {
      const country = await this.countryModel.findOne({
        _id: id,
        isDeleted: false,
      });
      if (!country) {
        return Promise.reject(new NotFoundException('Could not find country.'));
      }
      const countryDTO = new CountryDTO();
      countryDTO.uBy = user._id;
      countryDTO.uTime = Date.now();
      const setCountry = { ...updateCountryDTO, ...countryDTO };

      return await country.set(setCountry).save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Fetches countries
   * @returns {Promise<IPaginatedCountry>}
   */
  public async findAll(query: SearchQueryDTO): Promise<IPaginatedCountry> {
    try {
      const searchQuery = createSearchQuery(query);
      const limit: number = (query && query.limit) || 10;
      const skip: number = (query && query.skip) || 0;

      const cursor = this.countryModel.find(searchQuery).sort('name ASC');

      if (query.hasOwnProperty('sort') && query.sort) {
        cursor.sort(JSON.parse(query.sort));
      }

      const result: IPaginatedCountry = {
        data: await cursor
          .populate({
            path: 'states',
            populate: {
              path: 'cities',
            },
          })
          .limit(limit)
          .skip(skip),
      };

      if (query.pagination) {
        result.pagination = {
          total: await this.countryModel.countDocuments(searchQuery),
          limit,
          skip,
        };
      }
      return result;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Bulk insert country
   * @param {IUser} user
   * @returns {Promise<ICountry>}
   */
  async bulkInsert(user: IUser) {
    try {
      const url = `http://api.worldbank.org/v2/country?format=json&per_page=300`;
      const res = await this.httpService.axiosRef.get(url);
      const urlWithFlag =
        'http://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/index.json';
      const resWithFlag = await this.httpService.axiosRef.get(urlWithFlag);
      const countrySource1 = res.data[1];
      const countrySource2 = Country.getAllCountries();
      const countrySource3 = resWithFlag.data;
      for (let i = 0; i < countrySource1.length; i += 1) {
        if (countrySource1[i].capitalCity == '') {
          continue;
        }
        delete countrySource1[i].region.id;
        delete countrySource1[i].incomeLevel.id;
        const countryDTO = new CreateCountryDTO();
        countryDTO.name = countrySource1[i].name;
        countryDTO.iso2code = countrySource1[i].iso2Code;
        const countryContinent = CountryWithContinents.find(
          (item) => item.country === countryDTO.name,
        );
        countryContinent?.continent &&
          countryContinent?.continent &&
          (countryDTO.continent =
            Continent[
              countryContinent.continent.split(' ').join('_').toUpperCase()
            ]);
        countryDTO.region = countrySource1[i].region;
        countryDTO.incomeLevel = countrySource1[i].incomeLevel;
        countryDTO.capitalCity = countrySource1[i].capitalCity;
        countryDTO.lat = countrySource1[i].latitude;
        countryDTO.lng = countrySource1[i].longitude;
        const moreInfo = countrySource2.find(
          (country) => country.isoCode === countryDTO.iso2code,
        );
        moreInfo?.phonecode && (countryDTO.dialingCode = moreInfo?.phonecode);
        moreInfo?.currency && (countryDTO.currency = moreInfo?.currency);
        moreInfo?.timezones && (countryDTO.timezones = moreInfo?.timezones);
        const flagInfo = countrySource3.find(
          (country) => country.code === countryDTO.iso2code,
        );
        flagInfo?.emoji && (countryDTO.flagEmoji = flagInfo?.emoji);
        flagInfo?.unicode && (countryDTO.emojiUnicode = flagInfo?.unicode);
        flagInfo?.image && (countryDTO.flag = flagInfo?.image);
        await this.create(user, countryDTO);
      }
      return {
        data: {
          result: 'SUCCESS',
        },
      };
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
}

import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from '../../users/interfaces';
import { ICity, ICountry, IPaginatedCity, IState } from '../interfaces';
import { UpdateCityDTO } from '../dto/city/update-city.dto';
import { CitySearchQueryDTO } from '../dto/city/city-search-query.dto';
import { CreateCityDTO } from '../dto/city/create-city.dto';
import { CityDTO } from '../dto/city/city.dto';
import { createSearchQuery } from '../../common/utils/helper';
import { City } from 'country-state-city';

/**
 * State Service
 */
@Injectable()
export class CityService {
  /**
   * Constructor
   * @param {Model<ICity>} cityModel
   * @param {Model<IState>} stateModel
   * @param {Model<ICountry>} countryModel
   */
  constructor(
    @InjectModel('City')
    private readonly cityModel: Model<ICity>,
    @InjectModel('State')
    private readonly stateModel: Model<IState>,
    @InjectModel('Country')
    private readonly countryModel: Model<ICountry>,
  ) {}

  /**
   * Create state
   * @param {IUser} user
   * @param {CreateCityDTO} createCityDTO
   * @returns {Promise<ICity>}
   */
  async create(user: IUser, createCityDTO: CreateCityDTO): Promise<ICity> {
    try {
      const city = await this.cityModel.findOne({ name: createCityDTO.name });
      const cityDTO = new CityDTO();
      if (!city) {
        // cityDTO.cBy = user._id;
        cityDTO.cBy = 'roomeyrahman@gmail.com';
        const setCity = { ...createCityDTO, ...cityDTO };
        const registerDoc = new this.cityModel(setCity);
        return registerDoc.save();
      } else {
        if (city.isDeleted === true) {
          cityDTO.isDeleted = false;
          const setCity = { ...createCityDTO, ...cityDTO };
          return await city.set(setCity).save();
        } else {
          return Promise.reject(new ConflictException('City already exist'));
        }
      }
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Edit city
   * @param {string} id
   * @param {UpdateCityDTO} updateCityDTO
   * @returns {Promise<ICity>} mutated city data
   */
  async update(id: string, updateCityDTO: UpdateCityDTO): Promise<ICity> {
    try {
      const city = await this.cityModel.findOne({ _id: id, isDeleted: false });
      if (!city) {
        return Promise.reject(new NotFoundException('Could not find city.'));
      }
      const cityDTO = new CityDTO();
      const setCity = { ...updateCityDTO, ...cityDTO };

      return await city.set(setCity).save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Fetches cities
   * @returns {Promise<IPaginatedCity>}
   */
  async findAll(query: CitySearchQueryDTO): Promise<IPaginatedCity> {
    try {
      const searchQuery = createSearchQuery(query);
      const limit: number = (query && query.limit) || 10;
      const skip: number = (query && query.skip) || 0;

      const cursor = this.cityModel.find(searchQuery).sort('name ASC');

      if (query.hasOwnProperty('sort') && query.sort) {
        cursor.sort(JSON.parse(query.sort));
      }

      const result: IPaginatedCity = {
        data: await cursor
          .populate('state')
          .populate('country')
          .limit(limit)
          .skip(skip)
          .exec(),
      };

      if (query.pagination) {
        result.pagination = {
          total: await this.cityModel.countDocuments(searchQuery),
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
   * find city by cityId
   * @param {string} id
   * @returns {Promise<ICity>}
   */
  async findOne(id: string): Promise<ICity> {
    try {
      const city = await this.cityModel
        .findOne({ _id: id })
        .populate({
          path: 'cities',
        })
        .populate('state')
        .exec();
      if (!city) {
        return Promise.reject(new NotFoundException('Could not find city.'));
      }
      return city;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Bulk insert cities
   * @param {IUser} user
   * @returns {Promise<ICity[]>}
   */
  async bulkInsert(user: IUser) {
    try {
      const dataSources = City.getAllCities();
      for (let i = 0; i < dataSources.length; i += 1) {
        const country = await this.countryModel
          .findOne({
            iso2code: dataSources[i].countryCode,
          })
          .select({ _id: 1 })
          .lean();
        if (!country) {
          continue;
        }
        const state = await this.stateModel
          .findOne({
            iso2code: dataSources[i].stateCode,
            country: country._id,
          })
          .select({ _id: 1 })
          .lean();
        if (!state) {
          continue;
        }
        const cityDTO = new CreateCityDTO();
        cityDTO.name = dataSources[i].name;
        cityDTO.lat = Number(dataSources[i].latitude);
        cityDTO.lng = Number(dataSources[i].longitude);
        cityDTO.country = country._id;
        cityDTO.state = state._id;
        const isFound = await this.cityModel
          .findOne({
            name: cityDTO.name,
            state: cityDTO.state,
          })
          .select({ _id: 1 })
          .lean();
        if (isFound) {
          continue;
        }
        await this.create(user, cityDTO);
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

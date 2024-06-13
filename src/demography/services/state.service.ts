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
import { IPaginatedState, IState, ICountry } from '../interfaces';
import { CreateStateDTO } from '../dto/state/create-state.dto';
import { UpdateStateDTO } from '../dto/state/update-state.dto';
import { StateDTO } from '../dto/state/state.dto';
import { StateSearchQueryDTO } from '../dto/state/state-search-query.dto';
import { createSearchQuery } from '../../common/utils/helper';
import { State } from 'country-state-city';

/**
 * State Service
 */
@Injectable()
export class StateService {
  /**
   * Constructor
   * @param {Model<IState>} stateModel
   * @param {Model<ICountry>} countryModel
   */
  constructor(
    @InjectModel('State')
    private readonly stateModel: Model<IState>,
    @InjectModel('Country')
    private readonly countryModel: Model<ICountry>,
  ) {}

  /**
   * Create state
   * @param {IUser} user
   * @param {CreateStateDTO} createStateDTO
   * @returns {Promise<IState>}
   */
  async create(user: IUser, createStateDTO: CreateStateDTO): Promise<IState> {
    try {
      const state = await this.stateModel.findOne({
        name: createStateDTO.name,
      });
      const stateDTO = new StateDTO();
      if (!state) {
        // stateDTO.cBy = user._id;
        stateDTO.cBy = 'roomeyrahman@gmail.com';
        const setState = { ...createStateDTO, ...stateDTO };
        const registerDoc = new this.stateModel(setState);
        return registerDoc.save();
      } else {
        if (state.isDeleted === true) {
          stateDTO.isDeleted = false;
          const setState = { ...createStateDTO, ...stateDTO };
          return await state.set(setState).save();
        } else {
          return Promise.reject(new ConflictException('State already exist'));
        }
      }
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Edit state
   * @param {string} id
   * @param {UpdateStateDTO} updateStateDTO
   * @returns {Promise<IState>} mutated state data
   */
  async update(id: string, updateStateDTO: UpdateStateDTO): Promise<IState> {
    try {
      const state = await this.stateModel.findOne({
        _id: id,
        isDeleted: false,
      });
      if (!state) {
        return Promise.reject(new NotFoundException('Could not find state.'));
      }
      const stateDTO = new StateDTO();
      const setState = { ...updateStateDTO, ...stateDTO };

      return await state.set(setState).save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Fetches states
   * @returns {Promise<IPaginatedState>}
   */
  async findAll(query: StateSearchQueryDTO): Promise<IPaginatedState> {
    try {
      const searchQuery = createSearchQuery(query);
      const limit: number = (query && query.limit) || 10;
      const skip: number = (query && query.skip) || 0;

      const cursor = this.stateModel.find(searchQuery).sort('name ASC');

      if (query.hasOwnProperty('sort') && query.sort) {
        cursor.sort(JSON.parse(query.sort));
      }

      const result: IPaginatedState = {
        data: await cursor
          .populate('cities')
          .populate('country')
          .limit(limit)
          .skip(skip),
      };

      if (query.pagination) {
        result.pagination = {
          total: await this.stateModel.countDocuments(searchQuery),
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
   * find state by stateId
   * @param {string} id
   * @returns {Promise<IState>}
   */
  async findOne(id: string): Promise<IState> {
    try {
      const state = await this.stateModel
        .findOne({ _id: id })
        .populate({
          path: 'cities',
        })
        .populate('country')
        .exec();
      if (!state) {
        return Promise.reject(new NotFoundException('Could not find state.'));
      }
      return state;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Bulk insert states
   * @param {IUser} user
   * @returns {Promise<IState[]>}
   */
  async bulkInsert(user: IUser) {
    try {
      const dataSources = State.getAllStates();
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
        const stateDTO = new CreateStateDTO();
        stateDTO.name = dataSources[i].name;
        stateDTO.iso2code = dataSources[i].isoCode;
        stateDTO.lat = Number(dataSources[i].latitude);
        stateDTO.lng = Number(dataSources[i].longitude);
        stateDTO.country = country._id;
        await this.create(user, stateDTO);
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

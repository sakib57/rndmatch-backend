import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/users/interfaces';
import * as moment from 'moment-timezone';
import { IPaginatePositions, IPosition } from '../interfaces';
import {
  CreatePositionDTO,
  PositionDTO,
  SearchPositionDTO,
  UpdatePositionDTO,
} from '../dto';
import { createSearchQuery } from 'src/common/utils/helper';

@Injectable()
export class PositionService {
  /**
   * Constructor
   * @param {Model<IPosition>} positionModel
   */
  constructor(
    @InjectModel('Position')
    private readonly positionModel: Model<IPosition>,
  ) {}

  /**
   * Create Position
   * @param {IUser} user
   * @param {CreatePositionDTO} cPositionDTO
   * @returns {Promise<IPosition>}
   */
  async create(
    user: IUser,
    cPositionDTO: CreatePositionDTO,
  ): Promise<IPosition> {
    try {
      const positionDTO = new PositionDTO();
      positionDTO.cBy = user._id;
      positionDTO.cTime =
        (cPositionDTO?.timezone &&
          moment().tz(cPositionDTO.timezone).valueOf()) ||
        Date.now();
      const setPosition = { ...cPositionDTO, ...positionDTO };
      const registerDoc = new this.positionModel(setPosition);
      return await registerDoc.save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Update Position
   * @param {IUser} user
   * @param {string} id
   * @param {UpdatePositionDTO} uPositionDTO
   * @returns {Promise<IPositions>}
   */
  async update(
    user: IUser,
    id: string,
    uPositionDTO: UpdatePositionDTO,
  ): Promise<IPosition> {
    try {
      const position = await this.positionModel.findOne({ _id: id });
      if (!position) {
        return Promise.reject(
          new NotFoundException('Could not find position.'),
        );
      }
      const positionDTO = new PositionDTO();
      positionDTO.uBy = user._id;
      positionDTO.uTime =
        (uPositionDTO?.timezone &&
          moment().tz(uPositionDTO.timezone).valueOf()) ||
        Date.now();
      const setPosition = { ...uPositionDTO, ...positionDTO };
      console.log(setPosition);
      return await position.set(setPosition).save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Find All Position
   * @param {SearchPositionDTO} query
   * @returns {Promise<IPaginatePositions>}
   */
  async findAll(query: SearchPositionDTO): Promise<IPaginatePositions> {
    try {
      const searchQuery = createSearchQuery(query);
      const limit: number = (query && query.limit) || 10;
      const skip: number = (query && query.skip) || 0;

      let cursor;
      if (query.hasOwnProperty('groupBy') && query.groupBy) {
        cursor = this.positionModel.aggregate([
          {
            $match: searchQuery,
          },
          {
            $group: {
              _id: `$${query.groupBy}`,
              data: { $push: '$$ROOT' },
            },
          },

          {
            $project: {
              'data._id': 1,
              'data.name': 1,
            },
          },
        ]);
      } else {
        cursor = this.positionModel
          .find(searchQuery)
          .populate([
            {
              path: 'discipline',
            },
            {
              path: 'field',
            },
          ])
          .limit(limit)
          .skip(skip);
      }

      if (query.hasOwnProperty('sort') && query.sort) {
        cursor.sort(JSON.parse(query.sort));
      }

      const result: IPaginatePositions = {
        data: {
          positions: await cursor.exec(),
        },
      };

      if (query.pagination) {
        result.pagination = {
          total: await this.positionModel.countDocuments(searchQuery),
          limit,
          skip,
        };
      }
      return result;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
}

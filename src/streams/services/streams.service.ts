import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateStreamDTO,
  SearchStreamDTO,
  StreamDTO,
  UpdateStreamDTO,
} from '../dto';
import { IPaginateStream, IStreams } from '../interfaces';
import * as moment from 'moment-timezone';
import { IUser } from 'src/users/interfaces';
import { createSearchQuery } from 'src/common/utils/helper';

@Injectable()
export class StreamsService {
  /**
   * Constructor
   * @param {Model<IStreams>} streamModel
   */
  constructor(
    @InjectModel('Stream')
    private readonly streamModel: Model<IStreams>,
  ) {}

  /**
   * Create stream
   * @param {IUser} user
   * @param {CreateStreamDTO} cDTO
   * @returns {Promise<ISkills>}
   */
  async create(user: IUser, cDTO: CreateStreamDTO): Promise<IStreams> {
    try {
      const stream = await this.streamModel.findOne({
        name: cDTO.name,
        user: user._id,
      });
      const streamDTO = new StreamDTO();
      if (!stream) {
        streamDTO.user = user._id;
        streamDTO.cBy = user._id;
        streamDTO.cTime =
          (cDTO?.timezone && moment().tz(cDTO.timezone).valueOf()) ||
          Date.now();
        const setStream = { ...cDTO, ...streamDTO };
        const registerDoc = new this.streamModel(setStream);
        return await registerDoc.save();
      } else {
        if (stream.isDeleted === true) {
          streamDTO.isDeleted = false;
          const setStream = { ...cDTO, ...streamDTO };
          return await stream.set(setStream).save();
        } else {
          return Promise.reject(new ConflictException('Stream already exist'));
        }
      }
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Update stream
   * @param {IUser} user
   * @param {string} id
   * @param {UpdateStreamDTO} uDTO
   * @returns {Promise<IStreams>}
   */
  async update(
    user: IUser,
    id: string,
    uDTO: UpdateStreamDTO,
  ): Promise<IStreams> {
    try {
      const stream = await this.streamModel.findOne({
        _id: id,
        isDeleted: false,
      });
      if (!stream) {
        return Promise.reject(new NotFoundException('Could not find stream.'));
      }
      const streamDTO = new StreamDTO();
      streamDTO.uBy = user._id;
      streamDTO.uTime =
        (uDTO?.timezone && moment().tz(uDTO.timezone).valueOf()) || Date.now();
      const setStream = { ...uDTO, ...streamDTO };
      return await stream.set(setStream).save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Find All stream
   * @param {SearchSkillDTO} query
   * @returns {Promise<IPaginateStream>}
   */
  async findAll(user: IUser, query: SearchStreamDTO): Promise<IPaginateStream> {
    try {
      const searchQuery: any = {
        isActive: true,
        isDeleted: false,
        user: user._id,
      };
      const limit: number = (query && query.limit) || 10;
      const skip: number = (query && query.skip) || 0;

      const cursor = !query.getAllRecord
        ? this.streamModel.find(searchQuery).limit(limit).skip(skip)
        : this.streamModel.find(searchQuery);
      if (query.hasOwnProperty('sort') && query.sort) {
        cursor.sort(JSON.parse(query.sort));
      }

      const result: IPaginateStream = {
        data: {
          streams: await cursor.exec(),
        },
      };

      if (query.pagination) {
        result.pagination = {
          total: await this.streamModel.countDocuments(searchQuery),
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
   * Find one stream
   * @param {string} id
   * @returns {Promise<IStreams>}
   */
  async findOne(id: string): Promise<IStreams> {
    try {
      return this.streamModel.findOne({ _id: id });
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /** Delete stream
   * @param {IUser} user
   * @param {string} id
   * @returns {Promise<IStreams>}
   **/
  async delete(id: string, user: IUser): Promise<IStreams> {
    try {
      const stream = await this.streamModel.findOne({ _id: id });
      if (!stream) {
        return Promise.reject(new NotFoundException('Could not find stream.'));
      }
      const streamDTO = new StreamDTO();
      streamDTO.isDeleted = true;
      streamDTO.isActive = false;
      streamDTO.dBy = user._id;
      streamDTO.dTime = Date.now();

      return await stream.set(streamDTO).save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * count stream
   * @returns {Promise<number>}
   */
  async count(query: SearchStreamDTO): Promise<number> {
    try {
      const searchQuery = createSearchQuery(query);
      return await this.streamModel.countDocuments(searchQuery);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
}

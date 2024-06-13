import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from '../../users/interfaces';
import { CreateSavedDTO, SavedDTO, UpdateSavedDTO } from '../dto';
import { ISaved } from '../interfaces/saved.interface';
import * as moment from 'moment-timezone';
import { SearchQueryDTO } from 'src/common/dto';

/**
 * Saved Service
 */
@Injectable()
export class SavedService {
  /**
   * Constructor
   * @param {Model<ISaved>} savedModel
   * @param {Model<ChatService>} chatService
   */
  constructor(
    @InjectModel('Saved')
    private readonly savedModel: Model<ISaved>,
  ) {}

  /**
   * Create Saved
   * @param {IUser} user
   * @param {CreateSavedDTO} cSavedDTO
   * @returns {Promise<IMessageTemplate>}
   */
  async create(user: IUser, cSavedDTO: CreateSavedDTO): Promise<ISaved> {
    try {
      const savedDTO = new SavedDTO();
      savedDTO.cBy = user._id;
      savedDTO.cTime =
        (cSavedDTO?.timezone && moment().tz(cSavedDTO.timezone).valueOf()) ||
        Date.now();
      const setSaved = {
        ...cSavedDTO,
        ...savedDTO,
      };
      const registerDoc = new this.savedModel(setSaved);
      return await registerDoc.save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Update Saved
   * @param {IUser} user
   * @param {string} id
   * @param {UpdateSavedDTO} uSavedDTO
   * @returns {Promise<ISaved>}
   */
  async update(
    user: IUser,
    id: string,
    uSavedDTO: UpdateSavedDTO,
  ): Promise<ISaved> {
    try {
      const saved = await this.savedModel.findOne({
        _id: id,
      });
      if (!saved) {
        return Promise.reject(new NotFoundException('Could not find Saved.'));
      }
      const savedDTO = new SavedDTO();

      savedDTO.uBy = user._id;
      savedDTO.uTime =
        (uSavedDTO?.timezone && moment().tz(uSavedDTO.timezone).valueOf()) ||
        Date.now();
      const setPackage = { ...uSavedDTO, ...savedDTO };

      return await saved.set(setPackage).save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Find All Saved
   * @returns {Promise<ISaved[]>}
   */
  async findAll(query: SearchQueryDTO): Promise<ISaved[]> {
    try {
      if (!query) {
        return Promise.reject(new NotFoundException('User not found.'));
      }
      const result = await this.savedModel.find(query).populate({
        path: 'job',
        populate: {
          path: 'postBy',
          populate: {
            path: 'profile',
          },
        },
      });
      return result;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /** Delete Saved
   * @param {string} id
   * @returns {Promise<ISaved>}
   **/
  async delete(id: string): Promise<ISaved> {
    try {
      const saved = await this.savedModel.findOne({ _id: id });
      if (!saved) {
        return Promise.reject(new NotFoundException('Could not find Saved.'));
      }
      return await saved.delete();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
}

import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment-timezone';
import { Model } from 'mongoose';
import { SearchQueryDTO } from 'src/common/dto';
import { IUser } from '../../users/interfaces';
import { CreateHideDTO, HideDTO, UpdateHideDTO } from '../dto';
import { IHide } from '../interfaces/hide.interface';

/**
 * Hide Service
 */
@Injectable()
export class HideService {
  /**
   * Constructor
   * @param {Model<IHide>} HideModel
   * @param {Model<ChatService>} chatService
   */
  constructor(
    @InjectModel('Hide')
    private readonly hideModel: Model<IHide>,
  ) {}

  /**
   * Create Hide
   * @param {IUser} user
   * @param {CreateHideDTO} cHideDTO
   * @returns {Promise<IMessageTemplate>}
   */
  async create(user: IUser, cHideDTO: CreateHideDTO): Promise<IHide> {
    try {
      const hideDTO = new HideDTO();
      hideDTO.cBy = user._id;
      hideDTO.cTime =
        (cHideDTO?.timezone && moment().tz(cHideDTO.timezone).valueOf()) ||
        Date.now();
      const setHide = {
        ...cHideDTO,
        ...HideDTO,
      };
      const registerDoc = new this.hideModel(setHide);
      return await registerDoc.save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Update Hide
   * @param {IUser} user
   * @param {string} id
   * @param {UpdateHideDTO} uHideDTO
   * @returns {Promise<IHide>}
   */
  async update(
    user: IUser,
    id: string,
    uHideDTO: UpdateHideDTO,
  ): Promise<IHide> {
    try {
      const hide = await this.hideModel.findOne({
        _id: id,
      });
      if (!hide) {
        return Promise.reject(new NotFoundException('Could not find Hide.'));
      }
      const hideDTO = new HideDTO();

      hideDTO.uBy = user._id;
      hideDTO.uTime =
        (uHideDTO?.timezone && moment().tz(uHideDTO.timezone).valueOf()) ||
        Date.now();
      const setHide = { ...uHideDTO, ...HideDTO };

      return await hide.set(setHide).save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Find All Hide
   * @returns {Promise<IHide[]>}
   */
  async findAll(query: SearchQueryDTO): Promise<IHide[]> {
    try {
      if (!query) {
        return Promise.reject(new NotFoundException('User not found.'));
      }
      const result = await this.hideModel.find(query).populate({
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

  /** Delete Hide
   * @param {string} id
   * @returns {Promise<IHide>}
   **/
  async delete(id: string): Promise<IHide> {
    try {
      const hide = await this.hideModel.findOne({ _id: id });
      if (!hide) {
        return Promise.reject(new NotFoundException('Could not find Hide.'));
      }
      return await hide.delete();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
}

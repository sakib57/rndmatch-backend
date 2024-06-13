import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from '../../users/interfaces';
import {
  CreateMessageTemplateDTO,
  MessageTemplateDTO,
  SearchMessageTemplateDTO,
  UpdateMessageTemplateDTO,
} from '../dto';
import { IMessageTemplate } from '../interfaces/message-template.interface';
import * as moment from 'moment-timezone';
import { createSearchQuery } from 'src/common/utils/helper';
import { IPaginateMessageTemplate } from '../interfaces/paginate.interface';

@Injectable()
export class MessageTemplatesService {
  /**
   * Constructor
   * @param {Model<IMessageTemplate>} messageTemplateModel
   */
  constructor(
    @InjectModel('MessageTemplate')
    private readonly messageTemplateModel: Model<IMessageTemplate>,
  ) {}

  /**
   * Create Message Template
   * @param {IUser} user
   * @param {CreatemessageTemplateDTO} cMessageTemplateDTO
   * @returns {Promise<IMessageTemplate>}
   */
  async create(
    user: IUser,
    cMessageTemplateDTO: CreateMessageTemplateDTO,
  ): Promise<IMessageTemplate> {
    try {
      const messageTemplateDTO = new MessageTemplateDTO();
      messageTemplateDTO.cBy = user._id;
      messageTemplateDTO.cTime =
        (cMessageTemplateDTO?.timezone &&
          moment().tz(cMessageTemplateDTO.timezone).valueOf()) ||
        Date.now();
      const setMessageTemplate = {
        ...cMessageTemplateDTO,
        ...messageTemplateDTO,
      };
      const registerDoc = new this.messageTemplateModel(setMessageTemplate);
      return await registerDoc.save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Update Message Template
   * @param {IUser} user
   * @param {string} id
   * @param {UpdatemessageTemplateDTO} uMessageTemplateDTO
   * @returns {Promise<IMessageTemplate>}
   */
  async update(
    user: IUser,
    id: string,
    uMessageTemplateDTO: UpdateMessageTemplateDTO,
  ): Promise<IMessageTemplate> {
    try {
      const _messageTemplate = await this.messageTemplateModel.findOne({
        _id: id,
        isDeleted: false,
      });
      if (!_messageTemplate) {
        return Promise.reject(
          new NotFoundException('Could not find message template.'),
        );
      }
      const messageTemplateDTO = new MessageTemplateDTO();

      messageTemplateDTO.uBy = user._id;
      messageTemplateDTO.uTime =
        (uMessageTemplateDTO?.timezone &&
          moment().tz(uMessageTemplateDTO.timezone).valueOf()) ||
        Date.now();
      const setMessageTemplate = {
        ...uMessageTemplateDTO,
        ...messageTemplateDTO,
      };

      return await _messageTemplate.set(setMessageTemplate).save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Find All Message Template
   * @param {SearchmessageTemplateDTO} query
   * @returns {Promise<IPaginateMessageTemplate>}
   */
  async findAll(
    query: SearchMessageTemplateDTO,
  ): Promise<IPaginateMessageTemplate> {
    try {
      const searchQuery = createSearchQuery(query);
      const limit: number = (query && query.limit) || 10;
      const skip: number = (query && query.skip) || 0;

      const cursor = this.messageTemplateModel
        .find(searchQuery)
        .limit(limit)
        .skip(skip);
      if (query.hasOwnProperty('sort') && query.sort) {
        cursor.sort(JSON.parse(query.sort));
      }

      const result: IPaginateMessageTemplate = {
        data: await cursor.exec(),
      };

      if (query.pagination) {
        result.pagination = {
          total: await this.messageTemplateModel.countDocuments(searchQuery),
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
   * Find one Message Template
   * @param {string} id
   * @returns {Promise<IMessageTemplate>}
   */
  async findOne(id: string): Promise<IMessageTemplate> {
    try {
      let res = null;
      res = await this.messageTemplateModel.findOne({
        _id: id,
        isDeleted: false,
      });

      if (!res) {
        return Promise.reject(
          new NotFoundException('Could not find message template.'),
        );
      }
      return res;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /** Delete Message Template
   * @param {IUser} user
   * @param {string} id
   * @returns {Promise<IMessageTemplate>}
   **/
  async delete(id: string, user: IUser): Promise<IMessageTemplate> {
    try {
      const _messageTemplate = await this.messageTemplateModel.findOne({
        _id: id,
      });
      if (!_messageTemplate) {
        return Promise.reject(new NotFoundException('Could not find Package.'));
      }
      const messageTemplateDTO = new MessageTemplateDTO();
      messageTemplateDTO.isDeleted = true;
      messageTemplateDTO.isActive = false;
      messageTemplateDTO.dBy = user._id;
      messageTemplateDTO.dTime =
        (messageTemplateDTO?.timezone &&
          moment().tz(messageTemplateDTO.timezone).valueOf()) ||
        Date.now();

      return await _messageTemplate.set(messageTemplateDTO).save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * count Package
   * @returns {Promise<number>}
   */
  async count(query: SearchMessageTemplateDTO): Promise<number> {
    try {
      const searchQuery = createSearchQuery(query);
      return await this.messageTemplateModel.countDocuments(searchQuery);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
}

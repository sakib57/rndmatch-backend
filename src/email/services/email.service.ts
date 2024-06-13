import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment-timezone';
import { Model } from 'mongoose';
import { encodeToken } from '../../common/utils/helper';
import { CreateEmailDTO, EmailDTO, SearchEmailQueryDTO } from '../dto';
import { IPaginateEmail } from '../interfaces';
import { IEmail } from '../interfaces';

@Injectable()
export class EmailService {
  private readonly password = 'oS1H+dKX1+OkXUu3jABIKqThi5/BJJtB0OCo';
  /**
   * Constructor
   * @param {Model<IEmail>} emailModel
   */
  constructor(
    @InjectModel('Email')
    private readonly emailModel: Model<IEmail>,
  ) {}

  /**
   * create email
   * @param createEmailDTO
   * @returns {Promise<IEmail>}
   */
  async create(createEmailDTO: CreateEmailDTO): Promise<IEmail> {
    try {
      const emailDTO = new EmailDTO();
      emailDTO.cTime = Number(moment.tz().format('x'));

      if (createEmailDTO && createEmailDTO.hasOwnProperty('emailPassword')) {
        const token = {
          password: createEmailDTO.emailPassword,
        };
        emailDTO.emailPassword = await encodeToken(token, this.password);
      }

      const setEmail = {
        ...createEmailDTO,
        ...emailDTO,
      };

      return new this.emailModel(setEmail).save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * find email by id
   * @returns {Promise<IEmail>}
   * @param {string} id
   */
  async findOne(id: string): Promise<IEmail> {
    try {
      const email = await this.emailModel.findOne({ _id: id });
      if (!email) {
        return Promise.reject(new NotFoundException('Email not found'));
      }

      return email;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * find all email based on email or everything
   * @param query
   * @returns {IEmail[]}
   */
  async findAll(query: SearchEmailQueryDTO): Promise<IPaginateEmail> {
    let searchQuery: any = {};
    if (query?.email) {
      searchQuery.emailUser = query.email;
    }
    if (query?.to) {
      searchQuery.to = { $in: query.to };
    }
    if (query.hasOwnProperty('isSuccess')) {
      searchQuery.isSuccess = query.isSuccess;
    }
    if (query?.noCondition) {
      searchQuery = {};
    }

    const limit = query.limit || 10;
    const skip = query.skip || 0;
    const cursor = this.emailModel
      .find(searchQuery)
      .limit(limit)
      .skip(skip)
      .sort({ cTime: -1 });

    const result: IPaginateEmail = {
      data: await cursor.exec(),
    };

    if (query.pagination) {
      result.pagination = {
        total: await this.emailModel.countDocuments(searchQuery),
        skip,
        limit,
      };
    }

    return result;
  }

  /**
   * returns distinct email list
   * @returns {string[]}
   */
  async findDistinctEmails() {
    return this.emailModel.distinct('emailUser');
  }
}

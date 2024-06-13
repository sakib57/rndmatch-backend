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
import { IField, IPaginateFields } from '../interfaces';
import {
  CreateFieldDTO,
  FieldDTO,
  SearchFieldDTO,
  UpdateFieldDTO,
} from '../dto';
import { createSearchQuery } from 'src/common/utils/helper';

@Injectable()
export class FieldService {
  /**
   * Constructor
   * @param {Model<IField>} fieldModel
   */
  constructor(
    @InjectModel('Field')
    private readonly fieldModel: Model<IField>,
  ) {}

  /**
   * Create Field
   * @param {IUser} user
   * @param {CreateFieldDTO} cFieldDTO
   * @returns {Promise<IField>}
   */
  async create(user: IUser, cFieldDTO: CreateFieldDTO): Promise<IField> {
    try {
      const fieldDTO = new FieldDTO();
      fieldDTO.cBy = user._id;
      fieldDTO.cTime =
        (cFieldDTO?.timezone && moment().tz(cFieldDTO.timezone).valueOf()) ||
        Date.now();
      const setField = { ...cFieldDTO, ...fieldDTO };
      const registerDoc = new this.fieldModel(setField);
      return await registerDoc.save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Update Field
   * @param {IUser} user
   * @param {string} id
   * @param {UpdateFieldDTO} uFieldDTO
   * @returns {Promise<ISkills>}
   */
  async update(
    user: IUser,
    id: string,
    uFieldDTO: UpdateFieldDTO,
  ): Promise<IField> {
    try {
      const field = await this.fieldModel.findOne({ _id: id });
      if (!field) {
        return Promise.reject(new NotFoundException('Could not find skill.'));
      }
      const fieldDTO = new FieldDTO();
      fieldDTO.uBy = user._id;
      fieldDTO.uTime =
        (uFieldDTO?.timezone && moment().tz(uFieldDTO.timezone).valueOf()) ||
        Date.now();
      const setField = { ...uFieldDTO, ...FieldDTO };
      return await field.set(setField).save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Find All Field
   * @param {SearchFieldDTO} query
   * @returns {Promise<IPaginateFields>}
   */
  async findAll(query: SearchFieldDTO): Promise<IPaginateFields> {
    try {
      const searchQuery = createSearchQuery(query);
      const limit: number = (query && query.limit) || 10;
      const skip: number = (query && query.skip) || 0;

      const cursor = this.fieldModel
        .find(searchQuery)
        .populate('discipline')
        .limit(limit)
        .skip(skip);
      if (query.hasOwnProperty('sort') && query.sort) {
        cursor.sort(JSON.parse(query.sort));
      }

      const result: IPaginateFields = {
        data: {
          fields: await cursor.exec(),
        },
      };

      if (query.pagination) {
        result.pagination = {
          total: await this.fieldModel.countDocuments(searchQuery),
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

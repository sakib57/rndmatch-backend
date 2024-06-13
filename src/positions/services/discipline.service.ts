import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/users/interfaces';
import {
  CreateDisciplineDTO,
  DisciplineDTO,
  SearchDisciplineDTO,
  UpdateDisciplineDTO,
} from '../dto';
import { IDiscipline, IPaginateDisciplines } from '../interfaces';
import * as moment from 'moment-timezone';
import { createSearchQuery } from 'src/common/utils/helper';

@Injectable()
export class DisciplineService {
  /**
   * Constructor
   * @param {Model<IDiscipline>} disciplineModel
   */
  constructor(
    @InjectModel('Discipline')
    private readonly disciplineModel: Model<IDiscipline>,
  ) {}

  /**
   * Create discipline
   * @param {IUser} user
   * @param {CreateDisciplineDTO} cDisciplineDTO
   * @returns {Promise<IDiscipline>}
   */
  async create(
    user: IUser,
    cDisciplineDTO: CreateDisciplineDTO,
  ): Promise<IDiscipline> {
    try {
      const disciplineDTO = new DisciplineDTO();
      disciplineDTO.cBy = user._id;
      disciplineDTO.cTime =
        (cDisciplineDTO?.timezone &&
          moment().tz(cDisciplineDTO.timezone).valueOf()) ||
        Date.now();
      const setDiscipline = { ...cDisciplineDTO, ...disciplineDTO };
      const registerDoc = new this.disciplineModel(setDiscipline);
      return await registerDoc.save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Update discipline
   * @param {IUser} user
   * @param {string} id
   * @param {UpdateDisciplineDTO} uDisciplineDTO
   * @returns {Promise<ISkills>}
   */
  async update(
    user: IUser,
    id: string,
    uDisciplineDTO: UpdateDisciplineDTO,
  ): Promise<IDiscipline> {
    try {
      const discipline = await this.disciplineModel.findOne({ _id: id });
      if (!discipline) {
        return Promise.reject(new NotFoundException('Could not find skill.'));
      }
      const disciplineDTO = new DisciplineDTO();
      disciplineDTO.uBy = user._id;
      disciplineDTO.uTime =
        (uDisciplineDTO?.timezone &&
          moment().tz(uDisciplineDTO.timezone).valueOf()) ||
        Date.now();
      const setDiscipline = { ...uDisciplineDTO, ...disciplineDTO };
      return await discipline.set(setDiscipline).save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Find All Discipline
   * @param {SearchDisciplineDTO} query
   * @returns {Promise<IPaginateDisciplines>}
   */
  async findAll(query: SearchDisciplineDTO): Promise<IPaginateDisciplines> {
    try {
      const searchQuery = createSearchQuery(query);
      const limit: number = (query && query.limit) || 10;
      const skip: number = (query && query.skip) || 0;

      const cursor = this.disciplineModel
        .find(searchQuery)
        .limit(limit)
        .skip(skip);
      if (query.hasOwnProperty('sort') && query.sort) {
        cursor.sort(JSON.parse(query.sort));
      }

      const result: IPaginateDisciplines = {
        data: {
          disciplines: await cursor.exec(),
        },
      };

      if (query.pagination) {
        result.pagination = {
          total: await this.disciplineModel.countDocuments(searchQuery),
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

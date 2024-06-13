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
  CreateSkillDTO,
  SearchSkillDTO,
  SkillDTO,
  UpdateSkillDTO,
} from '../dto';
import { IPaginateSkills, ISkills } from '../interfaces';
import * as moment from 'moment-timezone';
import { IUser } from 'src/users/interfaces';
import { createSearchQuery } from 'src/common/utils/helper';

@Injectable()
export class SkillsService {
  /**
   * Constructor
   * @param {Model<ISkills>} skillsModel
   */
  constructor(
    @InjectModel('Skill')
    private readonly skillsModel: Model<ISkills>,
  ) {}

  /**
   * Create skill
   * @param {IUser} user
   * @param {CreateSkillDTO} cSkillsDTO
   * @returns {Promise<ISkills>}
   */
  async create(user: IUser, cSkillsDTO: CreateSkillDTO): Promise<ISkills> {
    try {
      const skill = await this.skillsModel.findOne({ name: cSkillsDTO.name });
      const skillDTO = new SkillDTO();
      if (!skill) {
        skillDTO.cBy = user._id;
        skillDTO.cTime =
          (cSkillsDTO?.timezone &&
            moment().tz(cSkillsDTO.timezone).valueOf()) ||
          Date.now();
        const setSkill = { ...cSkillsDTO, ...skillDTO };
        const registerDoc = new this.skillsModel(setSkill);
        return await registerDoc.save();
      } else {
        if (skill.isDeleted === true) {
          skillDTO.isDeleted = false;
          const setSkill = { ...cSkillsDTO, ...skillDTO };
          return await skill.set(setSkill).save();
        } else {
          return Promise.reject(new ConflictException('Skill already exist'));
        }
      }
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Update skill
   * @param {IUser} user
   * @param {string} id
   * @param {UpdateSkillDTO} uSkillsDTO
   * @returns {Promise<ISkills>}
   */
  async update(
    user: IUser,
    id: string,
    uSkillsDTO: UpdateSkillDTO,
  ): Promise<ISkills> {
    try {
      const skill = await this.skillsModel.findOne({
        _id: id,
        isDeleted: false,
      });
      if (!skill) {
        return Promise.reject(new NotFoundException('Could not find skill.'));
      }
      const skillDTO = new SkillDTO();
      skillDTO.uBy = user._id;
      skillDTO.uTime =
        (uSkillsDTO?.timezone && moment().tz(uSkillsDTO.timezone).valueOf()) ||
        Date.now();
      const setSkill = { ...uSkillsDTO, ...skillDTO };
      return await skill.set(setSkill).save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Find All skill
   * @param {SearchSkillDTO} query
   * @returns {Promise<IPaginateSkills>}
   */
  async findAll(query: SearchSkillDTO): Promise<IPaginateSkills> {
    try {
      const searchQuery = createSearchQuery(query);
      const limit: number = (query && query.limit) || 10;
      const skip: number = (query && query.skip) || 0;

      const cursor = !query.getAllRecord
        ? this.skillsModel.find(searchQuery).limit(limit).skip(skip)
        : this.skillsModel.find(searchQuery);
      if (query.hasOwnProperty('sort') && query.sort) {
        cursor.sort(JSON.parse(query.sort));
      }

      const result: IPaginateSkills = {
        data: {
          skills: await cursor.exec(),
        },
      };

      if (query.pagination) {
        result.pagination = {
          total: await this.skillsModel.countDocuments(searchQuery),
          limit,
          skip,
        };
      }
      return result;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /** Delete skill
   * @param {IUser} user
   * @param {string} id
   * @returns {Promise<ISkills>}
   **/
  async delete(id: string, user: IUser): Promise<ISkills> {
    try {
      const skill = await this.skillsModel.findOne({ _id: id });
      if (!skill) {
        return Promise.reject(new NotFoundException('Could not find skill.'));
      }
      const skillDTO = new SkillDTO();
      skillDTO.isDeleted = true;
      skillDTO.isActive = false;
      skillDTO.dBy = user._id;
      skillDTO.dTime =
        (skillDTO?.timezone && moment().tz(skillDTO.timezone).valueOf()) ||
        Date.now();

      return await skill.set(skillDTO).save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * count skill
   * @returns {Promise<number>}
   */
  async count(query: SearchSkillDTO): Promise<number> {
    try {
      const searchQuery = createSearchQuery(query);
      return await this.skillsModel.countDocuments(searchQuery);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
}

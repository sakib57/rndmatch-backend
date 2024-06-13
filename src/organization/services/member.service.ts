import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMember, IOrganization, IPaginateMember } from '../interfaces';
import * as moment from 'moment-timezone';
import {
  CreateMemberDTO,
  MemberDTO,
  SearchMemberDTO,
  UpdateMemberDTO,
} from '../dto';
import { IUser } from 'src/users/interfaces';
import { createSearchQuery } from 'src/common/utils/helper';

@Injectable()
export class MemberService {
  /**
   * Constructor
   * @param {Model<IMember>} memberModel
   */
  constructor(
    @InjectModel('Member')
    private readonly memberModel: Model<IMember>,

    @InjectModel('Organization')
    private readonly organizationModel: Model<IOrganization>,
  ) {}

  /**
   * Create member
   * @param {IUser} user
   * @param {CreateMemberDTO} cMemberDTO
   * @returns {Promise<IMember>}
   */
  async create(user: IUser, cMemberDTO: CreateMemberDTO): Promise<IMember> {
    try {
      const memberDTO = new MemberDTO();
      memberDTO.cBy = user._id;

      memberDTO.cTime =
        (cMemberDTO?.timezone && moment().tz(cMemberDTO.timezone).valueOf()) ||
        Date.now();

      const setMember = { ...cMemberDTO, ...memberDTO };
      const registerDoc = new this.memberModel(setMember);
      return await registerDoc.save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Update member
   * @param {string} id
   * @param {IUser} user
   * @param {UpdateMemberDTO} uMemberDTO
   * @returns {Promise<IMember>}
   */
  async update(
    id: string,
    user: IUser,
    uMemberDTO: UpdateMemberDTO,
  ): Promise<IMember> {
    try {
      const member = await this.memberModel.findOne({
        _id: id,
        isDeleted: false,
      });
      if (!member) {
        return Promise.reject(new NotFoundException('Could not find member.'));
      }
      const memberDTO = new MemberDTO();
      memberDTO.uBy = user._id;

      memberDTO.uTime =
        (uMemberDTO?.timezone && moment().tz(uMemberDTO.timezone).valueOf()) ||
        Date.now();

      const setMember = { ...uMemberDTO, ...memberDTO };
      return await member.set(setMember).save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Find All member of an organization
   * @param {SearchMemberDTO} query
   * @returns {Promise<IPaginateMember>}
   */
  async findAll(query: SearchMemberDTO): Promise<IPaginateMember> {
    try {
      const searchQuery = createSearchQuery(query);
      const limit: number = (query && query.limit) || 10;
      const skip: number = (query && query.skip) || 0;

      let organization = undefined;
      if (
        searchQuery &&
        searchQuery.hasOwnProperty('organization') &&
        searchQuery.organization
      ) {
        // this is assumed the organization parameter will have one organization id
        organization = await this.organizationModel
          .findOne({
            organization: searchQuery.organization,
          })
          .exec();
      }

      const cursor = this.memberModel
        .find(searchQuery)
        .populate({
          path: 'user',
          populate: {
            path: 'profile',
          },
        })
        .limit(limit)
        .skip(skip)
        .sort('name ASC');

      if (query.hasOwnProperty('sort') && query.sort) {
        cursor.sort(JSON.parse(query.sort));
      }

      const result: IPaginateMember = {
        data: {
          members: await cursor.exec(),
          ...(organization ? { restaurant: organization } : {}),
        },
      };

      if (query.pagination) {
        result.pagination = {
          total: await this.memberModel.countDocuments(searchQuery),
          limit,
          skip,
        };
      }
      return result;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /** Delete member
   * @param {IUser} user
   * @param {string} id
   * @returns {Promise<IMember>}
   **/
  async delete(id: string, user: IUser): Promise<IMember> {
    try {
      const member = await this.memberModel.findOne({ _id: id });
      if (!member) {
        return Promise.reject(new NotFoundException('Could not find member.'));
      }
      const memberDTO = new MemberDTO();
      memberDTO.isDeleted = true;
      memberDTO.isActive = false;
      memberDTO.dBy = user._id;
      memberDTO.dTime =
        (memberDTO?.timezone && moment().tz(memberDTO.timezone).valueOf()) ||
        Date.now();

      return await member.set(memberDTO).save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * count member
   * @returns {Promise<number>}
   */
  async count(query: SearchMemberDTO): Promise<number> {
    try {
      const searchQuery = createSearchQuery(query);
      return await this.memberModel.countDocuments(searchQuery);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
}

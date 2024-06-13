import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from '../../users/interfaces';
import {
  CreateInvitationDTO,
  InvitationDTO,
  SearchInvitationDTO,
  UpdateInvitationDTO,
} from '../dto';
import * as moment from 'moment-timezone';
import { createSearchQuery, encodeToken } from '../../common/utils/helper';
import { IInvitation, IPaginateInvitation } from '../interfaces';

@Injectable()
export class InvitationsService {
  private readonly password = 'oS1H+dKX1+OkXUu3jABIKqThi5/BJJtB0OCo';
  /**
   * Constructor
   * @param {Model<IInvitation>} invitationModel
   */
  constructor(
    @InjectModel('Invitation')
    private readonly invitationModel: Model<IInvitation>,
    @InjectModel('User')
    private readonly userModel: Model<IUser>,
  ) {}

  /**
   * Create invitation
   * @param {IUser} user
   * @param {CreateInvitationDTO} cInvitationDTO
   * @returns {Promise<IInvitation>}
   */
  async create(
    user: IUser,
    cInvitationDTO: CreateInvitationDTO,
  ): Promise<IInvitation> {
    try {
      const memberUser: any = this.userModel.findOne({
        email: cInvitationDTO.inviteTo,
      });
      if (memberUser && memberUser?._id) {
        return Promise.reject(new ConflictException('User already exist'));
      }
      const invitation = await this.invitationModel.findOne({
        inviteFrom: cInvitationDTO.inviteFrom,
        inviteTo: cInvitationDTO.inviteTo,
      });
      const invitationDTO = new InvitationDTO();
      if (invitation) {
        if (invitation?.isAccepted) {
          return Promise.reject(
            new BadRequestException('invitation already sent'),
          );
        }
        if (invitation.tokenExpiresAt < Date.now()) {
          // + Return new email;
          return invitation;
        }
        const token = {
          _id: user._id,
          email: cInvitationDTO.inviteTo,
        };
        invitationDTO.token = await encodeToken(token, this.password);
        invitationDTO.tokenExpiresAt = Date.now() + 30 * 60 * 1000; // 30 minutes
        // + Return new email;
        return invitation.set(invitationDTO).save();
      } else {
        invitationDTO.cBy = user._id;
        invitationDTO.cTime =
          (cInvitationDTO?.timezone &&
            moment().tz(cInvitationDTO.timezone).valueOf()) ||
          Date.now();
        const token = {
          _id: user._id,
          email: cInvitationDTO.inviteTo,
        };
        invitationDTO.token = await encodeToken(token, this.password);
        invitationDTO.tokenExpiresAt = Date.now() + 30 * 60 * 1000; // 30 minutes
        const setInvitation = { ...cInvitationDTO, ...invitationDTO };
        const registerDoc = new this.invitationModel(setInvitation);
        const invitation = await registerDoc.save();
        // + Return new email;
        return invitation;
      }
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Update Invitation
   * @param {IUser} user
   * @param {string} id
   * @param {UpdateInvitationDTO} uInvitationsDTO
   * @returns {Promise<IInvitation>}
   */
  async update(
    user: IUser,
    id: string,
    uInvitationsDTO: UpdateInvitationDTO,
  ): Promise<IInvitation> {
    try {
      const invitation = await this.invitationModel.findOne({
        _id: id,
        isDeleted: false,
      });
      if (!invitation) {
        return Promise.reject(
          new NotFoundException('Could not find Invitation.'),
        );
      }
      const invitationDTO = new InvitationDTO();
      invitationDTO.uBy = user._id;
      invitationDTO.uTime =
        (uInvitationsDTO?.timezone &&
          moment().tz(uInvitationsDTO.timezone).valueOf()) ||
        Date.now();
      const setInvitation = { ...uInvitationsDTO, ...InvitationDTO };
      return await invitation.set(setInvitation).save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Find All Invitation
   * @param {SearchInvitationDTO} query
   * @returns {Promise<IPaginateInvitation>}
   */
  async findAll(query: SearchInvitationDTO): Promise<IPaginateInvitation> {
    try {
      const searchQuery = createSearchQuery(query);
      const limit: number = (query && query.limit) || 10;
      const skip: number = (query && query.skip) || 0;

      const cursor = this.invitationModel
        .find(searchQuery)
        .limit(limit)
        .skip(skip);
      if (query.hasOwnProperty('sort') && query.sort) {
        cursor.sort(JSON.parse(query.sort));
      }

      const result: IPaginateInvitation = {
        invitations: await cursor.exec(),
      };

      if (query.pagination) {
        result.pagination = {
          total: await this.invitationModel.countDocuments(searchQuery),
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
   * Find one Invitation by token
   * @returns {Promise<IInvitation>}
   */
  async findOneByToken(token: string): Promise<IInvitation> {
    try {
      let res = null;
      res = await this.invitationModel.findOne({
        token: token,
        isDeleted: false,
      });

      if (!res) {
        return Promise.reject(
          new NotFoundException('Could not find Invitation.'),
        );
      }
      return res;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * count Invitation
   * @returns {Promise<number>}
   */
  async count(query: SearchInvitationDTO): Promise<number> {
    try {
      const searchQuery = createSearchQuery(query);
      return await this.invitationModel.countDocuments(searchQuery);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
}

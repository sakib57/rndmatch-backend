import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment-timezone';
import { Model } from 'mongoose';
import { cache } from '../../cache-manager/decorators/cache-manager.decorator';
import { CacheKey } from '../../common/mock/constant.mock';
import { encodeToken, removeKeyPatternFromCM } from '../../common/utils/helper';
import { IUser } from '../../users/interfaces';
import { CreateEmailConfigurationDTO } from '../dto';
import {
  EmailConfigurationDTO,
  SearchEmailConfigurationDTO,
  UpdateEmailConfigurationDTO,
} from '../dto';
import { IEmailConfiguration } from '../interfaces';

@Injectable()
export class EmailConfigurationService {
  private readonly password = 'oS1H+dKX1+OkXUu3jABIKqThi5/BJJtB0OCo';
  /**
   * Constructor
   * @param {Model<IEmailConfiguration>} emailConfigurationModel
   */
  constructor(
    @InjectModel('EmailConfiguration')
    private readonly emailConfigurationModel: Model<IEmailConfiguration>,
  ) {}

  /**
   * create email configuration
   * @param user
   * @param createEmailConfigurationDTO
   * @returns {Promise<IEmailConfiguration>}
   */
  async create(
    user: IUser,
    createEmailConfigurationDTO: CreateEmailConfigurationDTO,
  ): Promise<IEmailConfiguration> {
    try {
      if (
        createEmailConfigurationDTO &&
        createEmailConfigurationDTO.hasOwnProperty('defaultUser')
      ) {
        const emailConfiguration = await this.emailConfigurationModel.findOne({
          defaultUser: createEmailConfigurationDTO?.defaultUser?.toLowerCase(),
        });

        if (emailConfiguration) {
          return Promise.reject(
            new NotAcceptableException(
              `${emailConfiguration.defaultUser} already exist`,
            ),
          );
        }
        createEmailConfigurationDTO.defaultUser =
          createEmailConfigurationDTO?.defaultUser?.toLowerCase();
      }

      const emailConfigurations = await this.emailConfigurationModel.find({});
      if (
        createEmailConfigurationDTO &&
        createEmailConfigurationDTO.hasOwnProperty('isDefault') &&
        createEmailConfigurationDTO.isDefault === true
      ) {
        await this.emailConfigurationModel.updateMany(
          {
            isDefault: true,
          },
          { $set: { isDefault: false } },
        );
      }

      const token = {
        defaultUser:
          createEmailConfigurationDTO.defaultUser ||
          process.env.EMAIL_AUTH_USER,
        defaultPassword:
          createEmailConfigurationDTO.defaultPassword ||
          process.env.EMAIL_AUTH_PASSWORD,
      };
      createEmailConfigurationDTO.defaultPassword = await encodeToken(
        token,
        this.password,
      );

      const emailConfigurationDTO = new EmailConfigurationDTO();
      emailConfigurationDTO.isDefault =
        createEmailConfigurationDTO.isDefault ||
        emailConfigurations.length === 0;
      emailConfigurationDTO.cBy = user._id;
      emailConfigurationDTO.cTime = Number(moment.tz().format('x'));
      emailConfigurationDTO.uBy = user._id;
      emailConfigurationDTO.uTime = Number(moment.tz().format('x'));

      const setEmailConfiguration = {
        ...createEmailConfigurationDTO,
        ...emailConfigurationDTO,
      };

      return new this.emailConfigurationModel(setEmailConfiguration).save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Update email configuration
   * @param user
   * @param id
   * @param updateEmailConfigurationDTO
   * @returns {Promise<IEmailConfiguration>}
   */
  async update(
    user: IUser,
    id: string,
    updateEmailConfigurationDTO: UpdateEmailConfigurationDTO,
  ): Promise<IEmailConfiguration> {
    try {
      const emailConfiguration = await this.emailConfigurationModel.findOne({
        _id: id,
      });

      if (!emailConfiguration) {
        return Promise.reject(
          new NotFoundException(
            `Email configuration with ${id} does not exist`,
          ),
        );
      }

      if (
        updateEmailConfigurationDTO &&
        updateEmailConfigurationDTO.hasOwnProperty('defaultUser')
      ) {
        updateEmailConfigurationDTO.defaultUser =
          updateEmailConfigurationDTO?.defaultUser?.toLowerCase();
      }

      if (
        updateEmailConfigurationDTO &&
        updateEmailConfigurationDTO.hasOwnProperty('defaultPassword')
      ) {
        const token = {
          defaultUser:
            updateEmailConfigurationDTO.defaultUser ||
            emailConfiguration.defaultUser,
          defaultPassword: updateEmailConfigurationDTO.defaultPassword,
        };
        updateEmailConfigurationDTO.defaultPassword = await encodeToken(
          token,
          this.password,
        );
      }

      if (
        updateEmailConfigurationDTO &&
        updateEmailConfigurationDTO.hasOwnProperty('isDefault') &&
        updateEmailConfigurationDTO.isDefault === false
      ) {
        return Promise.reject(
          new NotAcceptableException('Must have one email as default'),
        );
      }

      if (
        updateEmailConfigurationDTO &&
        updateEmailConfigurationDTO.hasOwnProperty('isDefault') &&
        updateEmailConfigurationDTO.isDefault === true
      ) {
        await this.emailConfigurationModel.updateMany(
          {
            isDefault: true,
          },
          { $set: { isDefault: false } },
        );
      }

      const emailConfigurationDTO = new EmailConfigurationDTO();
      emailConfigurationDTO.uTime = Number(moment.tz().format('x'));
      emailConfigurationDTO.uBy = user._id;

      const setEmailConfiguration = {
        ...emailConfigurationDTO,
        ...updateEmailConfigurationDTO,
      };

      removeKeyPatternFromCM(CacheKey.EMAIL_CONFIGURATION_FIND_ONE);
      return emailConfiguration.set(setEmailConfiguration).save();
    } catch (err: any) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * find one email configuration
   * @param id
   * @param {SearchEmailConfigurationDTO} query
   * @returns {Promise<IEmailConfiguration>}
   */
  @cache(CacheKey.EMAIL_CONFIGURATION_FIND_ONE)
  async findOne(
    id: string = null,
    query: SearchEmailConfigurationDTO,
  ): Promise<IEmailConfiguration> {
    try {
      if (id === null && !query) {
        return Promise.reject(
          new BadRequestException('id and query was not passed'),
        );
      }
      if (query) {
        return this.emailConfigurationModel.findOne(query);
      }

      const emailConfiguration = await this.emailConfigurationModel.findOne({
        _id: id,
      });

      if (!emailConfiguration)
        return Promise.reject(
          new NotFoundException('Email configuration not found'),
        );
      return emailConfiguration;
    } catch (err: any) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Find all email configuration
   * @param query
   * @returns {Promise<IEmailConfiguration[]>}
   */
  async findAll(
    query: SearchEmailConfigurationDTO,
  ): Promise<IEmailConfiguration[]> {
    try {
      const limit = query?.limit || 10;
      const skip = query?.skip || 0;

      let searchQuery: any = {};

      if (query?.defaultUser) {
        searchQuery.defaultUser = { $regex: query.defaultUser, $options: 'i' };
      }
      if (query?.noCondition) {
        searchQuery = {};
      }
      return this.emailConfigurationModel
        .find(searchQuery)
        .select({
          defaultPassword: 0,
        })
        .limit(limit)
        .skip(skip);
    } catch (err: any) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
}

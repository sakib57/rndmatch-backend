import {
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import * as moment from 'moment-timezone';
import { IUser } from '../../users/interfaces';
import { IEmailTemplate } from '../interfaces';
import { CreateEmailTemplateDTO } from '../dto';
import {
  EmailTemplateDTO,
  UpdateEmailTemplateDTO,
  SearchEmailTemplateDTO,
} from '../dto';
import { MediaDTO } from '../../common/dto';
import { InjectModel } from '@nestjs/mongoose';
import { encodeToken, removeKeyFromCM } from '../../common/utils/helper';
import { cache } from '../../cache-manager/decorators/cache-manager.decorator';
import { CacheKey, EmailContentType } from '../../common/mock/constant.mock';
import { FilesService } from '../../files/services';

@Injectable()
export class EmailTemplateService {
  private readonly password = 'oS1H+dKX1+OkXUu3jABIKqThi5/BJJtB0OCo';
  private readonly AWS_SERVICE_IMG_BUCKET = 'signatureLogo';
  /**
   * Constructor
   * @param {Model<IEmailTemplate>} emailTemplateModel
   * @param {service<FilesService>} filesService
   */
  constructor(
    @InjectModel('EmailTemplate')
    private readonly emailTemplateModel: Model<IEmailTemplate>,
    private readonly filesService: FilesService,
  ) {}

  /**
   * Create email template
   * @param user
   * @param createEmailTemplateDTO
   * @returns {Promise<IEmailTemplate>}
   */
  async create(
    user: IUser,
    createEmailTemplateDTO: CreateEmailTemplateDTO,
  ): Promise<IEmailTemplate> {
    try {
      const emailTemplate = await this.emailTemplateModel.findOne({
        contentType: createEmailTemplateDTO.contentType,
      });

      if (emailTemplate) {
        return Promise.reject(
          new NotAcceptableException(
            `${createEmailTemplateDTO.contentType} already exist`,
          ),
        );
      }
      if (
        createEmailTemplateDTO &&
        createEmailTemplateDTO.hasOwnProperty('emailUser')
      ) {
        createEmailTemplateDTO.emailUser =
          createEmailTemplateDTO?.emailUser?.toLowerCase();
      }
      const token = {
        emailUser:
          createEmailTemplateDTO?.emailUser?.toLowerCase() ||
          process.env.email_auth_user,
        emailPassword:
          createEmailTemplateDTO.emailPassword ||
          process.env.EMAIL_AUTH_PASSWORD,
      };
      createEmailTemplateDTO.emailPassword = await encodeToken(
        token,
        this.password,
      );
      const emailTemplateDTO = new EmailTemplateDTO();
      emailTemplateDTO.cTime = Number(moment.tz().format('x'));
      emailTemplateDTO.cBy = user._id;
      emailTemplateDTO.uTime = Number(moment.tz().format('x'));
      emailTemplateDTO.uBy = user._id;

      const setEmailTemplate = {
        ...createEmailTemplateDTO,
        ...emailTemplateDTO,
      };

      return new this.emailTemplateModel(setEmailTemplate).save();
    } catch (err: any) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Update specific email template
   * @param user
   * @param id
   * @param updateEmailTemplateDTO
   * @param files
   * @returns {Promise<IEmailTemplate>}
   */
  async update(
    user: IUser,
    id: string,
    updateEmailTemplateDTO: UpdateEmailTemplateDTO,
    files: {
      signatureLogo?: Express.Multer.File[];
    },
  ): Promise<IEmailTemplate> {
    try {
      const emailTemplate = await this.emailTemplateModel.findOne({
        _id: id,
      });

      if (!emailTemplate) {
        return Promise.reject(
          new NotFoundException(`Email template with ${id} does not exist`),
        );
      }
      const emailTemplateDTO = new EmailTemplateDTO();
      if (files && files?.signatureLogo?.length) {
        const { mimetype } = files.signatureLogo[0];
        const uploadRes = await this.filesService.upload(
          files.signatureLogo[0],
        );

        const mediaDTO = new MediaDTO();
        mediaDTO.uri = uploadRes.Location;
        mediaDTO.mimetype = mimetype;
        emailTemplateDTO.signatureLogo = mediaDTO;
      } else {
        if (
          updateEmailTemplateDTO &&
          updateEmailTemplateDTO.hasOwnProperty('emailUser')
        ) {
          updateEmailTemplateDTO.emailUser =
            updateEmailTemplateDTO?.emailUser?.toLowerCase();
        }
        if (
          updateEmailTemplateDTO &&
          updateEmailTemplateDTO.hasOwnProperty('emailPassword')
        ) {
          const token = {
            emailUser: emailTemplate.emailUser,
            emailPassword: updateEmailTemplateDTO.emailPassword,
          };
          updateEmailTemplateDTO.emailPassword = await encodeToken(
            token,
            this.password,
          );
        }

        emailTemplateDTO.uTime = Number(moment.tz().format('x'));
        emailTemplateDTO.uBy = user._id;
      }

      const setemailTemplate = {
        ...emailTemplateDTO,
        ...updateEmailTemplateDTO,
      };

      // * update cache
      removeKeyFromCM(CacheKey.EMAIL_TEMPLATE_FIND_ONE, [
        emailTemplate.contentType,
      ]);

      return emailTemplate.set(setemailTemplate).save();
    } catch (err: any) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   *  Find single email template by id
   * @param {EmailContentType} contentType
   * @returns {Promise<IEmailTemplate>}
   */
  @cache(CacheKey.EMAIL_TEMPLATE_FIND_ONE)
  async findOne(contentType: EmailContentType): Promise<IEmailTemplate> {
    // ! if you change this function parameter, consider updaing CM.generateKey in update function,
    // ! function parameters are used as caching key
    try {
      const emailTemplate = await this.emailTemplateModel.findOne({
        contentType: contentType,
      });
      if (!emailTemplate) {
        return Promise.reject(
          new NotFoundException(
            `Email template with ${contentType} does not exist`,
          ),
        );
      }
      return emailTemplate;
    } catch (err: any) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Find All email templates
   * @param query
   * @returns {Promise<IEmailTemplate[]>}
   */
  async findAll(query: SearchEmailTemplateDTO): Promise<IEmailTemplate[]> {
    try {
      const limit = query?.limit;
      const skip = query?.skip;

      let searchQuery: any = {};

      if (query?.emailUser) {
        searchQuery.emailUser = { $regex: query?.emailUser, $options: 'i' };
      }
      if (query?.contentType) {
        searchQuery.contentType = query?.contentType;
      }
      if (query?.subject) {
        searchQuery.subject = { $regex: query?.subject, $options: 'i' };
      }

      if (query?.noCondition) {
        searchQuery = {};
      }
      return this.emailTemplateModel.find(searchQuery).limit(limit).skip(skip);
    } catch (err: any) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
}

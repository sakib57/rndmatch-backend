import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { customAlphabet } from 'nanoid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as moment from 'moment-timezone';
import { IUser } from 'src/users/interfaces';
import {
  createSearchQuery,
  subDocUpdateWithArray,
  subDocUpdateWithObj,
} from 'src/common/utils/helper';
import { IOrganization, IPaginateOrganization } from '../interfaces';
import {
  CreateMemberDTO,
  CreateOrganizationDTO,
  MemberDTO,
  OrganizationDTO,
  SearchOrganizationDTO,
  UpdateOrganizationDTO,
} from '../dto';
import { MediaType, Status } from 'src/common/mock/constant.mock';
import { MemberService } from './member.service';
import { FilesService } from '../../files/services';
import { MediaDTO } from 'src/common/dto';

@Injectable()
export class OrganizationService {
  /**
   * Constructor
   * @param {Model<IOrganization>} organizationModel
   * @param {Service<MemberService>} memberService
   * @param {Service<FilesService>} filesService
   */
  constructor(
    @InjectModel('Organization')
    private readonly organizationModel: Model<IOrganization>,
    private readonly memberService: MemberService,
    private readonly filesService: FilesService,
  ) {}

  /**
   * Create organization
   * @param {IUser} user
   * @param {CreateOrganizationDTO} cOrganizationDTO
   * @returns {Promise<IOrganization>}
   */
  async create(
    user: IUser,
    cOrganizationDTO: CreateOrganizationDTO,
  ): Promise<IOrganization> {
    try {
      const organizationDTO = new OrganizationDTO();
      const slug = customAlphabet(
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890',
        8,
      );
      organizationDTO.slug = slug();
      organizationDTO.cBy = user._id;

      if (
        cOrganizationDTO &&
        cOrganizationDTO.hasOwnProperty('location') &&
        cOrganizationDTO.location.lng &&
        cOrganizationDTO.location.lng
      ) {
        cOrganizationDTO.location.type = 'Point';
        cOrganizationDTO.location.coordinates = [
          cOrganizationDTO.location.lat,
          cOrganizationDTO.location.lng,
        ];
      }

      organizationDTO.cTime =
        (cOrganizationDTO?.timezone &&
          moment().tz(cOrganizationDTO.timezone).valueOf()) ||
        Date.now();

      const setOrganization = { ...cOrganizationDTO, ...organizationDTO };
      const registerDoc = new this.organizationModel(setOrganization);
      const orginaization = await registerDoc.save();

      const memberDTO = new CreateMemberDTO();
      memberDTO.user = user && user._id;
      memberDTO.organization = orginaization._id;
      memberDTO.status = Status.JOINED;
      memberDTO['isActive'] = true;
      memberDTO['isAdmin'] = true;
      memberDTO['isOwner'] = true;

      await this.memberService.create(user, memberDTO);
      return orginaization;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Update organization
   * @param {IUser} user
   * @param {string} id
   * @param files
   * @param {UpdateOrganizationDTO} uOrganizationDTO
   * @returns {Promise<IOrganization>}
   */
  async update(
    user: IUser,
    id: string,
    files: {
      logo?: Express.Multer.File[];
      banner?: Express.Multer.File[];
      pictures?: Express.Multer.File[];
      videos?: Express.Multer.File[];
    },
    uOrganizationDTO: UpdateOrganizationDTO,
  ): Promise<IOrganization> {
    try {
      const organization = await this.organizationModel.findOne({
        _id: id,
        isDeleted: false,
      });
      if (!organization) {
        return Promise.reject(
          new NotFoundException('Could not find organization.'),
        );
      }
      const organizationDTO = new OrganizationDTO();
      if (files) {
        if (files && files.logo) {
          const { mimetype } = files.logo[0];
          const uploadRes = await this.filesService.upload(files.logo[0]);
          const mediaDTO = new MediaDTO();
          mediaDTO.uri = uploadRes.Location;
          mediaDTO.mimetype = mimetype;
          const organizationLogo = organization.get('logo') || {};
          organizationDTO.logo = subDocUpdateWithObj(
            organizationLogo,
            mediaDTO,
          );
        }

        if (files && files.banner) {
          const { mimetype } = files.banner[0];
          const uploadRes = await this.filesService.upload(files.banner[0]);
          const mediaDTO = new MediaDTO();
          mediaDTO.uri = uploadRes.Location;
          mediaDTO.mimetype = mimetype;
          const organizationBanner = organization.get('banner') || {};
          organizationDTO.banner = subDocUpdateWithObj(
            organizationBanner,
            mediaDTO,
          );
        }

        if (files && files.pictures) {
          const pictures = await Promise.all(
            files.pictures.map(async (picture) => {
              const { mimetype } = picture;
              const uploadRes = await this.filesService.upload(picture);
              const mediaDTO = new MediaDTO();
              mediaDTO.uri = uploadRes.Location;
              mediaDTO.mimetype = mimetype;
              return mediaDTO;
            }),
          );

          const organizationPictures = organization.get('pictures') || [];
          organizationDTO.pictures = subDocUpdateWithArray(
            organizationPictures,
            pictures,
          );
        }

        if (files && files.videos) {
          const videos = await Promise.all(
            files.videos.map(async (videos) => {
              const { mimetype } = videos;
              const uploadRes = await this.filesService.upload(videos);
              const mediaDTO = new MediaDTO();
              mediaDTO.uri = uploadRes.Location;
              mediaDTO.mimetype = mimetype;
              mediaDTO.type = MediaType.VIDEO;
              return mediaDTO;
            }),
          );

          const organizationVideos = organization.get('videos') || [];
          organizationDTO.videos = subDocUpdateWithArray(
            organizationVideos,
            videos,
          );
        }
      } else {
        if (uOrganizationDTO && uOrganizationDTO.hasOwnProperty('location')) {
          if (uOrganizationDTO.location.lng && uOrganizationDTO.location.lng) {
            uOrganizationDTO.location.type = 'Point';
            uOrganizationDTO.location.coordinates = [
              uOrganizationDTO.location.lat,
              uOrganizationDTO.location.lng,
            ];
          }
        }

        if (uOrganizationDTO && uOrganizationDTO.hasOwnProperty('mobile')) {
          const organizationMobile = organization.get('mobile') || {};
          organizationDTO.mobile = subDocUpdateWithObj(
            organizationMobile,
            uOrganizationDTO.mobile,
          );
        }

        if (uOrganizationDTO && uOrganizationDTO.hasOwnProperty('socials')) {
          const restaurantSocials = organization.get('socials') || [];
          organizationDTO.socials = subDocUpdateWithArray(
            restaurantSocials,
            uOrganizationDTO.socials,
          );
        }

        if (
          uOrganizationDTO &&
          uOrganizationDTO.hasOwnProperty('testimonials')
        ) {
          const restaurantTestimonials = organization.get('testimonials') || [];
          organizationDTO.testimonials = subDocUpdateWithArray(
            restaurantTestimonials,
            uOrganizationDTO.testimonials,
          );
        }

        if (uOrganizationDTO && uOrganizationDTO.hasOwnProperty('faqs')) {
          const restaurantFaqs = organization.get('faqs') || [];
          organizationDTO.faqs = subDocUpdateWithArray(
            restaurantFaqs,
            uOrganizationDTO.faqs,
          );
        }
      }
      organizationDTO.uBy = user._id;
      organizationDTO.uTime =
        (uOrganizationDTO?.timezone &&
          moment().tz(uOrganizationDTO.timezone).valueOf()) ||
        Date.now();
      const setOrganization = { ...uOrganizationDTO, ...organizationDTO };

      return await organization.set(setOrganization).save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Find All organization
   * @param {SearchOrganizationDTO} query
   * @returns {Promise<IPaginateOrganization>}
   */
  async findAll(query: SearchOrganizationDTO): Promise<IPaginateOrganization> {
    try {
      const searchQuery = createSearchQuery(query);
      const limit: number = (query && query.limit) || 10;
      const skip: number = (query && query.skip) || 0;

      const cursor = !query.getAllRecord
        ? this.organizationModel.find(searchQuery).limit(limit).skip(skip)
        : this.organizationModel.find(searchQuery);
      if (query.hasOwnProperty('sort') && query.sort) {
        cursor.sort(JSON.parse(query.sort));
      }

      const result: IPaginateOrganization = {
        data: await cursor.exec(),
      };

      if (query.pagination) {
        result.pagination = {
          total: await this.organizationModel.countDocuments(searchQuery),
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
   * Find one organization
   * @param {string} id
   * @param {string} slug
   * @returns {Promise<IOrganization>}
   */
  async findOne(id: string, slug: string): Promise<IOrganization> {
    try {
      let res = null;
      if (id) {
        res = await this.organizationModel.findOne({ _id: id });
      } else {
        res = await this.organizationModel.findOne({ slug: slug });
      }
      if (!res) {
        return Promise.reject(
          new NotFoundException('Could not find organization.'),
        );
      }
      return res;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * count organization
   * @returns {Promise<number>}
   */
  async count(query: SearchOrganizationDTO): Promise<number> {
    try {
      const searchQuery = createSearchQuery(query);
      return await this.organizationModel.countDocuments(searchQuery);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
}

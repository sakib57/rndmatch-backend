import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { customAlphabet } from 'nanoid';
import { IUser, IUserProfile, IPaginateUserProfile } from '../interfaces';
import {
  CreateUserProfileDTO,
  UpdateUserProfileDTO,
  UserProfileDTO,
  SearchUserProfileDTO,
} from '../dto';
import {
  createSearchQuery,
  subDocUpdateWithArray,
  subDocUpdateWithObj,
} from '../../common/utils/helper';
import { FilesService } from '../../files/services';
import { MediaDTO } from '../../common/dto';
import { ExtDTO } from '../dto/profiles/ext.dto';

@Injectable()
export class UserProfileService {
  private AWS_SERVICE_IMG_FOLDER = 'UserProfileImage';
  private AWS_SERVICE_RESUME_FOLDER = 'UserProfileResume';
  /**
   * Constructor
   * @param {Model<IUserProfile>} userProfileModel
   * @param {Model<IUser>} userModel
   * @param {service<FilesService>} filesService
   */
  constructor(
    @InjectModel('UserProfile')
    private readonly userProfileModel: Model<IUserProfile>,
    @InjectModel('User')
    private readonly userModel: Model<IUser>,
    private readonly filesService: FilesService,
  ) {}

  /**
   * Create a user profile
   * @param {IUser} user
   * @param {CreateUserProfileDTO} createUserProfileDTO
   * @returns {Promise<IUserProfile>}
   */
  create(
    user: IUser,
    createUserProfileDTO: CreateUserProfileDTO,
  ): Promise<IUserProfile> {
    try {
      const userProfileDTO = new UserProfileDTO();
      const slug = customAlphabet(
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890',
        8,
      );
      userProfileDTO.slug = slug();
      userProfileDTO.user = user._id;
      userProfileDTO.cBy = user._id;
      const setUserProfile = { ...userProfileDTO, ...createUserProfileDTO };
      const registerDoc = new this.userProfileModel(setUserProfile);
      return registerDoc.save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Edit profile data by user
   * @param {IUser} user
   * @param {UpdateUserProfileDTO} updateUserProfileDto
   * @param files
   * @returns {Promise<IUser>} mutated user data
   */
  async update(
    user: IUser,
    updateUserProfileDto: UpdateUserProfileDTO,
    files?: {
      profilePic?: Express.Multer.File[];
      coverPic?: Express.Multer.File[];
      resume?: Express.Multer.File[];
    },
  ) {
    try {
      const userProfile = await this.userProfileModel.findOne({
        user: user._id,
        isDeleted: false,
      });
      if (!userProfile) {
        return Promise.reject(new NotFoundException('User not found.'));
      }
      const profileDTO = new UserProfileDTO();

      if (files) {
        if (files && files.profilePic) {
          const { mimetype } = files.profilePic[0];
          const uploadRes = await this.filesService.upload(files.profilePic[0]);
          const mediaDTO = new MediaDTO();
          mediaDTO.uri = uploadRes.Location;
          mediaDTO.provider = uploadRes.provider;
          mediaDTO.mimetype = mimetype;
          const profilePic = userProfile.get('profilePic') || {};
          profileDTO.profilePic = subDocUpdateWithObj(profilePic, mediaDTO);
          if (userProfile.profilePercentage === 50) {
            profileDTO.profilePercentage = 75;
          }
        }

        if (files && files.coverPic) {
          const { mimetype } = files.coverPic[0];
          const uploadRes = await this.filesService.upload(files.coverPic[0]);
          const mediaDTO = new MediaDTO();
          mediaDTO.uri = uploadRes.Location;
          mediaDTO.provider = uploadRes.provider;
          mediaDTO.mimetype = mimetype;
          const coverPic = userProfile.get('coverPic') || {};
          profileDTO.coverPic = subDocUpdateWithObj(coverPic, mediaDTO);
        }

        if (files && files.resume) {
          const { mimetype } = files.resume[0];
          const uploadRes = await this.filesService.upload(files.resume[0]);
          const mediaDTO = new MediaDTO();
          mediaDTO.uri = uploadRes.Location;
          mediaDTO.provider = uploadRes.provider;
          mediaDTO.mimetype = mimetype;
          const ext = userProfile.get('ext') || {};
          const extDTO = new ExtDTO();
          extDTO.resume = mediaDTO;
          extDTO.resumeUTime = Date.now();
          profileDTO.ext = subDocUpdateWithObj(ext, extDTO);
        }
      } else {
        if (
          updateUserProfileDto &&
          updateUserProfileDto.hasOwnProperty('mobile')
        ) {
          const mobile = userProfile.get('mobile') || {};
          profileDTO.mobile = subDocUpdateWithObj(
            mobile,
            updateUserProfileDto.mobile,
          );
        }

        if (
          updateUserProfileDto &&
          updateUserProfileDto.hasOwnProperty('location')
        ) {
          const location = userProfile.get('location') || {};
          profileDTO.location = subDocUpdateWithObj(
            location,
            updateUserProfileDto.location,
          );
        }

        if (
          updateUserProfileDto &&
          updateUserProfileDto.hasOwnProperty('educations')
        ) {
          const educations = userProfile.get('educations') || [];
          profileDTO.educations = subDocUpdateWithArray(
            educations,
            updateUserProfileDto.educations,
          );
        }

        if (
          updateUserProfileDto &&
          updateUserProfileDto.hasOwnProperty('certificates')
        ) {
          const certificates = userProfile.get('certificates') || [];
          profileDTO.certificates = subDocUpdateWithArray(
            certificates,
            updateUserProfileDto.certificates,
          );
        }

        if (
          updateUserProfileDto &&
          updateUserProfileDto.hasOwnProperty('experiences')
        ) {
          const experiences = userProfile.get('experiences') || [];
          profileDTO.experiences = subDocUpdateWithArray(
            experiences,
            updateUserProfileDto.experiences,
          );
        }

        if (
          updateUserProfileDto &&
          updateUserProfileDto.hasOwnProperty('publications')
        ) {
          const publications = userProfile.get('publications') || [];
          profileDTO.publications = subDocUpdateWithArray(
            publications,
            updateUserProfileDto.publications,
          );
        }

        if (
          updateUserProfileDto &&
          updateUserProfileDto.hasOwnProperty('presentations')
        ) {
          const presentations = userProfile.get('presentations') || [];
          profileDTO.presentations = subDocUpdateWithArray(
            presentations,
            updateUserProfileDto.presentations,
          );
        }

        if (
          updateUserProfileDto &&
          updateUserProfileDto.hasOwnProperty('projects')
        ) {
          const projects = userProfile.get('projects') || [];
          profileDTO.projects = subDocUpdateWithArray(
            projects,
            updateUserProfileDto.projects,
          );
        }

        if (
          updateUserProfileDto &&
          updateUserProfileDto.hasOwnProperty('languages')
        ) {
          const languages = userProfile.get('languages') || [];
          profileDTO.languages = subDocUpdateWithArray(
            languages,
            updateUserProfileDto.languages,
          );
        }

        if (
          updateUserProfileDto &&
          updateUserProfileDto.hasOwnProperty('socials')
        ) {
          const socials = userProfile.get('socials') || [];
          profileDTO.socials = subDocUpdateWithArray(
            socials,
            updateUserProfileDto.socials,
          );
        }

        if (
          updateUserProfileDto &&
          updateUserProfileDto.hasOwnProperty('ext')
        ) {
          const ext = userProfile.get('ext') || {};
          profileDTO.ext = subDocUpdateWithObj(ext, updateUserProfileDto.ext);
        }

        if (
          updateUserProfileDto &&
          updateUserProfileDto.hasOwnProperty('preference')
        ) {
          const preference = userProfile.get('preference') || {};
          profileDTO.preference = subDocUpdateWithObj(
            preference,
            updateUserProfileDto.preference,
          );
        }

        if (
          updateUserProfileDto &&
          updateUserProfileDto.hasOwnProperty('profilePic')
        ) {
          const profilePic = userProfile.get('profilePic') || {};
          profileDTO.profilePic = subDocUpdateWithObj(
            profilePic,
            updateUserProfileDto.profilePic,
          );
        }

        if (
          updateUserProfileDto &&
          updateUserProfileDto.hasOwnProperty('coverPic')
        ) {
          const coverPic = userProfile.get('coverPic') || {};
          profileDTO.coverPic = subDocUpdateWithObj(
            coverPic,
            updateUserProfileDto.coverPic,
          );
        }
      }
      profileDTO.uTime = Date.now();
      const setProfile = { ...updateUserProfileDto, ...profileDTO };

      return await userProfile.set(setProfile).save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * find user profile
   * @param {string} id
   * @param {string} slug
   * @param {string} userId
   * @returns {Promise<IUserProfile>}
   */
  async findOne(
    id?: string,
    slug?: string,
    userId?: string,
  ): Promise<IUserProfile> {
    try {
      const searchQuery: any = {};
      if (!id && !slug && !userId) {
        return Promise.reject(
          new BadRequestException('Either id or slug or userId is required!'),
        );
      }
      if (id) searchQuery._id = id;
      if (slug) searchQuery.slug = slug;
      if (userId) searchQuery.user = userId;
      return this.userProfileModel
        .findOne(searchQuery)
        .populate({
          path: 'user',
          select: {
            email: 1,
            userPreference: 1,
            isActive: 1,
            isVerified: 1,
            isSuperAdmin: 1,
            isAdmin: 1,
          },
        })
        .populate([
          {
            path: 'location.city',
            select: {
              _id: 1,
              name: 1,
            },
          },
          {
            path: 'location.state',
            select: {
              _id: 1,
              name: 1,
            },
          },
          {
            path: 'location.country',
            select: {
              _id: 1,
              name: 1,
            },
          },
          {
            path: 'skills',
            select: {
              _id: 1,
              name: 1,
            },
          },
          {
            path: 'preference',
            populate: [
              {
                path: 'preferredSkills',
              },
              {
                path: 'positions',
              },
            ],
          },
        ])
        .lean()
        .exec();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Find All user profile
   * @returns {Promise<IPaginateUserProfile>}
   */
  async findAll(query: SearchUserProfileDTO): Promise<IPaginateUserProfile> {
    try {
      let sortQuery: any = { $natural: -1 };
      const searchQuery = createSearchQuery(query);
      const limit: number = (query && query.limit) || 10;
      const skip: number = (query && query.skip) || 0;

      if (query.hasOwnProperty('sort') && query.sort) {
        sortQuery = JSON.parse(query.sort);
      }

      if (
        query.hasOwnProperty('distance') &&
        query.hasOwnProperty('lat') &&
        query.hasOwnProperty('lng')
      ) {
        sortQuery = '';
        searchQuery['location.coordinates'] = {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [query.lat, query.lng],
            },
            $maxDistance: query.distance,
            $minDistance: 0,
          },
        };
      }

      const cursor = this.userProfileModel
        .find(searchQuery)
        .populate({
          path: 'user',
          select: {
            email: 1,
            userPreference: 1,
            isActive: 1,
            isVerified: 1,
            isSuperAdmin: 1,
            isAdmin: 1,
          },
        })
        .populate([
          {
            path: 'location.city',
            select: {
              _id: 1,
              name: 1,
            },
          },
          {
            path: 'location.state',
            select: {
              _id: 1,
              name: 1,
            },
          },
          {
            path: 'location.country',
            select: {
              _id: 1,
              name: 1,
            },
          },
          {
            path: 'skills',
            select: {
              _id: 1,
              name: 1,
            },
          },
          {
            path: 'preference',
            populate: [
              {
                path: 'preferredSkills',
              },
              {
                path: 'positions',
              },
            ],
          },
        ])
        .limit(limit)
        .skip(skip)
        .sort(sortQuery);

      const result: IPaginateUserProfile = {
        data: await cursor.exec(),
      };

      if (query.pagination) {
        result.pagination = {
          total: await this.userProfileModel.countDocuments(searchQuery),
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
   * Count All user profile
   * @returns {Promise<number>}
   */
  async count(query: SearchUserProfileDTO): Promise<number> {
    try {
      const searchQuery = createSearchQuery(query);

      if (
        query.hasOwnProperty('distance') &&
        query.hasOwnProperty('lat') &&
        query.hasOwnProperty('lng')
      ) {
        searchQuery['location.coordinates'] = {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [query.lat, query.lng],
            },
            $maxDistance: query.distance,
            $minDistance: 0,
          },
        };
      }

      return this.userProfileModel.countDocuments(searchQuery).exec();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
}

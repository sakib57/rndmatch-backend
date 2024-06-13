import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as moment from 'moment-timezone';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { customAlphabet } from 'nanoid';
import { IUser, IUserProfile } from '../../users/interfaces';
import { CreateJobDTO, JobDTO, UpdateJobDTO } from '../dto';
import { IJob } from '../interfaces/jobs/job.interface';
import {
  createSearchQuery,
  subDocUpdateWithArray,
  subDocUpdateWithObj,
} from '../../common/utils/helper';
import { IPaginateJob } from '../interfaces';
import { SearchJobDTO } from '../dto/search-job.dto';
import { IOrganization } from '../../organization/interfaces';
import { FilesService } from '../../files/services';
import { MediaDTO } from 'src/common/dto';
import { HttpService } from '@nestjs/axios';
import { profile } from 'console';

@Injectable()
export class JobService {
  /**
   * Constructor
   * @param {Model<IJob>} jobModel
   * @param {Model<IOrganization>} organizationModel
   * @param {Model<IUserProfile>} userProfileModel
   * @param {Service<FilesService>} filesService
   * @param {Service<HttpService>} httpService
   */
  constructor(
    @InjectModel('Job')
    private readonly jobModel: Model<IJob>,
    @InjectModel('Organization')
    private readonly organizationModel: Model<IOrganization>,
    @InjectModel('UserProfile')
    private readonly userProfileModel: Model<IUserProfile>,
    private readonly filesService: FilesService,
    private readonly httpService: HttpService,
  ) {}

  /**
   * Create a job
   * @param {IUser} user
   * @param {CreateJobDTO} cJobDTO
   * @returns {Promise<IJob>}
   */
  create(user: IUser, cJobDTO: CreateJobDTO): Promise<IJob> {
    try {
      const org = this.organizationModel.findOne({
        _id: cJobDTO.organization,
        isDeleted: false,
      });
      if (!org) {
        return Promise.reject(
          new NotFoundException('Could not find Organization.'),
        );
      }
      const jobDTO = new JobDTO();
      const slug = customAlphabet(
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890',
        8,
      );
      jobDTO.slug = slug();
      jobDTO.cBy = user._id;
      jobDTO.postBy = cJobDTO.postBy || user._id;
      jobDTO.cTime =
        (cJobDTO?.timezone && moment().tz(cJobDTO.timezone).valueOf()) ||
        Date.now();
      const setJob = { ...jobDTO, ...cJobDTO };
      const registerDoc = new this.jobModel(setJob);
      return registerDoc.save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Update Job
   * @param {IUser} user
   * @param {string} id
   * @param {UpdateJobDTO} uJobDTO
   * @returns {Promise<IJob>}
   */
  async update(
    user: IUser,
    id: string,
    uJobDTO: UpdateJobDTO,
    files?: {
      jobPic?: Express.Multer.File[];
    },
  ): Promise<IJob> {
    try {
      const job = await this.jobModel.findOne({
        _id: id,
        isDeleted: false,
      });
      if (!job) {
        return Promise.reject(new NotFoundException('Could not find Job.'));
      }
      const jobDTO = new JobDTO();

      if (files) {
        if (files && files.jobPic) {
          const { mimetype } = files.jobPic[0];
          const uploadRes = await this.filesService.upload(files.jobPic[0]);
          const mediaDTO = new MediaDTO();
          mediaDTO.uri = uploadRes.Location;
          mediaDTO.provider = uploadRes.provider;
          mediaDTO.mimetype = mimetype;
          const jobPic = job.get('jobPic') || {};
          jobDTO.jobPic = subDocUpdateWithObj(jobPic, mediaDTO);
        }
      } else {
        if (uJobDTO && uJobDTO.hasOwnProperty('location')) {
          if (uJobDTO.location.lng && uJobDTO.location.lng) {
            uJobDTO.location.type = 'Point';
            uJobDTO.location.coordinates = [
              uJobDTO.location.lat,
              uJobDTO.location.lng,
            ];
          }
        }

        if (uJobDTO && uJobDTO.hasOwnProperty('socials')) {
          const jobSalary = job.get('salaryRange') || [];
          jobDTO.salaryRange = subDocUpdateWithArray(
            jobSalary,
            uJobDTO.salaryRange,
          );
        }
      }

      jobDTO.uBy = user._id;
      jobDTO.uTime =
        (uJobDTO?.timezone && moment().tz(uJobDTO.timezone).valueOf()) ||
        Date.now();
      const setJob = { ...uJobDTO, ...jobDTO };
      return await job.set(setJob).save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Find All Jobs
   * @param {SearchJobDTO} query
   * @returns {Promise<IPaginateJob>}
   */
  async findAll(query: SearchJobDTO): Promise<IPaginateJob> {
    try {
      const searchQuery = createSearchQuery(query);
      const limit: number = (query && query.limit) || 10;
      const skip: number = (query && query.skip) || 0;

      const cursor = this.jobModel
        .find(searchQuery)
        .populate([
          {
            path: 'location.state',
          },
          {
            path: 'location.country',
          },
          {
            path: 'organization',
          },
          {
            path: 'primarySkills',
          },
          {
            path: 'secondarySkills',
          },
          {
            path: 'techStacks',
          },
          {
            path: 'hiringTeam',
          },
          {
            path: 'postBy',
            populate: {
              path: 'profile',
            },
          },
        ])
        .limit(limit)
        .skip(skip);

      if (query.hasOwnProperty('sort') && query.sort) {
        cursor.sort(JSON.parse(query.sort));
      }

      const result: IPaginateJob = {
        jobs: await cursor.exec(),
      };

      if (query.pagination) {
        result.pagination = {
          total: await this.jobModel.countDocuments(searchQuery),
          limit,
          skip,
        };
      }
      return result;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /** Delete Job
   * @param {IUser} user
   * @param {string} id
   * @returns {Promise<IJob>}
   **/
  async delete(id: string, user: IUser): Promise<IJob> {
    try {
      const job = await this.jobModel.findOne({ _id: id });
      if (!job) {
        return Promise.reject(new NotFoundException('Could not find skill.'));
      }
      const jobDTO = new JobDTO();
      jobDTO.isDeleted = true;
      jobDTO.isActive = false;
      jobDTO.dBy = user._id;
      jobDTO.dTime =
        (jobDTO?.timezone && moment().tz(jobDTO.timezone).valueOf()) ||
        Date.now();

      return await job.set(jobDTO).save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * count Jobs
   * @returns {Promise<number>}
   */
  async count(query: SearchJobDTO): Promise<number> {
    try {
      const searchQuery = createSearchQuery(query);
      return await this.jobModel.countDocuments(searchQuery);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  async matchCandidate(id: string) {
    const url = `http://localhost:8008/matching/${id}`;
    const res = await this.httpService.get(url).toPromise();
    const data = JSON.parse(res?.data);
    const ids = [];
    const scoreSet = {};
    data &&
      data.map((record) => {
        ids.push(record._id);
        scoreSet[record._id] = record.score;
      });
    const users: Array<any> = await this.userProfileModel
      .find({
        _id: { $in: ids },
      })
      .populate([
        {
          path: 'skills',
        },
        {
          path: 'user',
          populate: {
            path: 'profile',
          },
        },
        {
          path: 'preference.preferredSkills',
        },
        {
          path: 'preference.positions',
        },
        {
          path: 'preference.positions',
        },
      ])
      .exec();

    for (let i = 0; i < users.length; i++) {
      users[i] = users[i].toObject();
      users[i]['score'] = scoreSet[users[i]._id];
    }
    return users.sort(function (a, b) {
      return parseFloat(b.score) - parseFloat(a.score);
    });
  }
}

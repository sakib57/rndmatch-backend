import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as moment from 'moment-timezone';
import { IUser } from '../../users/interfaces';
import {
  CreateJobApplicationDTO,
  JobApplicationDTO,
  SearchJobApplicationDTO,
  UpdateJobApplicationDTO,
} from '../dto';
import { IJobApplication } from '../interfaces/job-application.interface';
import {
  createSearchQuery,
  subDocUpdateWithObj,
} from 'src/common/utils/helper';
import { IPaginateJobApplication } from '../interfaces/paginate.interface';
import { FilesService } from '../../files/services';
import { MediaDTO } from '../../common/dto';

@Injectable()
export class JobApplicationService {
  /**
   * Constructor
   * @param {Model<IJobApplication>} jobApplicationModel
   */
  constructor(
    @InjectModel('JobApplication')
    private readonly jobApplicationModel: Model<IJobApplication>,
    private readonly filesService: FilesService,
  ) {}

  /**
   * Create a job application
   * @param {IUser} user
   * @param {CreateJobApplicationDTO} cJobApplicationDTO
   * @returns {Promise<IJobApplication>}
   */
  async create(
    user: IUser,
    cJobApplicationDTO: CreateJobApplicationDTO,
  ): Promise<IJobApplication> {
    try {
      const jobApplication = await this.jobApplicationModel.findOne({
        job: cJobApplicationDTO?.job,
        jobSeeker: cJobApplicationDTO?.jobSeeker,
      });
      if (jobApplication) {
        return Promise.reject(
          new ConflictException('Already applied to this job.'),
        );
      }
      const jobApplicationDTO = new JobApplicationDTO();
      jobApplicationDTO.cBy = user._id;
      jobApplicationDTO.cTime =
        (cJobApplicationDTO?.timezone &&
          moment().tz(cJobApplicationDTO.timezone).valueOf()) ||
        Date.now();
      const setJobApplication = { ...jobApplicationDTO, ...cJobApplicationDTO };
      const registerDoc = new this.jobApplicationModel(setJobApplication);
      return await registerDoc.save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Update Job Application
   * @param {IUser} user
   * @param {string} id
   * @param {UpdateJobApplicationDTO} uJobApplicationDTO
   * @returns {Promise<IJobApplication>}
   */
  async update(
    user: IUser,
    id: string,
    uJobApplicationDTO: UpdateJobApplicationDTO,
    files: {
      resume?: Express.Multer.File[];
    },
  ): Promise<IJobApplication> {
    try {
      const jobApplication = await this.jobApplicationModel.findOne({
        _id: id,
        isDeleted: false,
      });
      if (!jobApplication) {
        return Promise.reject(
          new NotFoundException('Could not find Job Application.'),
        );
      }
      const jobApplicationDTO = new JobApplicationDTO();

      if (files) {
        if (files && files.resume) {
          const { mimetype } = files.resume[0];
          const uploadRes = await this.filesService.upload(files.resume[0]);
          const mediaDTO = new MediaDTO();
          mediaDTO.uri = uploadRes.Location;
          mediaDTO.provider = uploadRes.provider;
          mediaDTO.mimetype = mimetype;
          const resume = jobApplication.get('resume') || {};
          jobApplicationDTO.resume = subDocUpdateWithObj(resume, mediaDTO);
        }
      }

      jobApplicationDTO.uBy = user._id;
      jobApplicationDTO.uTime =
        (uJobApplicationDTO?.timezone &&
          moment().tz(uJobApplicationDTO.timezone).valueOf()) ||
        Date.now();
      const setJob = { ...uJobApplicationDTO, ...jobApplicationDTO };

      return await jobApplication.set(setJob).save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Find All organization
   * @param {SearchOrganizationDTO} query
   * @returns {Promise<IPaginateJobApplication>}
   */
  async findAll(
    query: SearchJobApplicationDTO,
  ): Promise<IPaginateJobApplication> {
    try {
      const searchQuery = createSearchQuery(query);
      const limit: number = (query && query.limit) || 10;
      const skip: number = (query && query.skip) || 0;

      const cursor = this.jobApplicationModel
        .find(searchQuery)
        .populate({
          path: 'jobSeeker',
          populate: {
            path: 'profile',
          },
        })
        .populate({
          path: 'job',
        })
        .limit(limit)
        .skip(skip);
      if (query.hasOwnProperty('sort') && query.sort) {
        cursor.sort(JSON.parse(query.sort));
      }

      const result: IPaginateJobApplication = {
        jobApplications: await cursor.exec(),
      };

      if (query.pagination) {
        result.pagination = {
          total: await this.jobApplicationModel.countDocuments(searchQuery),
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
   * Find one Job Application
   * @param {string} id
   * @param {string} slug
   * @returns {Promise<IJobApplication>}
   */
  async findOne(id: string): Promise<IJobApplication> {
    try {
      let res = null;
      res = await this.jobApplicationModel.findOne({
        _id: id,
        isDeleted: false,
      });

      if (!res) {
        return Promise.reject(
          new NotFoundException('Could not find Job Application.'),
        );
      }
      return res;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /** Delete Job Application
   * @param {IUser} user
   * @param {string} id
   * @returns {Promise<IJobApplication>}
   **/
  async delete(id: string, user: IUser): Promise<IJobApplication> {
    try {
      const job = await this.jobApplicationModel.findOne({ _id: id });
      if (!job) {
        return Promise.reject(new NotFoundException('Could not find skill.'));
      }
      const jobApplicationDTO = new JobApplicationDTO();
      jobApplicationDTO.isDeleted = true;
      jobApplicationDTO.isActive = false;
      jobApplicationDTO.dBy = user._id;
      jobApplicationDTO.dTime =
        (jobApplicationDTO?.timezone &&
          moment().tz(jobApplicationDTO.timezone).valueOf()) ||
        Date.now();

      return await job.set(jobApplicationDTO).save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * count Job Application
   * @returns {Promise<number>}
   */
  async count(query: SearchJobApplicationDTO): Promise<number> {
    try {
      const searchQuery = createSearchQuery(query);
      return await this.jobApplicationModel.countDocuments(searchQuery);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
}

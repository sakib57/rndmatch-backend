import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from '../../users/interfaces';
import {
  CreatePackageDTO,
  PackageDTO,
  SearchPackageDTO,
  UpdatePackageDTO,
} from '../dto';
import * as moment from 'moment-timezone';
import {
  createSearchQuery,
  subDocUpdateWithObj,
} from '../../common/utils/helper';
import { IPackage, IPaginatePackage } from '../interfaces';

@Injectable()
export class PackageService {
  /**
   * Constructor
   * @param {Model<IPackage>} packageModel
   */
  constructor(
    @InjectModel('Package')
    private readonly packageModel: Model<IPackage>,
  ) {}

  /**
   * Create Package
   * @param {IUser} user
   * @param {CreatePackageDTO} cPackageDTO
   * @returns {Promise<IPackage>}
   */
  async create(user: IUser, cPackageDTO: CreatePackageDTO): Promise<IPackage> {
    try {
      const packageDTO = new PackageDTO();
      packageDTO.cBy = user._id;
      packageDTO.cTime =
        (cPackageDTO?.timezone &&
          moment().tz(cPackageDTO.timezone).valueOf()) ||
        Date.now();
      const setPackage = { ...cPackageDTO, ...PackageDTO };
      const registerDoc = new this.packageModel(setPackage);
      return await registerDoc.save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Update Package
   * @param {IUser} user
   * @param {string} id
   * @param {UpdatePackageDTO} uPackageDTO
   * @returns {Promise<IPackage>}
   */
  async update(
    user: IUser,
    id: string,
    uPackageDTO: UpdatePackageDTO,
  ): Promise<IPackage> {
    try {
      const _package = await this.packageModel.findOne({
        _id: id,
        isDeleted: false,
      });
      if (!_package) {
        return Promise.reject(new NotFoundException('Could not find Package.'));
      }
      const packageDTO = new PackageDTO();

      if (uPackageDTO && uPackageDTO.hasOwnProperty('weeklyPrice')) {
        const weeklyPrice = _package.get('weeklyPrice') || {};
        packageDTO.weeklyPrice = subDocUpdateWithObj(
          weeklyPrice,
          uPackageDTO.weeklyPrice,
        );
      }

      if (uPackageDTO && uPackageDTO.hasOwnProperty('monthlyPrice')) {
        const monthlyPrice = _package.get('monthlyPrice') || {};
        packageDTO.monthlyPrice = subDocUpdateWithObj(
          monthlyPrice,
          uPackageDTO.monthlyPrice,
        );
      }

      if (uPackageDTO && uPackageDTO.hasOwnProperty('annualPrice')) {
        const annualPrice = _package.get('annualPrice') || {};
        packageDTO.annualPrice = subDocUpdateWithObj(
          annualPrice,
          uPackageDTO.annualPrice,
        );
      }

      packageDTO.uBy = user._id;
      packageDTO.uTime =
        (uPackageDTO?.timezone &&
          moment().tz(uPackageDTO.timezone).valueOf()) ||
        Date.now();
      const setPackage = { ...uPackageDTO, ...packageDTO };

      return await _package.set(setPackage).save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Find All Package
   * @param {SearchPackageDTO} query
   * @returns {Promise<IPaginatePackage>}
   */
  async findAll(query: SearchPackageDTO): Promise<IPaginatePackage> {
    try {
      const searchQuery = createSearchQuery(query);
      const limit: number = (query && query.limit) || 10;
      const skip: number = (query && query.skip) || 0;

      const cursor = !query.getAllRecord
        ? this.packageModel.find(searchQuery).limit(limit).skip(skip)
        : this.packageModel.find(searchQuery);
      if (query.hasOwnProperty('sort') && query.sort) {
        cursor.sort(JSON.parse(query.sort));
      }

      const result: IPaginatePackage = {
        packages: await cursor.exec(),
      };

      if (query.pagination) {
        result.pagination = {
          total: await this.packageModel.countDocuments(searchQuery),
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
   * Find one Package
   * @param {string} id
   * @returns {Promise<IPackage>}
   */
  async findOne(id: string): Promise<IPackage> {
    try {
      let res = null;
      res = await this.packageModel.findOne({
        _id: id,
        isDeleted: false,
      });

      if (!res) {
        return Promise.reject(new NotFoundException('Could not find Package.'));
      }
      return res;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /** Delete Package
   * @param {IUser} user
   * @param {string} id
   * @returns {Promise<IPackage>}
   **/
  async delete(id: string, user: IUser): Promise<IPackage> {
    try {
      const _package = await this.packageModel.findOne({ _id: id });
      if (!_package) {
        return Promise.reject(new NotFoundException('Could not find Package.'));
      }
      const packageDTO = new PackageDTO();
      packageDTO.isDeleted = true;
      packageDTO.isActive = false;
      packageDTO.dBy = user._id;
      packageDTO.dTime =
        (packageDTO?.timezone && moment().tz(packageDTO.timezone).valueOf()) ||
        Date.now();

      return await _package.set(packageDTO).save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * count Package
   * @returns {Promise<number>}
   */
  async count(query: SearchPackageDTO): Promise<number> {
    try {
      const searchQuery = createSearchQuery(query);
      return await this.packageModel.countDocuments(searchQuery);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
}

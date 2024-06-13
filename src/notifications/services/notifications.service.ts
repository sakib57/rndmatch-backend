import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateNotificationDTO,
  UpdateNotificationDTO,
  NotificationDTO,
} from '../dto';
import { Server } from 'socket.io';
import { INotification, INotificationWithCount } from '../interfaces';
import { IUser } from '../../users/interfaces';

@WebSocketGateway({ cors: true })
@Injectable()
export class NotificationsService {
  @WebSocketServer() server: Server;
  /**
   * Constructor
   * @param {Model<INotification>} notificationModel,
   */
  constructor(
    @InjectModel('Notification')
    private readonly notificationModel: Model<INotification>,
  ) {}

  /**
   * Create Notification
   * @param {CreateNotificationDTO} createNotificationDto
   * @returns {Promise<INotification>}
   */
  async create(
    createNotificationDto: CreateNotificationDTO,
  ): Promise<INotification> {
    try {
      const resp = await new this.notificationModel(
        createNotificationDto,
      ).save();

      const result = await this.notificationModel
        .findOne({ _id: resp._id })
        .populate({
          path: 'receiver',
          select: {
            _id: 1,
            email: 1,
          },
          populate: {
            path: 'profile',
            select: {
              _id: 1,
              firstName: 1,
              middleName: 1,
              lastName: 1,
              gender: 1,
              profilePic: 1,
            },
          },
        })
        .populate({
          path: 'sender',
          select: {
            _id: 1,
            email: 1,
          },
          populate: {
            path: 'profile',
            select: {
              _id: 1,
              firstName: 1,
              middleName: 1,
              lastName: 1,
              gender: 1,
              profilePic: 1,
            },
          },
        })
        .populate({
          path: 'job',
          select: {
            _id: 1,
            title: 1,
          },
        });

      const unreadCount = await this.notificationModel.count({
        receiver: createNotificationDto.receiver,
        isRead: false,
      });

      this.server.emit(`notification-${createNotificationDto.receiver}`, {
        notification: result,
        unreadCount: unreadCount,
      });

      return result;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * update Notification
   * @Param {string} id
   * @Body {UpdateNotificationDTO} updateNotificationDTO
   * @returns {Promise<INotification>}
   */
  async update(id: string, updateNotificationDTO: UpdateNotificationDTO) {
    try {
      const notification = await this.notificationModel.findOne({ _id: id });
      const notificationDTO = new NotificationDTO();

      notificationDTO.uTime = Date.now();
      const setNotification = { ...updateNotificationDTO, ...notificationDTO };

      return await notification.set(setNotification).save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * update bulk Notification
   * @Body {IUser} user
   */
  async updateBulk(user: IUser): Promise<any> {
    try {
      return await this.notificationModel.updateMany(
        {
          receiver: user._id,
          isRead: false,
        },
        { $set: { isRead: true } },
      );
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * find all notifications
   * @returns {Promise<INotificationWithCount>}
   */
  async findAll(user: IUser, query): Promise<INotificationWithCount> {
    try {
      const searchQuery: any = {};

      searchQuery.receiver = user._id;

      if (query.hasOwnProperty('activityType')) {
        searchQuery.activityType = query.activityType;
      }

      const limit: number = (query && query.limit) || 10;
      const skip: number = (query && query.skip) || 0;

      const unreadCount = await this.notificationModel.count({
        receiver: user._id,
        isRead: false,
      });

      const notifications = await this.notificationModel
        .find(searchQuery)
        .populate({
          path: 'receiver',
          select: {
            _id: 1,
            email: 1,
          },
          populate: {
            path: 'profile',
            select: {
              _id: 1,
              firstName: 1,
              middleName: 1,
              lastName: 1,
              gender: 1,
              profilePic: 1,
            },
          },
        })
        .populate({
          path: 'sender',
          select: {
            _id: 1,
            email: 1,
          },
          populate: {
            path: 'profile',
            select: {
              _id: 1,
              firstName: 1,
              middleName: 1,
              lastName: 1,
              gender: 1,
              profilePic: 1,
            },
          },
        })
        .limit(limit)
        .skip(skip)
        .sort({ uTime: -1 })
        .exec();
      return {
        notifications: notifications,
        unreadCount: unreadCount,
      };
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
}

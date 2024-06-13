import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SearchQueryDTO } from '../../common/dto';
import { IUser } from '../../users/interfaces';
import {
  ThreadDTO,
  CreateThreadDTO,
  UpdateThreadDTO,
  CreateChatDTO,
} from '../dto';
import { IThread, IThreadsWithCount } from '../interfaces';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { IChat } from '../interfaces';
import * as moment from 'moment-timezone';
import { ChatService } from './chat.service';
/**
 * Thread Service
 */
@WebSocketGateway({ cors: true })
@Injectable()
export class ThreadService {
  @WebSocketServer() server: Server;
  private readonly password = 'oS1H+dKX1+OkXUu3jABIKqThi5/BJJtB0OCo';

  /**
   * Constructor
   * @param {Model<IThread>} threadModel
   * @param {Model<ChatService>} chatService
   */
  constructor(
    @InjectModel('Thread')
    private readonly threadModel: Model<IThread>,
    private readonly chatService: ChatService,
  ) {}

  /**
   * Create thread
   * @param {IUser} user
   * @param {CreateThreadDTO} cThreadDTO
   * @returns {Promise<IThread>}
   */
  async create(
    user: IUser,
    cThreadDTO: CreateThreadDTO,
  ): Promise<IThread | IChat | any> {
    try {
      const threadDTO = new ThreadDTO();
      threadDTO.cBy = user._id;
      threadDTO.userOne = user._id;
      const setThread = { ...cThreadDTO, ...threadDTO };
      const searchQuery: any = {
        $or: [
          { userOne: user._id, userTwo: cThreadDTO.userTwo },
          { userOne: cThreadDTO.userTwo, userTwo: user._id },
        ],
      };
      const thread = await this.threadModel.findOne(searchQuery);
      if (!thread) {
        setThread.cTime =
          (cThreadDTO?.timezone &&
            moment().tz(cThreadDTO.timezone).valueOf()) ||
          Date.now();
        const registerDoc = new this.threadModel(setThread);
        const response = await registerDoc.save();

        const saveThread = await this.threadModel
          .findOne({ _id: response?._id })
          .populate({
            path: 'userOne',
            select: {
              _id: 1,
            },
            populate: {
              path: 'profile',
              select: {
                _id: 1,
                firstName: 1,
                lastName: 1,
                middleName: 1,
                location: 1,
                profilePic: 1,
              },
            },
          })
          .populate({
            path: 'userTwo',
            select: {
              _id: 1,
            },
            populate: {
              path: 'profile',
              select: {
                _id: 1,
                firstName: 1,
                lastName: 1,
                middleName: 1,
                location: 1,
                profilePic: 1,
              },
            },
          })
          .populate({
            path: 'chats',
            options: {
              sort: { $natural: 1 },
            },
          })
          .populate({
            path: 'job',
            select: {
              title: 1,
              slug: 1,
            },
          });

        this.server.emit(`new-thread-${setThread.userOne}`, {
          thread: saveThread,
        });
        this.server.emit(`new-thread-${setThread.userTwo}`, {
          thread: saveThread,
        });
        const chatDTO = new CreateChatDTO();
        chatDTO.message = cThreadDTO.message;
        chatDTO.receiver = cThreadDTO.userTwo;
        chatDTO.thread = saveThread._id;
        await this.chatService.create(user, chatDTO);
        return saveThread;
      } else {
        const chatDTO = new CreateChatDTO();
        chatDTO.message = cThreadDTO.message;
        chatDTO.receiver = cThreadDTO.userTwo;
        chatDTO.thread = thread._id;
        return await this.chatService.create(user, chatDTO);
      }
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Edit thread
   * @param {string} id
   * @param {UpdateThreadDTO} uThreadDTO
   * @param {IUser} user
   * @returns {Promise<IThread>}
   */
  async update(
    id: string,
    uThreadDTO: UpdateThreadDTO,
    user: IUser,
  ): Promise<IThread> {
    try {
      const thread = await this.threadModel.findOne({ _id: id });
      if (!thread) {
        throw new NotFoundException('Could not find thread.');
      }

      const threadDTO = new ThreadDTO();
      threadDTO.uBy = user._id;
      threadDTO.uTime = Date.now();

      const setThread = {
        ...uThreadDTO,
        ...threadDTO,
      };

      return thread.set(setThread).save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * update bulk Thread
   * @Body {IUser} user
   */
  async updateBulk(user: IUser) {
    try {
      const userOne: any = await this.threadModel.updateMany(
        {
          userOne: user._id,
          isUserOneRead: false,
        },
        { $set: { isUserOneRead: true } },
      );
      const userTwo: any = await this.threadModel.updateMany(
        {
          userTwo: user._id,
          isUserTwoRead: false,
        },
        { $set: { isUserTwoRead: true } },
      );
      const totalModified =
        (userOne?.nModified || 0) + (userTwo?.nModified || 0);
      const total = (userOne?.n || 0) + (userTwo?.n || 0);
      return {
        total: total,
        modified: totalModified,
      };
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Fetches thread
   * @returns {Promise<IThread[]>}
   */
  public async findAll(
    query: SearchQueryDTO,
    user: IUser,
  ): Promise<IThreadsWithCount> {
    try {
      const searchQuery: any = {
        isDeleted: false,
        $or: [{ userOne: user._id }, { userTwo: user._id }],
      };

      const limit: number = (query && query.limit) || 20;
      const skip: number = (query && query.skip) || 0;

      const threads = await this.threadModel
        .find(searchQuery)
        .populate({
          path: 'userOne',
          populate: {
            path: 'profile',
            select: {
              _id: 1,
              firstName: 1,
              lastName: 1,
              middleName: 1,
              location: 1,
              profilePic: 1,
            },
          },
        })
        .populate({
          path: 'userTwo',
          populate: {
            path: 'profile',
            select: {
              _id: 1,
              firstName: 1,
              lastName: 1,
              middleName: 1,
              location: 1,
              profilePic: 1,
            },
          },
        })
        .populate({
          path: 'chats',
          options: {
            sort: { $natural: 1 },
          },
        })
        .populate({
          path: 'job',
          select: {
            title: 1,
            slug: 1,
          },
        })
        .limit(limit)
        .skip(skip)
        .sort({ $natural: -1 })
        .exec();

      const receiverUnreadCount = await this.threadModel
        .count({
          $or: [
            { userOne: user._id, isUserOneRead: false },
            { userTwo: user._id, isUserTwoRead: false },
          ],
        })
        .exec();
      return { threads: threads, receiverUnreadCount: receiverUnreadCount };
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * find single thread
   * @param {string} id
   * @returns {Promise<IThread>}
   */
  async findOne(id: string): Promise<IThread> {
    try {
      const thread = await this.threadModel
        .findOne({ _id: id })
        .populate('job')
        .exec();
      if (!thread) {
        throw new NotFoundException('Could not find thread.');
      }
      return thread;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
}

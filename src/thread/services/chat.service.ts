import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SearchQueryDTO } from '../../common/dto';
import { IUser } from '../../users/interfaces';
import { ChatDTO, CreateChatDTO, UpdateChatDto } from '../dto';
import { IChat, IThread } from '../interfaces';
import { encodeToken, decodeToken } from '../../common/utils/helper';
import * as moment from 'moment-timezone';
/**
 * Chat Service
 */
@WebSocketGateway({ cors: true })
@Injectable()
export class ChatService {
  @WebSocketServer() server: Server;
  private readonly password = 'oS1H+dKX1+OkXUu3jABIKqThi5/BJJtB0OCo';
  /**
   * Constructor
   * @param {Model<IChat>} chatModel
   * @param {Model<IThread>} threadModel
   */
  constructor(
    @InjectModel('Chat')
    private readonly chatModel: Model<IChat>,
    @InjectModel('Thread')
    private readonly threadModel: Model<IThread>,
  ) {}

  /**
   * Create chat
   * @param {IUser} user
   * @param {CreateChatDTO} createChatDTO
   * @returns {Promise<IChat>}
   */
  async create(user: IUser, createChatDTO: CreateChatDTO): Promise<IChat> {
    try {
      const createdTime =
        (createChatDTO.timezone &&
          moment().tz(createChatDTO.timezone).valueOf()) ||
        Date.now();
      const chatDTO = new ChatDTO();
      chatDTO.sender = user._id;
      chatDTO.cBy = user._id;
      chatDTO.cTime = createdTime;
      chatDTO.uTime = createdTime;
      chatDTO.message = await encodeToken(createChatDTO.message, this.password);
      const setChat = { ...createChatDTO, ...chatDTO };
      const registerDoc = new this.chatModel(setChat);
      const saveChat = await registerDoc.save();
      saveChat.message = await decodeToken(saveChat.message, this.password);
      await this.threadModel.updateOne(
        {
          _id: createChatDTO.thread,
          userOne: createChatDTO.receiver,
          isUserOneRead: true,
        },
        { $set: { isUserOneRead: false } },
      );
      await this.threadModel.updateOne(
        {
          _id: createChatDTO.thread,
          userTwo: createChatDTO.receiver,
          isUserTwoRead: true,
        },
        { $set: { isUserTwoRead: false } },
      );
      const receiverUnreadCount = await this.threadModel
        .count({
          $or: [
            { userOne: createChatDTO.receiver, isUserOneRead: false },
            { userTwo: createChatDTO.receiver, isUserTwoRead: false },
          ],
        })
        .exec();
      this.server.emit(`thread-message-${registerDoc.thread}`, {
        thread: saveChat.thread,
        chat: saveChat,
        receiverUnreadCount: receiverUnreadCount,
      });
      return saveChat;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Edit chat
   * @param {string} id
   * @param {UpdateChatDto} uChatDTO
   * @param {IUser} user
   * @returns {Promise<IChat>}
   */
  async update(
    id: string,
    uChatDTO: UpdateChatDto,
    user: IUser,
  ): Promise<IChat> {
    try {
      const chat = await this.chatModel.findOne({ _id: id });
      if (!chat) {
        throw new NotFoundException('Could not find chat.');
      }

      const chatDTO = new ChatDTO();
      chatDTO.uBy = user._id;
      chatDTO.uTime = Date.now();

      const setChat = {
        ...uChatDTO,
        ...chatDTO,
      };

      return chat.set(setChat).save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Fetches chats
   * @returns {Promise<IChat[]>}
   */
  public async findAll(query: SearchQueryDTO): Promise<IChat[]> {
    try {
      const searchQuery: any = {
        isDeleted: false,
      };

      const limit: number = (query && query.limit) || 100;
      const skip: number = (query && query.skip) || 0;
      return await this.chatModel
        .find(searchQuery)
        .limit(limit)
        .skip(skip)
        .sort({ $natural: -1 })
        .exec();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
}

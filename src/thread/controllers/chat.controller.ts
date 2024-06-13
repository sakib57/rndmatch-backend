import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  HttpException,
  HttpStatus,
  MethodNotAllowedException,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EmailInterceptor } from '../../common/interceptor/email.interceptor';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { User } from '../../common/decorators/user.decorator';
import { SearchQueryDTO } from '../../common/dto';
import { TrimPipe } from '../../common/pipes/trim.pipe';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { IUser } from '../../users/interfaces';
import { CreateChatDTO, UpdateChatDto } from '../dto';
import { IChat } from '../interfaces';
import { ChatService } from '../services';

@ApiTags('Chat')
@ApiResponse({
  status: HttpStatus.METHOD_NOT_ALLOWED,
  description: 'Method not allowed',
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Server Error!',
})
@Controller('chat')
export class ChatController {
  /**
   * Constructor
   * @param {ChatService} chatService
   */
  constructor(private readonly chatService: ChatService) {}

  /**
   * Create chat
   * @param {IUser} user
   * @param {CreateChatDTO} cChatDTO
   * @returns {Promise<IChat>}
   */
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Chat Creation' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return new chat.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @ApiResponse({
    status: HttpStatus.NOT_ACCEPTABLE,
    description: 'Record already exist',
  })
  @UsePipes(new ValidationPipe(true))
  @UsePipes(new TrimPipe())
  @UseInterceptors(EmailInterceptor)
  @UseGuards(JwtAuthGuard)
  @Post('add')
  public async create(
    @User() user: IUser,
    @Body() cChatDTO: CreateChatDTO,
  ): Promise<IChat> {
    try {
      return this.chatService.create(user, cChatDTO);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  @ApiExcludeEndpoint()
  @Get('add')
  public createGet() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Put('add')
  public createPut() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Patch('add')
  public createPatch() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Delete('add')
  public createDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  /**
   * update chat
   * @Param {string} id
   * @Body {UpdateChatDTO} uChatDTO
   * @Param {IUser} user
   * @returns {Promise<IChat>}
   */
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Chat update' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return updated chat.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Chat not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @UsePipes(new ValidationPipe(true))
  @UsePipes(new TrimPipe())
  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  public async update(
    @Param('id') id: string,
    @Body() uChatDTO: UpdateChatDto,
    @User() user: IUser,
  ): Promise<IChat> {
    try {
      return this.chatService.update(id, uChatDTO, user);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  @ApiExcludeEndpoint()
  @Get('update/:id')
  public updateThemeGet() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Put('update/:id')
  public updateThemePut() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Post('update/:id')
  public updateThemePost() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Delete('update/:id')
  public updateThemeDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  /**
   * Find chat
   * @Query {Object} query
   * @returns {Promise<IChat[]>}
   */
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Get All chat' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return chats.',
  })
  @UseGuards(JwtAuthGuard)
  @Get('list')
  @UsePipes(new ValidationPipe(true))
  findAll(@Query() query: SearchQueryDTO | null): Promise<IChat[]> {
    try {
      return this.chatService.findAll(query);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  @ApiExcludeEndpoint()
  @Post('list')
  public findAllPost() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Put('list')
  public findAllPut() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Patch('list')
  public findAllPatch() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Delete('list')
  public findAllDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }
}

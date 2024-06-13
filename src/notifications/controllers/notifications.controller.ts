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
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { User } from '../../common/decorators/user.decorator';
import { SearchQueryDTO } from '../../common/dto';
import { TrimPipe } from '../../common/pipes/trim.pipe';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { IUser } from '../../users/interfaces';
import { CreateNotificationDTO, UpdateNotificationDTO } from '../dto';
import { NotificationsService } from '../services/notifications.service';
import { INotification, INotificationWithCount } from '../interfaces';

@ApiTags('Notification')
@ApiResponse({
  status: HttpStatus.METHOD_NOT_ALLOWED,
  description: 'Method not allowed',
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Server Error!',
})
@Controller('notification')
export class NotificationController {
  /**
   * Constructor
   * @param {NotificationsService} notificationService
   */
  constructor(private readonly notificationService: NotificationsService) {}

  /**
   * Create notification
   * @param {IUser} user
   * @param {CreateNotificationDTO} cNotificationDTO
   * @returns {Promise<INotification>}
   */
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Notification Creation' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return new notification.',
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
  @UseGuards(JwtAuthGuard)
  @Post('add')
  public async create(
    @User() user: IUser,
    @Body() cNotificationDTO: CreateNotificationDTO,
  ): Promise<INotification> {
    try {
      return this.notificationService.create(cNotificationDTO);
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
   * update Notification
   * @Param {string} id
   * @Body {UpdateNotificationDTO} uNotificationDTO
   * @returns {Promise<INotification>}
   */
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Notification update' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return updated notification.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Notification not found',
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
    @Body() uNotificationDTO: UpdateNotificationDTO,
  ): Promise<INotification> {
    try {
      return this.notificationService.update(id, uNotificationDTO);
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
   * update bulk Notification
   * @User {IUser} user
   */
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Notification update bulk' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return updated notification bulk.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Notification not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @UsePipes(new ValidationPipe(true))
  @UsePipes(new TrimPipe())
  @UseGuards(JwtAuthGuard)
  @Patch('bulk-update')
  public async updateBulk(@User() user: IUser) {
    try {
      return this.notificationService.updateBulk(user);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  @ApiExcludeEndpoint()
  @Get('bulk-update')
  public updateBulkThemeGet() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Put('bulk-update')
  public updateBulkThemePut() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Post('bulk-update')
  public updateBulkThemePost() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Delete('bulk-update')
  public updateBulkThemeDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  /**
   * Find notifications
   * @Query {Object} query
   * @User {IUser} user
   * @returns {Promise<INotificationWithCount[]>}
   */
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Get All notification' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return chats.',
  })
  @UseGuards(JwtAuthGuard)
  @Get('list')
  @UsePipes(new ValidationPipe(true))
  async findAll(
    @Query() query: SearchQueryDTO | null,
    @User() user: IUser,
  ): Promise<INotificationWithCount> {
    try {
      return this.notificationService.findAll(user, query);
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

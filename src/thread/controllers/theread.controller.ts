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
import { CreateThreadDTO, UpdateThreadDTO } from '../dto';
import { IChat, IThread, IThreadsWithCount } from '../interfaces';
import { ThreadService } from '../services';

@ApiTags('Thread')
@ApiResponse({
  status: HttpStatus.METHOD_NOT_ALLOWED,
  description: 'Method not allowed',
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Server Error!',
})
@Controller('thread')
export class ThreadController {
  /**
   * Constructor
   * @param {ThreadService} threadService
   */
  constructor(private readonly threadService: ThreadService) {}

  /**
   * Create thread
   * @param {IUser} user
   * @param {CreateThreadDTO} cThreadDTO
   * @returns {Promise<IThread | IChat>}
   */
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Thread Creation' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return new thread.',
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
  @UseInterceptors(EmailInterceptor)
  @Post('add')
  public async create(
    @User() user: IUser,
    @Body() cThreadDTO: CreateThreadDTO,
  ): Promise<IThread | IChat> {
    try {
      return this.threadService.create(user, cThreadDTO);
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
   * update thread
   * @Param {string} id
   * @Body {UpdateThreadDTO} uThreadDTO
   * @Param {IUser} user
   * @returns {Promise<IThread>}
   */
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Thread update' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return updated thread.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Thread not found',
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
    @Body() uThreadDTO: UpdateThreadDTO,
    @User() user: IUser,
  ): Promise<IThread> {
    try {
      return this.threadService.update(id, uThreadDTO, user);
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
   * update bulk Thread
   * @User {IUser} user
   */
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Thread update bulk' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return updated thread bulk.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Thread not found',
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
      return this.threadService.updateBulk(user);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  @ApiExcludeEndpoint()
  @Get('bulk-update')
  public updateBulkGet() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Put('bulk-update')
  public updateBulkPut() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Post('bulk-update')
  public updateBulkPost() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Delete('bulk-update')
  public updateBulkDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  /**
   * Find thread
   * @Query {Object} query
   * @returns {Promise<IThread[]>}
   */
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Get All thread' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return threads.',
  })
  @UseGuards(JwtAuthGuard)
  @Get('list')
  @UsePipes(new ValidationPipe(true))
  findAll(
    @Query() query: SearchQueryDTO | null,
    @User() user: IUser,
  ): Promise<IThreadsWithCount> {
    try {
      return this.threadService.findAll(query, user);
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

  /**
   * Find one thread
   * @param {string} id
   * @returns {Promise<IJobRequest>}
   */
  @ApiOperation({ summary: 'Get specific thread' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ' Return single thread.',
  })
  @Get(':id')
  public findOne(@Param('id') id: string): Promise<IThread> {
    try {
      return this.threadService.findOne(id);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
  @ApiExcludeEndpoint()
  @Post(':id')
  public findOnePost() {
    throw new MethodNotAllowedException('Method not allowed');
  }
  @ApiExcludeEndpoint()
  @Put(':id')
  public findOnePut() {
    throw new MethodNotAllowedException('Method not allowed');
  }
  @ApiExcludeEndpoint()
  @Patch(':id')
  public findOnePatch() {
    throw new MethodNotAllowedException('Method not allowed');
  }
  @ApiExcludeEndpoint()
  @Delete(':id')
  public findOneDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }
}

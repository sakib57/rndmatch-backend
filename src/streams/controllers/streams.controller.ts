import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  MethodNotAllowedException,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { TrimPipe } from 'src/common/pipes/trim.pipe';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { IUser } from 'src/users/interfaces';
import { CreateStreamDTO, SearchStreamDTO, UpdateStreamDTO } from '../dto';
import { IPaginateStream, IStreams } from '../interfaces';
import { StreamsService } from '../services';

/**
 * Streams Controller
 */
@ApiTags('Streams')
@ApiResponse({
  status: HttpStatus.METHOD_NOT_ALLOWED,
  description: 'Method not allowed',
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Server Error!',
})
@Controller('streams')
export class StreamsController {
  /**
   * Constructor
   * @param {StreamsService} service
   */
  constructor(private readonly service: StreamsService) {}

  /**
   * stream create
   * @Body {CreateStreamDTO} cDTO
   * @User user: IUser
   * @returns {Promise<IStreams>}
   */
  @ApiOperation({ summary: 'Stream creation' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return stream.',
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
  create(
    @User() user: IUser,
    @Body() cDTO: CreateStreamDTO,
  ): Promise<IStreams> {
    try {
      return this.service.create(user, cDTO);
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
   * stream update
   * @Body {UpdateStreamDTO} uDTO
   * @User user: IUser
   * @returns {Promise<IStreams>}
   */
  @ApiOperation({ summary: 'Stream update' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return stream.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @UsePipes(new ValidationPipe(true))
  @UsePipes(new TrimPipe())
  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  update(
    @User() user: IUser,
    @Param('id') id: string,
    @Body() uDTO: UpdateStreamDTO,
  ): Promise<IStreams> {
    try {
      return this.service.update(user, id, uDTO);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
  @ApiExcludeEndpoint()
  @Get('update/:id')
  public updateGet() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Put('update/:id')
  public updatePut() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Post('update/:id')
  public updatePost() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Delete('update/:id')
  public updateDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  /**
   * delete stream
   * @param {string} id
   * @param {IUser} user
   * @returns {Promise<IStreams>}
   */
  @ApiOperation({ summary: 'Stream delete' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return stream.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @UsePipes(new ValidationPipe(true))
  @UsePipes(new TrimPipe())
  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  delete(@Param('id') id, @User() user: IUser): Promise<IStreams> {
    try {
      return this.service.delete(id, user);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
  @ApiExcludeEndpoint()
  @Get('delete/:id')
  public deleteGet() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Put('delete/:id')
  public deletePut() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Patch('delete/:id')
  public deletePatch() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Post('delete/:id')
  public deletePost() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  /**
   * find all stream
   * @returns {Promise<IPaginateStream>}
   */
  @ApiOperation({ summary: 'Get all stream' })
  @UsePipes(new ValidationPipe(true))
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return threads.',
  })
  @UseGuards(JwtAuthGuard)
  @Get('list')
  public findAll(
    @Query() query: SearchStreamDTO,
    @User() user: IUser,
  ): Promise<IPaginateStream> {
    try {
      return this.service.findAll(user, query);
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
   * Find one stream
   * @param {string} id
   * @returns {Promise<IStreams>}
   */
  @ApiOperation({ summary: 'Get specific stream' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return single stream.',
  })
  @Get(':id')
  public findOne(@Param('id') id: string): Promise<IStreams> {
    try {
      return this.service.findOne(id);
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

  /**
   * count streams
   * @returns {Promise<number>}
   */
  @ApiOperation({ summary: 'Count streams' })
  @UsePipes(new ValidationPipe(true))
  @UseGuards(JwtAuthGuard)
  @Get('count')
  public count(@Query() query: SearchStreamDTO): Promise<number> {
    try {
      return this.service.count(query);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
  @ApiExcludeEndpoint()
  @Post('count')
  public countPost() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Put('count')
  public countPut() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Patch('count')
  public countPatch() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Delete('count')
  public countDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }
}

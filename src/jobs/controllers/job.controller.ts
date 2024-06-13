import {
  HttpStatus,
  Controller,
  Body,
  Delete,
  Get,
  HttpException,
  MethodNotAllowedException,
  Patch,
  Post,
  Put,
  UseGuards,
  UsePipes,
  Param,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiResponse,
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiHeader,
  ApiOperation,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { User } from '../../common/decorators/user.decorator';
import { TrimPipe } from '../../common/pipes/trim.pipe';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { IUser } from '../../users/interfaces';
import { CreateJobDTO, UpdateJobDTO } from '../dto';
import { JobFileUploadDTO } from '../dto/job-file-upload.dto';
import { SearchJobDTO } from '../dto/search-job.dto';
import { IPaginateJob } from '../interfaces';
import { IJob } from '../interfaces/jobs/job.interface';
import { JobService } from '../services';

/**
 * Job Controller
 */
@ApiTags('Jobs')
@ApiResponse({
  status: HttpStatus.METHOD_NOT_ALLOWED,
  description: 'Method not allowed',
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Server Error!',
})
@Controller('jobs')
export class JobController {
  /**
   * Constructor
   * @param {JobService} jobService
   */
  constructor(private readonly jobService: JobService) {}

  /**
   * Job create
   * @Body {CreateJobDTO} cJobDTO
   * @user {IUser} user
   * @returns {Promise<IJob>}
   */
  @ApiOperation({ summary: 'Job creation' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return Job.',
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
  create(@User() user: IUser, @Body() cJobDTO: CreateJobDTO): Promise<IJob> {
    try {
      return this.jobService.create(user, cJobDTO);
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
   * Jobs uodate
   * @Body {UpdateJobDTO} uJobDTO
   * @User user: IUser
   * @returns {Promise<IJobs>}
   */
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Job picture update' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return updated job.' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Job not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: JobFileUploadDTO })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'jobPic', maxCount: 1 }]))
  @Put('update/:id')
  public async updateJobPut(
    @User() user: IUser,
    @Param('id') id: string,
    @Body() updateJobDTO: UpdateJobDTO,
    @UploadedFiles()
    files: {
      jobPic?: Express.Multer.File[];
    },
  ): Promise<IJob> {
    try {
      return await this.jobService.update(user, id, updateJobDTO, files);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
  @ApiOperation({ summary: 'Job update' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return Job.',
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
    @Body() uJobDTO: UpdateJobDTO,
  ): Promise<IJob> {
    try {
      return this.jobService.update(user, id, uJobDTO);
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
   * find all Job
   * @returns {Promise<IPaginateJob>}
   */
  @ApiOperation({ summary: 'Get all Job' })
  @UsePipes(new ValidationPipe(true))
  @Get('list')
  public findAll(@Query() query: SearchJobDTO): Promise<IPaginateJob> {
    try {
      return this.jobService.findAll(query);
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
   * find matched candidate
   */
  @ApiOperation({ summary: 'Get matched candidate' })
  @UsePipes(new ValidationPipe(true))
  @Get(':id/match-candidate')
  public matchedCandidate(@Param('id') id) {
    try {
      return this.jobService.matchCandidate(id);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
  @ApiExcludeEndpoint()
  @Post(':id/match-candidate')
  public matchedCandidatePost() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Put(':id/match-candidate')
  public matchedCandidatePut() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Patch(':id/match-candidate')
  public matchedCandidatePatch() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Delete(':id/match-candidate')
  public matchedCandidateDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  /**
   * delete Job
   * @param {string} id
   * @returns {Promise<IJob>}
   */
  @ApiOperation({ summary: 'Job delete' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return Job.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @UsePipes(new ValidationPipe(true))
  @UsePipes(new TrimPipe())
  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  delete(@Param('id') id, @User() user: IUser): Promise<IJob> {
    try {
      return this.jobService.delete(id, user);
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
   * count Jobs
   * @returns {Promise<number>}
   */
  @ApiOperation({ summary: 'Count jobs' })
  @UsePipes(new ValidationPipe(true))
  @UseGuards(JwtAuthGuard)
  @Get('count')
  public count(@Query() query: SearchJobDTO): Promise<number> {
    try {
      return this.jobService.count(query);
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

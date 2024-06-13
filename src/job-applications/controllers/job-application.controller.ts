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
import { IUser } from '../../users/interfaces';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { User } from '../../common/decorators/user.decorator';
import { TrimPipe } from '../../common/pipes/trim.pipe';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import {
  CreateJobApplicationDTO,
  JobApplicationFileUploadDTO,
  SearchJobApplicationDTO,
  UpdateJobApplicationDTO,
} from '../dto';
import { IJobApplication } from '../interfaces/job-application.interface';
import { JobApplicationService } from '../services';
import { IPaginateJobApplication } from '../interfaces/paginate.interface';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

/**
 * Job Application Controller
 */
@ApiTags('Job Application')
@ApiResponse({
  status: HttpStatus.METHOD_NOT_ALLOWED,
  description: 'Method not allowed',
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Server Error!',
})
@Controller('job-application')
export class JobApplicationController {
  /**
   * Constructor
   * @param {JobApplicationService} jobApplicationService
   */
  constructor(private readonly jobApplicationService: JobApplicationService) {}

  /**
   * Job Application create
   * @Body {CreateJobApplicationDTO} cJobApplicationDTO
   * @user {IUser} user
   * @returns {Promise<IJobApplication>}
   */
  @ApiOperation({ summary: 'Job Application creation' })
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
  @UseInterceptors(FileFieldsInterceptor([{ name: 'resume', maxCount: 1 }]))
  @Post('add')
  create(
    @User() user: IUser,
    @Body() cJobApplicationDTO: CreateJobApplicationDTO,
  ): Promise<IJobApplication> {
    try {
      return this.jobApplicationService.create(user, cJobApplicationDTO);
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
   * update Job Application
   * @Body {UpdateJobApplicationDTO} uJobApplicationDTO
   * @User user: IUser
   * @returns {Promise<IJobApplication>}
   */
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return Job Application.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @ApiOperation({ summary: 'Job Application resume update' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return updated Job Application.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Job not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: JobApplicationFileUploadDTO })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'resume', maxCount: 1 }]))
  @Put('update/:id')
  public async updateJobApplicationPut(
    @User() user: IUser,
    @Param('id') id: string,
    @Body() updateJobDTO: UpdateJobApplicationDTO,
    @UploadedFiles()
    files: {
      resume?: Express.Multer.File[];
    },
  ): Promise<IJobApplication> {
    try {
      return await this.jobApplicationService.update(
        user,
        id,
        updateJobDTO,
        files,
      );
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
  @ApiOperation({ summary: 'Job Application update' })
  @ApiBearerAuth()
  @UsePipes(new ValidationPipe(true))
  @UsePipes(new TrimPipe())
  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  update(
    @User() user: IUser,
    @Param('id') id: string,
    @Body() uJobApplicationDTO: UpdateJobApplicationDTO,
  ): Promise<IJobApplication> {
    try {
      return this.jobApplicationService.update(
        user,
        id,
        uJobApplicationDTO,
        null,
      );
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
   * find all Job Application
   * @returns {Promise<IPaginateJobApplication>}
   */
  @ApiOperation({ summary: 'Get all JobApplication' })
  @UsePipes(new ValidationPipe(true))
  @Get('list')
  public findAll(
    @Query() query: SearchJobApplicationDTO,
  ): Promise<IPaginateJobApplication> {
    try {
      return this.jobApplicationService.findAll(query);
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
   * delete JobApplication
   * @param {string} id
   * @returns {Promise<IJobApplication>}
   */
  @ApiOperation({ summary: 'Job Application delete' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return Job Application.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @UsePipes(new ValidationPipe(true))
  @UsePipes(new TrimPipe())
  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  delete(@Param('id') id, @User() user: IUser): Promise<IJobApplication> {
    try {
      return this.jobApplicationService.delete(id, user);
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
   * count Job Application
   * @returns {Promise<number>}
   */
  @ApiOperation({ summary: 'Count Job Application' })
  @UsePipes(new ValidationPipe(true))
  @UseGuards(JwtAuthGuard)
  @Get('count')
  public count(@Query() query: SearchJobApplicationDTO): Promise<number> {
    try {
      return this.jobApplicationService.count(query);
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

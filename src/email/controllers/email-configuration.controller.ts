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
import { User } from '../../common/decorators/user.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { TrimPipe } from '../../common/pipes/trim.pipe';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { EmailConfigurationService } from '../services';
import {
  CreateEmailConfigurationDTO,
  UpdateEmailConfigurationDTO,
  SearchEmailConfigurationDTO,
} from '../dto';
import { IEmailConfiguration } from '../interfaces';
import { IUser } from '../../users/interfaces';
import { NullValidationPipe } from '../../common/pipes/null-validator.pipe';

@ApiTags('Email')
@ApiResponse({
  status: HttpStatus.METHOD_NOT_ALLOWED,
  description: 'Method not allowed',
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Server Error!',
})
@Controller('email/configuration')
export class EmailConfigurationController {
  constructor(
    private readonly emailConfigurationService: EmailConfigurationService,
  ) {}

  /**
   * Create email configuration
   * @param user
   * @param createEmailConfiguration
   * @returns
   */
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Add email configuration' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return new email template.',
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
    @Body() createEmailConfiguration: CreateEmailConfigurationDTO,
  ): Promise<IEmailConfiguration> {
    try {
      return this.emailConfigurationService.create(
        user,
        createEmailConfiguration,
      );
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
   * Update email configuration
   * @param id
   * @param updateEmailConfiguration
   * @param user
   * @returns {Promise<IEmailConfiguration>}
   */
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Update email configuratiojn' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return updated email configuration.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Update email configuration not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @UsePipes(new NullValidationPipe())
  @UsePipes(new ValidationPipe(true))
  @UsePipes(new TrimPipe())
  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  public updatePatch(
    @Param('id') id: string,
    @Body() updateEmailConfiguration: UpdateEmailConfigurationDTO,
    @User() user: IUser,
  ): Promise<IEmailConfiguration> {
    try {
      return this.emailConfigurationService.update(
        user,
        id,
        updateEmailConfiguration,
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
   * find all email configuration
   * @param query
   * @returns {Promise<IEmailConfiguration[]>}
   */
  @ApiOperation({
    summary: 'find all email configuration',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'This is public api. Return email configuration list',
  })
  @UsePipes(new ValidationPipe(true))
  @Get('list')
  findAll(
    @Query() query: SearchEmailConfigurationDTO,
  ): Promise<IEmailConfiguration[]> {
    try {
      return this.emailConfigurationService.findAll(query);
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
   * find specific email configuration based on id
   * @param id
   * @returns {Promise<IEmailConfiguration>}
   */
  @ApiOperation({
    summary: 'find specific email configuration based on id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'This is public api. Return email configuration based on id',
  })
  @UsePipes(new ValidationPipe(true))
  @Get(':id')
  findOne(@Param('id') id: string): Promise<IEmailConfiguration> {
    try {
      return this.emailConfigurationService.findOne(id, null);
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

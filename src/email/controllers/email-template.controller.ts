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
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
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
import { IUser } from '../../users/interfaces';
import { NullValidationPipe } from '../../common/pipes/null-validator.pipe';
import { EmailTemplateService } from '../services';
import {
  CreateEmailTemplateDTO,
  UpdateEmailTemplateDTO,
  SearchEmailTemplateDTO,
} from '../dto';
import { IEmailTemplate } from '../interfaces';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { SignatureLogoUpload } from '../dto/email-template/signature-logo-upload.dto';

@ApiTags('Email')
@ApiResponse({
  status: HttpStatus.METHOD_NOT_ALLOWED,
  description: 'Method not allowed',
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Server Error!',
})
@Controller('email/template')
export class EmailTemplateController {
  constructor(private readonly emailTemplateService: EmailTemplateService) {}

  /**
   * Create email template
   * @param user
   * @param createEmailTemplateDTO
   * @returns
   */
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Add email template' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return new email template',
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
    @Body() createEmailTemplateDTO: CreateEmailTemplateDTO,
  ): Promise<IEmailTemplate> {
    try {
      return this.emailTemplateService.create(user, createEmailTemplateDTO);
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
   * Update email template
   * @param id
   * @param updateEmailTemplate
   * @param user
   * @returns {Promise<IEmailTemplate>}
   */

  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Update email template' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return updated email template.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Update service-profile not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: SignatureLogoUpload })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'signatureLogo', maxCount: 1 }]),
  )
  @Put('update/:id')
  public async update(
    @Param('id') id: string,
    @Body() UpdateEmailTemplate: UpdateEmailTemplateDTO,
    @UploadedFiles()
    files: {
      signatureLogo?: Express.Multer.File[];
    },
    @User() user: IUser,
  ): Promise<IEmailTemplate> {
    try {
      return this.emailTemplateService.update(
        user,
        id,
        UpdateEmailTemplate,
        files,
      );
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Update email template' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return updated email template.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Update email template not found',
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
    @Body() updateEmailTemplate: UpdateEmailTemplateDTO,
    @User() user: IUser,
  ): Promise<IEmailTemplate> {
    try {
      return this.emailTemplateService.update(
        user,
        id,
        updateEmailTemplate,
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
   * find all email templates
   * @param query
   * @returns {Promise<IEmailTemplate[]>}
   */
  @ApiOperation({
    summary: 'find all email template',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'This is public api. Return email template list',
  })
  @UsePipes(new ValidationPipe(true))
  @Get('list')
  findAll(@Query() query: SearchEmailTemplateDTO): Promise<IEmailTemplate[]> {
    try {
      return this.emailTemplateService.findAll(query);
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

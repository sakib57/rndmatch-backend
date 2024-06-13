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
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { TrimPipe } from '../../common/pipes/trim.pipe';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { CreateEmailDTO, SearchEmailQueryDTO } from '../dto';
import { EmailService } from '../services';
import { IEmail, IPaginateEmail } from '../interfaces';

@ApiTags('Email')
@ApiResponse({
  status: HttpStatus.METHOD_NOT_ALLOWED,
  description: 'Method not allowed',
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Server Error!',
})
@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  /**
   * Create email configuration
   * @param createEmailDTO
   * @returns
   */
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Add email' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return new email.',
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
  @Post('email/add')
  public async create(@Body() createEmailDTO: CreateEmailDTO): Promise<IEmail> {
    try {
      return this.emailService.create(createEmailDTO);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  @ApiExcludeEndpoint()
  @Get('email/add')
  public createGet() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Put('email/add')
  public createPut() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Patch('email/add')
  public createPatch() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Delete('email/add')
  public createDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  /**
   * find all email
   * @param query
   * @returns {Promise<IEmail[]>}
   */
  @ApiOperation({
    summary: 'find all email',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'This is public api. Return previous email list',
  })
  @UsePipes(new ValidationPipe(true))
  @Get('email/list')
  findAll(@Query() query: SearchEmailQueryDTO): Promise<IPaginateEmail> {
    try {
      return this.emailService.findAll(query);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  @ApiExcludeEndpoint()
  @Post('email/list')
  public findAllPost() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Put('email/list')
  public findAllPut() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Patch('email/list')
  public findAllPatch() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Delete('email/list')
  public findAllDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  /**
   * find all email ids
   * @returns {Promise<any>}
   */
  @ApiOperation({
    summary: 'find all email id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'This is public api. Return all email id',
  })
  @UsePipes(new ValidationPipe(true))
  @Get('email-address/list')
  findEmails(): Promise<string[]> {
    try {
      return this.emailService.findDistinctEmails();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  @ApiExcludeEndpoint()
  @Post('email-address/list')
  public findEmailsPost() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Put('email-address/list')
  public findEmailsPut() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Patch('email-address/list')
  public findEmailsPatch() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Delete('email-address/list')
  public findEmailsDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  /**
   * find specific email based on id
   * @param id
   * @returns {Promise<IEmail>}
   */
  @ApiOperation({
    summary: 'find specific email based on id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'This is public api. Return email based on id',
  })
  @UsePipes(new ValidationPipe(true))
  @Get('email/:id')
  findOne(@Param('id') id: string): Promise<IEmail> {
    try {
      return this.emailService.findOne(id);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  @ApiExcludeEndpoint()
  @Post('email/:id')
  public findOnePost() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Put('email/:id')
  public findOnePut() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Patch('email/:id')
  public findOnePatch() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Delete('email/:id')
  public findOneDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }
}

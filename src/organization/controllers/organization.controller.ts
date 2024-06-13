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
import { FileFieldsInterceptor } from '@nestjs/platform-express';
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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { FileUploadDTO } from 'src/common/dto';
import { TrimPipe } from 'src/common/pipes/trim.pipe';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { IUser } from 'src/users/interfaces';
import {
  CreateOrganizationDTO,
  SearchOrganizationDTO,
  UpdateOrganizationDTO,
} from '../dto';
import { IOrganization, IPaginateOrganization } from '../interfaces';
import { OrganizationService } from '../services';

/**
 * Organization Controller
 */
@ApiTags('Organization')
@ApiResponse({
  status: HttpStatus.METHOD_NOT_ALLOWED,
  description: 'Method not allowed',
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Server Error!',
})
@Controller('organizations')
export class OrganizationController {
  /**
   * Constructor
   * @param {OrganizationService} OrganizationService
   */
  constructor(private readonly organizationService: OrganizationService) {}

  /**
   * organization create
   * @Body {CreateOrganizationDTO} cOrganizationDTO
   * @user {IUser} user
   * @returns {Promise<IOrganization>}
   */
  @ApiOperation({ summary: 'Organization creation' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return organization.',
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
    @Body() cOrganizationDTO: CreateOrganizationDTO,
  ): Promise<IOrganization> {
    try {
      return this.organizationService.create(user, cOrganizationDTO);
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
   * Organization update
   * @Body {UpdateOrganizationDTO} uOrganizationDTO
   * @user {IUser} user
   * @returns {Promise<IOrganization>}
   */
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Update organization' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return updated organization.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Organization not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FileUploadDTO })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'logo', maxCount: 1 },
      { name: 'banner', maxCount: 1 },
      { name: 'pictures', maxCount: 8 },
      { name: 'videos', maxCount: 3 },
    ]),
  )
  @Put('update/:id')
  public async update(
    @Param('id') id: string,
    @Body() uOrganizationDTO: UpdateOrganizationDTO,
    @UploadedFiles()
    files: {
      logo?: Express.Multer.File[];
      banner?: Express.Multer.File[];
      pictures?: Express.Multer.File[];
      videos?: Express.Multer.File[];
    },
    @User() user: IUser,
  ): Promise<IOrganization> {
    try {
      return this.organizationService.update(user, id, files, uOrganizationDTO);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
  @ApiOperation({ summary: 'Organization update' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return organization.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @UsePipes(new ValidationPipe(true))
  @UsePipes(new TrimPipe())
  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  updatePatch(
    @User() user: IUser,
    @Param('id') id: string,
    @Body() uOrganizationDTO: UpdateOrganizationDTO,
  ): Promise<IOrganization> {
    try {
      return this.organizationService.update(user, id, null, uOrganizationDTO);
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
   * find all organization
   * @returns {Promise<IPaginateOrganization>}
   */
  @ApiOperation({ summary: 'Get all organization' })
  @UsePipes(new ValidationPipe(true))
  @Get('list')
  public findAll(
    @Query() query: SearchOrganizationDTO,
  ): Promise<IPaginateOrganization> {
    try {
      return this.organizationService.findAll(query);
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
   * find one organization by ID
   * @returns {Promise<IOrganization>}
   */
  @ApiOperation({ summary: 'Get organization by ID' })
  @UsePipes(new ValidationPipe(true))
  @Get('findById/:id')
  public findOneById(@Param('id') id): Promise<IOrganization> {
    try {
      return this.organizationService.findOne(id, null);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
  @ApiExcludeEndpoint()
  @Post('findById/:id')
  public findOneByIdPost() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Put('findById/:id')
  public findOneByIdPut() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Patch('findById/:id')
  public findOneByIdPatch() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Delete('findById/:id')
  public findOneByIdDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  /**
   * find one organization by Slug
   * @returns {Promise<IOrganization>}
   */
  @ApiOperation({ summary: 'Get organization by Slug' })
  @Get('findBySlug/:slug')
  public findOneBySlug(@Param('slug') slug): Promise<IOrganization> {
    try {
      return this.organizationService.findOne(null, slug);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
  @ApiExcludeEndpoint()
  @Post('findBySlug/:slug')
  public findOneBySlugPost() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Put('findBySlug/:slug')
  public findOneBySlugPut() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Patch('findBySlug/:slug')
  public findOneBySlugPatch() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Delete('findBySlug/:slug')
  public findOneBySlugDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  /**
   * count organization
   * @returns {Promise<number>}
   */
  @ApiOperation({ summary: 'Count organization' })
  @UsePipes(new ValidationPipe(true))
  @UseGuards(JwtAuthGuard)
  @Get('count')
  public count(@Query() query: SearchOrganizationDTO): Promise<number> {
    try {
      return this.organizationService.count(query);
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

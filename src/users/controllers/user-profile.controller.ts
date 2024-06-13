import {
  Controller,
  Body,
  UseGuards,
  UsePipes,
  UploadedFiles,
  UseInterceptors,
  Param,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Query,
  HttpStatus,
  HttpException,
  MethodNotAllowedException,
} from '@nestjs/common';
import { UserProfileService } from '../services';
import {
  UpdateUserProfileDTO,
  SearchUserProfileDTO,
  UserFileUploadDTO,
} from '../dto';
import { IPaginateUserProfile, IUser, IUserProfile } from '../interfaces';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { TrimPipe } from '../../common/pipes/trim.pipe';
import { User } from '../../common/decorators/user.decorator';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiTags,
  ApiHeader,
  ApiConsumes,
  ApiBody,
  ApiExcludeEndpoint,
} from '@nestjs/swagger';
import { NullValidationPipe } from '../../common/pipes/null-validator.pipe';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

/**
 * User-profile Controller
 */
@ApiTags('User')
@ApiResponse({
  status: HttpStatus.METHOD_NOT_ALLOWED,
  description: 'Method not allowed',
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Server Error!',
})
@Controller('users')
export class UsersProfileController {
  /**
   * Constructor
   * @param {UserProfileService} userProfileService
   */
  constructor(private readonly userProfileService: UserProfileService) {}

  /**
   * update user profile by user
   * @User {IUser} user
   * @Body {UserProfileDTO} UserProfileDTO
   * @returns {Promise<IUserProfile>} created user data
   */
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'user update by user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return updated user.' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UserFileUploadDTO })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'profilePic', maxCount: 1 },
      { name: 'coverPic', maxCount: 1 },
      { name: 'resume', maxCount: 1 },
    ]),
  )
  @Put('profile/update')
  public async updateUserProfilePut(
    @User() user: IUser,
    @Body() updateUserProfileDTO: UpdateUserProfileDTO,
    @UploadedFiles()
    files: {
      profilePic?: Express.Multer.File[];
      coverPic?: Express.Multer.File[];
      resume?: Express.Multer.File[];
    },
  ): Promise<IUserProfile> {
    try {
      return await this.userProfileService.update(
        user,
        updateUserProfileDTO,
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
  @ApiOperation({ summary: 'user update by user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return updated user.' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @UsePipes(new NullValidationPipe())
  @UsePipes(new ValidationPipe(true))
  @UsePipes(new TrimPipe())
  @UseGuards(JwtAuthGuard)
  @Patch('profile/update')
  public async updateUserProfile(
    @User() user: IUser,
    @Body() updateUserProfileDTO: UpdateUserProfileDTO,
  ): Promise<IUserProfile> {
    try {
      return await this.userProfileService.update(user, updateUserProfileDTO);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  @ApiExcludeEndpoint()
  @Get('profile/update')
  public updateGet() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Post('profile/update')
  public updatePost() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Delete('profile/update')
  public updateDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  /**
   * find all userProfile
   * @returns {Promise<IPaginateUserProfile>}
   */
  @ApiOperation({ summary: 'Get all user profiles' })
  @UsePipes(new ValidationPipe(true))
  @Get('profile/list')
  public findAll(
    @Query() query: SearchUserProfileDTO,
  ): Promise<IPaginateUserProfile> {
    try {
      return this.userProfileService.findAll(query);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
  @ApiExcludeEndpoint()
  @Post('profile/list')
  public findAllPost() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Put('profile/list')
  public findAllPut() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Patch('profile/list')
  public findAllPatch() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Delete('profile/list')
  public findAllDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  /**
   * count all userProfile
   * @returns {Promise<number>}
   */
  @ApiOperation({ summary: 'Count all user profiles' })
  @UsePipes(new ValidationPipe(true))
  @Get('profile/count')
  public count(@Query() query: SearchUserProfileDTO): Promise<number> {
    try {
      return this.userProfileService.count(query);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
  @ApiExcludeEndpoint()
  @Post('profile/count')
  public countPost() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Put('profile/count')
  public countPut() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Patch('profile/count')
  public countPatch() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Delete('profile/count')
  public countDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  /**
   * find user detail
   * @User {IUser} user
   * @returns {Promise<IUserProfile>} found user data
   */
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'user find id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return user.' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @UsePipes(new NullValidationPipe())
  @UsePipes(new ValidationPipe(true))
  @UsePipes(new TrimPipe())
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  public async findById(@User() user: IUser): Promise<any> {
    try {
      return await this.userProfileService.findOne(null, null, user._id);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  @ApiExcludeEndpoint()
  @Post('profile')
  public findByIdPost() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Put('profile')
  public findByIdPut() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Post('profile')
  public findByIdPatch() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Delete('profile')
  public findByIdDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  /**
   * Retrieves a particular user (Public Api)
   * @Param {string} profileId
   * @returns {Promise<IUserProfile>} queried user data
   */
  @ApiOperation({ summary: 'Get user from profileId' })
  @ApiResponse({ status: 200, description: 'Return user information.' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User Not found.',
  })
  @Get('profile/:profileId')
  public async getUserProfileById(
    @Param('profileId') profileId: string,
  ): Promise<IUserProfile> {
    try {
      return await this.userProfileService.findOne(profileId, null, null);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  @ApiExcludeEndpoint()
  @Put('profile/:profileId')
  public getUserByIdPut() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Patch('profile/:profileId')
  public getUserByIdPatch() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Delete('profile/:profileId')
  public getUserByIdDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  /**
   * Retrieves a particular user (Public Api)
   * @Param {string} slug
   * @returns {Promise<IUserProfile>} queried user data
   */
  @ApiOperation({ summary: 'Get user from slug' })
  @ApiResponse({ status: 200, description: 'Return user information.' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User Not found.',
  })
  @Get('profile/slug/:slug')
  public async getUserProfileBySlug(
    @Param('slug') slug: string,
  ): Promise<IUserProfile> {
    try {
      return await this.userProfileService.findOne(null, slug, null);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  @ApiExcludeEndpoint()
  @Put('profile/slug/:slug')
  public getUserBySlugPut() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Patch('profile/slug/:slug')
  public getUserBySlugPatch() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Delete('profile/slug/:slug')
  public getUserBySlugDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }
}

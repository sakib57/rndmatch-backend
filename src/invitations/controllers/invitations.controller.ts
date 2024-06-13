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
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiHeader,
  ApiOperation,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { User } from '../../common/decorators/user.decorator';
import { TrimPipe } from '../../common/pipes/trim.pipe';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { IUser } from '../../users/interfaces';
import {
  CreateInvitationDTO,
  SearchInvitationDTO,
  UpdateInvitationDTO,
} from '../dto';
import { IInvitation, IPaginateInvitation } from '../interfaces';
import { InvitationsService } from '../services';

/**
 * Invitations Controller
 */
@ApiTags('Invitations')
@ApiResponse({
  status: HttpStatus.METHOD_NOT_ALLOWED,
  description: 'Method not allowed',
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Server Error!',
})
@Controller('invitations')
export class InvitationsController {
  /**
   * Constructor
   * @param {InvitationsService} invitationsService
   */
  constructor(private readonly invitationsService: InvitationsService) {}

  /**
   * Invitations create
   * @Body {CreateInvitationsDTO} cInvitationsDTO
   * @user {IUser} user
   * @returns {Promise<IInvitations>}
   */
  @ApiOperation({ summary: 'Invitations creation' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return Invitations.',
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
    @Body() cInvitationsDTO: CreateInvitationDTO,
  ): Promise<IInvitation> {
    try {
      return this.invitationsService.create(user, cInvitationsDTO);
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
   * Invitationss uodate
   * @Body {UpdateInvitationDTO} uInvitationsDTO
   * @User user: IUser
   * @returns {Promise<IInvitationss>}
   */
  @ApiOperation({ summary: 'Invitations update' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return Invitations.',
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
    @Body() uInvitationsDTO: UpdateInvitationDTO,
  ): Promise<IInvitation> {
    try {
      return this.invitationsService.update(user, id, uInvitationsDTO);
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
   * find all Invitations
   * @returns {Promise<IPaginateInvitation>}
   */
  @ApiOperation({ summary: 'Get all Invitations' })
  @UsePipes(new ValidationPipe(true))
  @Get('list')
  public findAll(
    @Query() query: SearchInvitationDTO,
  ): Promise<IPaginateInvitation> {
    try {
      return this.invitationsService.findAll(query);
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
   * find one Invitations by Token
   * @returns {Promise<IInvitations>}
   */
  @ApiOperation({ summary: 'Get Invitations by Token' })
  @Get('findByToken/:token')
  public findOneByToken(@Param('token') token): Promise<IInvitation> {
    try {
      return this.invitationsService.findOneByToken(token);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
  @ApiExcludeEndpoint()
  @Post('findByToken/:token')
  public findOneByTokenPost() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Put('findByToken/:token')
  public findOneByTokenPut() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Patch('findByToken/:token')
  public findOneByTokenPatch() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Delete('findByToken/:token')
  public findOneByTokenDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  /**
   * count Invitations
   * @returns {Promise<number>}
   */
  @ApiOperation({ summary: 'Count Invitations' })
  @UsePipes(new ValidationPipe(true))
  @UseGuards(JwtAuthGuard)
  @Get('count')
  public count(@Query() query: SearchInvitationDTO): Promise<number> {
    try {
      return this.invitationsService.count(query);
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

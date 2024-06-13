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
import { identity } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { TrimPipe } from 'src/common/pipes/trim.pipe';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { IUser } from 'src/users/interfaces';
import { CreateMemberDTO, SearchMemberDTO, UpdateMemberDTO } from '../dto';
import { IMember, IPaginateMember } from '../interfaces';
import { MemberService } from '../services';

/**
 * Member Controller
 **/
@ApiTags('Organization')
@ApiResponse({
  status: HttpStatus.METHOD_NOT_ALLOWED,
  description: 'Method not allowed',
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Server Error!',
})
@Controller('organizations/member')
export class MemberController {
  /**
   * Constructor
   * @param {MemberService} memberService
   */
  constructor(private readonly memberService: MemberService) {}

  /**
   * Member create
   * @Body {CreateMemberDTO} cMemberDTO
   * @user {IUser} user
   * @returns {Promise<IMember>}
   */
  @ApiOperation({ summary: 'Member creation' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return member.',
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
    @Body() cMemberDTO: CreateMemberDTO,
  ): Promise<IMember> {
    try {
      return this.memberService.create(user, cMemberDTO);
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
   * Member Update
   * @Body {UpdateMemberDTO} uMemberDTO
   * @user {IUser} user
   * @returns {Promise<IMember>}
   */
  @ApiOperation({ summary: 'Member update' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return member.',
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
    @Param('id') id,
    @User() user: IUser,
    @Body() uMemberDTO: UpdateMemberDTO,
  ): Promise<IMember> {
    try {
      return this.memberService.update(id, user, uMemberDTO);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
  @ApiExcludeEndpoint()
  @Get('add')
  public updateGet() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Put('add')
  public updatePut() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Post('add')
  public updatePost() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Delete('add')
  public updateDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  /**
   * Fetch member list of an organization
   * @returns {Promise<IPaginateMember>}
   */
  @ApiOperation({ summary: 'Fetch member list of an organization' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return member list.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @UsePipes(new ValidationPipe(true))
  @UsePipes(new TrimPipe())
  @UseGuards(JwtAuthGuard)
  @Get('list')
  findAll(@Query() query: SearchMemberDTO): Promise<IPaginateMember> {
    try {
      return this.memberService.findAll(query);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
  @ApiExcludeEndpoint()
  @Patch('list')
  public findAllPatch() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Put('list')
  public findAllPut() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Post('list')
  public findAllPost() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Delete('list')
  public findAllDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  /**
   * count member
   * @returns {Promise<number>}
   */
  @ApiOperation({ summary: 'Count member' })
  @UsePipes(new ValidationPipe(true))
  @UseGuards(JwtAuthGuard)
  @Get('count')
  public count(@Query() query: SearchMemberDTO): Promise<number> {
    try {
      return this.memberService.count(query);
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

  /**
   * delete member
   * @param {string} id
   * @returns {Promise<IMember>}
   */
  @ApiOperation({ summary: 'Member delete' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return Member.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @UsePipes(new ValidationPipe(true))
  @UsePipes(new TrimPipe())
  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  delete(@Param('id') id, @User() user: IUser): Promise<IMember> {
    try {
      return this.memberService.delete(id, user);
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
}

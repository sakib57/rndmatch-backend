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
import { CreateSkillDTO, SearchSkillDTO, UpdateSkillDTO } from '../dto';
import { IPaginateSkills } from '../interfaces';
import { ISkills } from '../interfaces/skills.interface';
import { SkillsService } from '../services';

/**
 * Skills Controller
 */
@ApiTags('Skills')
@ApiResponse({
  status: HttpStatus.METHOD_NOT_ALLOWED,
  description: 'Method not allowed',
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Server Error!',
})
@Controller('skills')
export class SkillsController {
  /**
   * Constructor
   * @param {SkillsService} skillsService
   */
  constructor(private readonly skillsService: SkillsService) {}

  /**
   * skills create
   * @Body {CreateSkillDTO} cSkillDTO
   * @User user: IUser
   * @returns {Promise<ISkills>}
   */
  @ApiOperation({ summary: 'Skill creation' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return skill.',
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
    @Body() cSkillDTO: CreateSkillDTO,
  ): Promise<ISkills> {
    try {
      return this.skillsService.create(user, cSkillDTO);
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
   * skills uodate
   * @Body {UpdateSkillDTO} uSkillDTO
   * @User user: IUser
   * @returns {Promise<ISkills>}
   */
  @ApiOperation({ summary: 'Skill update' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return skill.',
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
    @Body() uSkillDTO: UpdateSkillDTO,
  ): Promise<ISkills> {
    try {
      return this.skillsService.update(user, id, uSkillDTO);
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
   * delete skill
   * @param {string} id
   * @returns {Promise<ISkills>}
   */
  @ApiOperation({ summary: 'Skill delete' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return skill.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @UsePipes(new ValidationPipe(true))
  @UsePipes(new TrimPipe())
  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  delete(@Param('id') id, @User() user: IUser): Promise<ISkills> {
    try {
      return this.skillsService.delete(id, user);
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
   * find all skill
   * @returns {Promise<IPaginateSkills>}
   */
  @ApiOperation({ summary: 'Get all skill' })
  @UsePipes(new ValidationPipe(true))
  @Get('list')
  public findAll(@Query() query: SearchSkillDTO): Promise<IPaginateSkills> {
    try {
      return this.skillsService.findAll(query);
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
   * count skill
   * @returns {Promise<number>}
   */
  @ApiOperation({ summary: 'Count skills' })
  @UsePipes(new ValidationPipe(true))
  @UseGuards(JwtAuthGuard)
  @Get('count')
  public count(@Query() query: SearchSkillDTO): Promise<number> {
    try {
      return this.skillsService.count(query);
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

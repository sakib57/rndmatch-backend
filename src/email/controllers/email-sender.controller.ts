import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  MethodNotAllowedException,
  Patch,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { TrimPipe } from '../../common/pipes/trim.pipe';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { NullValidationPipe } from 'src/common/pipes/null-validator.pipe';
import { SendEmailDTO } from '../dto';
import { User } from '../../common/decorators/user.decorator';
import { IUser } from '../../users/interfaces';
import { EmailSenderService } from '../services/email-sender.service';

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
export class EmailSenderController {
  constructor(private readonly emailSenderService: EmailSenderService) {}

  /**
   * Send email to contact@ilafe.com
   * @param {SendEmailDTO} emailDTO
   * @param {IUser} user
   */
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'send email',
  })
  @UsePipes(new NullValidationPipe())
  @UsePipes(new ValidationPipe(true))
  @UsePipes(new TrimPipe())
  @UseGuards(JwtAuthGuard)
  // @UseInterceptors(EmailInterceptor)
  @Post('send/email')
  public async sendEmail(@Body() emailDTO: SendEmailDTO, @User() user: IUser) {
    try {
      return this.emailSenderService.sendEmail(emailDTO, user);
      return;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  @ApiExcludeEndpoint()
  @Get('send/email')
  public sendEmailGet() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Put('send/email')
  public sendEmailPut() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Patch('send/email')
  public sendEmailPatch() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Delete('send/email')
  public sendEmailDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }
}

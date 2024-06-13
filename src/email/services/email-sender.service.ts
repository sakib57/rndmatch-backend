import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUser } from '../../users/interfaces';
import { decodeToken } from '../../common/utils/helper';
import {
  SendEmailDTO,
  EmailConfigurationDTO,
  SearchEmailConfigurationDTO,
} from '../dto';
import { DynamicMailer } from './';
import { EmailConfigurationService } from './email-configuration.service';

@Injectable()
export class EmailSenderService {
  private readonly password = 'oS1H+dKX1+OkXUu3jABIKqThi5/BJJtB0OCo';
  /**
   * Constructor
   * @param {DynamicMailer} dynamicMailer
   * @param {EmailConfigurationService} emailConfigurationService
   */
  constructor(
    private readonly emailConfigurationService: EmailConfigurationService,
    private readonly dynamicMailer: DynamicMailer,
  ) {}

  /**
   * Send email to users
   * @param {SendEmailDTO} sendEmailDTO
   * @param {IUser} user
   * @returns
   */
  public async sendEmail(sendEmailDTO: SendEmailDTO, user: IUser) {
    const emailConfigurationDTO = new EmailConfigurationDTO();
    try {
      if (sendEmailDTO?.useCustomConfig === false) {
        const emailConfiguration = await this.emailConfigurationService.findOne(
          sendEmailDTO.from,
          null,
        );

        if (!emailConfiguration)
          return Promise.reject(new NotFoundException('email not found'));

        const { defaultPassword } = await decodeToken(
          emailConfiguration.defaultPassword,
          this.password,
        );

        emailConfigurationDTO.mailServer =
          emailConfiguration.mailServer || 'zohomail';
        emailConfigurationDTO.smtpHost = emailConfiguration.smtpHost;
        emailConfigurationDTO.smtpPort = emailConfiguration.smtpPort;
        emailConfigurationDTO.defaultSignature =
          emailConfiguration.defaultSignature;
        emailConfigurationDTO.defaultUser = emailConfiguration.defaultUser;
        emailConfigurationDTO.defaultPassword = defaultPassword;
      } else {
        const searchQueryDTO = new SearchEmailConfigurationDTO();
        searchQueryDTO.isDefault = true;

        const defaultEmailConfig = await this.emailConfigurationService.findOne(
          null,
          searchQueryDTO,
        );

        emailConfigurationDTO.mailServer =
          defaultEmailConfig?.mailServer || 'zohomail';
        emailConfigurationDTO.smtpHost =
          defaultEmailConfig?.smtpHost || process.env.EMAIL_HOST;
        emailConfigurationDTO.smtpPort =
          defaultEmailConfig?.smtpPort || parseInt(process.env.EMAIL_PORT);
        emailConfigurationDTO.defaultUser = sendEmailDTO.defaultUser;
        emailConfigurationDTO.defaultPassword = sendEmailDTO.defaultPassword;
      }

      const context: any = {};
      context.title = sendEmailDTO.title || `New email from iLafe.`;
      context.description = sendEmailDTO.body;
      context.nameUser = '';
      context.hasActionButton = sendEmailDTO.hasButton || false;
      context.buttonText = sendEmailDTO.buttonText;
      context.buttonUri = sendEmailDTO.buttonUri;

      this.dynamicMailer.setConfig(emailConfigurationDTO);
      this.dynamicMailer.setTo(sendEmailDTO.recipient);
      this.dynamicMailer.setSubject(sendEmailDTO.subject);
      this.dynamicMailer.setContext(context);
      return this.dynamicMailer.sendMail();
    } catch (err: any) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
}

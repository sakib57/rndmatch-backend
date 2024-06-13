import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from '../../users/interfaces';
import { DynamicMailer } from '../../email/services';
import { IEmailConfiguration, IEmailTemplate } from '../../email/interfaces';
import { decodeToken } from '../utils/helper';
import {
  EmailConfigurationDTO,
  SearchEmailConfigurationDTO,
} from '../../email/dto';
import { EmailContentType } from '../mock/constant.mock';
import {
  EmailConfigurationService,
  EmailTemplateService,
} from '../../email/services';

@Injectable()
export class EmailInterceptor implements NestInterceptor {
  private readonly password = 'oS1H+dKX1+OkXUu3jABIKqThi5/BJJtB0OCo';

  constructor(
    @InjectModel('User')
    private readonly userModel: Model<IUser>,
    private readonly emailTemplateService: EmailTemplateService,
    private readonly emailConfigurationService: EmailConfigurationService,
    private readonly dynamicMailer: DynamicMailer,
  ) {}

  /**
   * get email configuration
   * @returns {IEmailConfiguration}
   */
  private async getEmailConfig(): Promise<IEmailConfiguration> {
    try {
      const searchEmailConfigurationDTO = new SearchEmailConfigurationDTO();
      searchEmailConfigurationDTO.isDefault = true;
      const emailConfig = await this.emailConfigurationService.findOne(
        null,
        searchEmailConfigurationDTO,
      );

      if (emailConfig) {
        const { defaultPassword } = await decodeToken(
          emailConfig.defaultPassword,
          this.password,
        );

        const emailConfigDTO = new EmailConfigurationDTO();
        emailConfigDTO.mailServer = emailConfig.mailServer;
        emailConfigDTO.smtpHost = emailConfig.smtpHost;
        emailConfigDTO.smtpPort = emailConfig.smtpPort;
        emailConfigDTO.defaultUser = emailConfig.defaultUser;
        emailConfigDTO.defaultPassword = defaultPassword;
        return emailConfigDTO;
      }
    } catch (err: any) {}

    const emailConfigDTO = new EmailConfigurationDTO();
    emailConfigDTO.mailServer = 'zohomail';
    emailConfigDTO.smtpHost = process.env.EMAIL_HOST;
    emailConfigDTO.smtpPort = parseInt(process.env.EMAIL_PORT);
    emailConfigDTO.defaultUser = process.env.email_auth_user;
    emailConfigDTO.defaultPassword = process.env.EMAIL_AUTH_PASSWORD;

    return emailConfigDTO;
  }

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const method = req.method;
    const route = req.route.path;
    const hostname = req.get('origin');
    const feHost = hostname || process.env.FE_HOST || 'http://localhost:3000';
    const replacements = {
      name: '',
      title: '',
      message: '',
    };
    const emailConfig = await this.getEmailConfig();

    return next.handle().pipe(
      tap(async (res) => {
        const result = res && res?.data ? res.data : res;
        let recipient: string[];
        let subject: string;
        let emailTemplate: IEmailTemplate;
        const context: any = {
          nameUser: result.email,
          hasActionButton: true,
        };

        switch (route) {
          case '/user/register':
            if (method === 'POST') {
              try {
                emailTemplate = await this.emailTemplateService.findOne(
                  EmailContentType.USER_REGISTRATION,
                );
              } catch (err: any) {}

              recipient = [result.email];
              subject = emailTemplate?.subject || 'Verify Email Address';
              context.title = 'Please verify your email address.';
              context.description =
                emailTemplate?.description ||
                (result.isProvider
                  ? 'You’re almost there! Please verify your email address by clicking the button below. Once verified, you’ll be able to complete your rndMatch service listing and grow your business!'
                  : 'You’re almost there! Please verify your email address by clicking the button below. Once verified, you’ll be able to explore reliable services around your area!');
              context.buttonText = 'CLICK TO VERIFY';
              context.buttonUri = `${feHost}/auth/verify-account?token=${result['emailProofToken']}`;
              const user = await this.userModel
                .findOne({ email: result.email })
                .populate({
                  path: 'profile',
                  select: {
                    firstName: 1,
                    lastName: 1,
                  },
                })
                .lean()
                .exec();

              replacements.name = `${user?.profile?.firstName || ''} ${
                user?.profile?.lastName || ''
              }`;
            }
            break;
          case '/user/verification':
            if (method === 'POST') {
              try {
                emailTemplate = await this.emailTemplateService.findOne(
                  EmailContentType.USER_VERIFICATION,
                );
              } catch (err: any) {}

              recipient = [result.email];
              subject = emailTemplate?.subject || 'Welcome To rndMatch!';
              context.title =
                'Your email address has successfully been verified!';
              context.description =
                emailTemplate?.description || result.isProvider
                  ? 'Congrats! If you haven’t already, you can complete your service listing by clicking on the button below to log in. We welcome you to rndMatch and look forward to growing together!'
                  : 'Congrats! If you haven’t already, you can log in by clicking on the button below to explore the reliable services near your area. We welcome you to rndMatch and look forward to growing together!';
              context.buttonText = 'LOG IN';
              context.buttonUri = `${feHost}/${
                result.isProvider ? 'auth/' : ''
              }login`;

              const user = await this.userModel
                .findOne({ email: result.email })
                .populate({
                  path: 'profile',
                  select: {
                    firstName: 1,
                    lastName: 1,
                  },
                })
                .lean()
                .exec();

              replacements.name = `${user?.profile?.firstName || ''} ${
                user?.profile?.lastName || ''
              }`;
            }
            break;
          case '/user/generate/link':
            if (method === 'POST') {
              try {
                emailTemplate = await this.emailTemplateService.findOne(
                  EmailContentType.GENERATE_VERIFICATION_LINK,
                );
              } catch (err: any) {}

              recipient = [req.body.email];

              const user = await this.userModel
                .findOne({
                  email: req.body.email,
                })
                .lean()
                .exec();

              const receiverHost = process.env.FE_HOST;

              subject = emailTemplate?.subject || 'Verify your account';
              context.title = 'New Verification Email';
              context.description =
                emailTemplate?.description ||
                `Please verify your email address to complete creating your account.`;
              context.buttonText = 'ACTIVATE';
              context.buttonUri = `${receiverHost}/auth/verify-account?token=${user.emailProofToken}`;
              replacements.name = `${user?.profile?.firstName || ''} ${
                user?.profile?.lastName || ''
              }`;
            }
            break;
          case '/user/reset-password/generate/link':
            if (method === 'POST') {
              try {
                emailTemplate = await this.emailTemplateService.findOne(
                  EmailContentType.GENERATE_PASSWORD_RESET_LINK,
                );
              } catch (err: any) {}

              const user = await this.userModel
                .findOne({ email: req.body.email })
                .populate({
                  path: 'profile',
                  select: {
                    firstName: 1,
                    lastName: 1,
                  },
                })
                .lean()
                .exec();
              recipient = [req.body.email];
              const receiverHost = feHost;

              subject = emailTemplate?.subject || 'Password Reset';
              context.title = 'Password Reset';
              context.description =
                emailTemplate?.description ||
                `We got a request to reset your rndMatch Password. If you didn’t request a password request you can ignore this message and your password won’t be changed. You can also report to us for a suspicious password change attempt. Contact Us.`;
              context.buttonText = 'Reset Password';
              context.buttonUri = `${receiverHost}/auth/set-password?token=${user['passwordResetToken']}`;
              replacements.name = `${user?.profile?.firstName || ''} ${
                user?.profile?.lastName || ''
              }`;
            }
            break;
          case '/user/forget/password':
            if (method === 'PATCH') {
              try {
                emailTemplate = await this.emailTemplateService.findOne(
                  EmailContentType.FORGET_PASSWORD,
                );
              } catch (err: any) {}

              recipient = [result.email];
              subject = emailTemplate?.subject || 'Password Reset';
              context.title = 'Password Reset';
              context.description =
                emailTemplate?.description ||
                `Your have successfully changed your password`;
              context.buttonText = 'LOG IN';
              context.buttonUri = `${feHost}/${
                result.isProvider ? 'auth/' : ''
              }login`;

              const user = await this.userModel
                .findOne({ email: result.email })
                .populate({
                  path: 'profile',
                  select: {
                    firstName: 1,
                    lastName: 1,
                  },
                })
                .lean()
                .exec();

              replacements.name = `${user?.profile?.firstName || ''} ${
                user?.profile?.lastName || ''
              }`;
            }
            break;
          case '/user/reset/password':
            if (method === 'PATCH') {
              try {
                emailTemplate = await this.emailTemplateService.findOne(
                  EmailContentType.RESET_PASSWORD,
                );
              } catch (err: any) {}

              subject = emailTemplate?.subject || 'Password Reset';
              recipient = [result.email];
              context.title = 'Password Reset';
              context.description =
                emailTemplate?.description ||
                `Your have successfully changed your password`;
              context.buttonText = 'LOG IN';
              context.buttonUri = `${feHost}/${
                result.isProvider ? 'auth/' : ''
              }login`;

              const user = await this.userModel
                .findOne({ email: result.email })
                .populate({
                  path: 'profile',
                  select: {
                    firstName: 1,
                    lastName: 1,
                  },
                })
                .lean()
                .exec();

              replacements.name = `${user?.profile?.firstName || ''} ${
                user?.profile?.lastName || ''
              }`;
            }
            break;
          default:
            return;
        }

        try {
          if (emailTemplate) {
            const decodedPassword =
              emailTemplate?.emailPassword &&
              (await decodeToken(emailTemplate.emailPassword, this.password));

            emailConfig.defaultUser =
              emailTemplate?.emailUser || emailConfig.defaultUser;
            emailConfig.defaultPassword =
              decodedPassword?.emailPassword || emailConfig.defaultPassword;
          }

          this.dynamicMailer.setConfig(emailConfig);
          this.dynamicMailer.setTo(recipient);
          this.dynamicMailer.setSubject(subject);
          this.dynamicMailer.setContext(context);
          this.dynamicMailer.replaceSubject(replacements);
          this.dynamicMailer.replaceContext('description', replacements);
          this.dynamicMailer.replaceContext('title', replacements);
          await this.dynamicMailer.sendMail();
        } catch (err: any) {}
      }),
    );
  }
}

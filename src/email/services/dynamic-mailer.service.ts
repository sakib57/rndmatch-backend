import { IEmail, IEmailConfiguration } from '../interfaces';
import * as nodemailer from 'nodemailer';
import { isEmail } from 'class-validator';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import { join } from 'path';
import { CreateEmailDTO } from '../dto';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { EmailService } from './email.service';

@Injectable()
export class DynamicMailer {
  private config;
  private to: string[] = [];
  private templatePath: string = join(
    __dirname,
    '../',
    'templates/template.hbs',
  );
  private context: Record<string, string> = {};
  private subject = 'New email from rndMatch.';

  /**
   * constructor
   * @param {EmailService} emailService
   */
  constructor(private emailService: EmailService) {}

  /**
   * Replace certain key from string using replacements object
   * @param replacements
   * @param item
   * @returns
   */
  private replace = (replacements: Record<string, string>, item: string) => {
    const rString = item.replace(/{{\w*}}/g, (v) => {
      const val = v.substring(2, v.length - 2);
      return replacements[val] || '';
    });
    return rString.replace(/\s+/g, ' ');
  };

  /**
   * Create new entry for sent email
   * @param isSuccess
   * @returns {IEmail}
   */
  private saveEmail = async (isSuccess: boolean): Promise<IEmail> => {
    const createEmailDTO = new CreateEmailDTO();
    createEmailDTO.to = this.to;
    createEmailDTO.subject = this.subject;
    createEmailDTO.description = this.context?.description;
    createEmailDTO.signature = this.context?.signature;
    createEmailDTO.emailUser = this.config?.auth?.user;
    createEmailDTO.isSuccess = isSuccess;

    return this.emailService.create(createEmailDTO);
  };
  /**
   * sets config for node-mailer
   * @param {IEmailConfiguration} config
   */
  public setConfig = (config: IEmailConfiguration): void => {
    this.config = {
      host: config.smtpHost,
      port: config.smtpPort,
      secure: false,
      requireTLS: true,
      auth: {
        user: config.defaultUser,
        pass: config.defaultPassword,
      },
    };
  };

  /**
   * sets subject for node-mailer
   * @param {string}subject
   */
  public setSubject = (subject: string): void => {
    if (!subject?.length) {
      throw new Error(`Is not a valid 'subject'`);
    }
    this.subject = subject;
  };

  /**
   * sets 'to' for node-mailer
   * @param {string[]} to
   */
  public setTo = (to: string[]): void => {
    if (Array.isArray(to)) {
      to.forEach((email) => {
        if (!isEmail(email)) {
          throw `${email} is not a valid email`;
        }
      });
      this.to = to;
    } else {
      throw new Error(`'to' is not an array`);
    }
  };

  /**
   * sets custom template path
   * @param {string} templatePath
   */
  public setTemplatePath = (templatePath: string): void => {
    this.templatePath = templatePath;
  };

  /**
   * sets context for the email template
   * @param {Record<string, string>}context
   */
  public setContext = (context: Record<string, string>): void => {
    this.context = context;
  };

  /**
   * replace dynamic variables of subject
   * @param {Record<string, string>} replacements
   */
  public replaceSubject = (replacements: Record<string, string>) => {
    this.subject = this.replace(replacements, this.subject);
  };

  /**
   * replace dynamic variable of certain key of context
   * @param {string} key
   * @param {Record<string, string>} replacements
   */
  public replaceContext = (
    key: string,
    replacements: Record<string, string>,
  ): void => {
    if (this.context[key] === undefined) {
      return;
    }
    this.context[key] = this.replace(replacements, this.context[key]);
  };

  /**
   * create mail transport using provided configuration
   * @returns {nodemailer.Transport}
   */
  private createMailer = () => {
    if (!this.config) {
      throw new Error('Config was not provided');
    }
    return nodemailer.createTransport(this.config);
  };

  /**
   * send email following provided subject, config and context
   */
  public sendMail = async () => {
    let isMailSentSuccess = false;
    try {
      const templateSrc = fs.readFileSync(this.templatePath, 'utf-8');
      const template = handlebars.compile(templateSrc);
      const html = template(this.context);
      const mailer = this.createMailer();

      if (!this.to || !Array.isArray(this.to)) {
        return Promise.reject(new BadRequestException(`'to' was not provided`));
      }
      if (!this.subject) {
        return Promise.reject(
          new BadRequestException(`'subject' was not provided`),
        );
      }

      if (process.env.NODE_ENV === 'production') {
        await mailer.sendMail({
          from: `${this.config?.auth?.user || 'no-reply <no-reply@test.com>'}`,
          to: this.to,
          subject: this.subject,
          html: html,
        });
      }

      isMailSentSuccess = true;
      return this.saveEmail(isMailSentSuccess);
    } catch (err: any) {
      await this.saveEmail(false);
      Logger.error(
        `Failed to send email to ${this.to}`,
        JSON.stringify(err),
        'EMAIL',
      );
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  };
}

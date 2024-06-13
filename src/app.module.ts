import { Module, Logger } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpErrorFilter } from './common/filters/http-error.filter';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DemographyModule } from './demography/demography.module';
import { EmailModule } from './email/email.module';
import { FilesModule } from './files/files.module';
import { OrganizationModule } from './organization/organization.module';
import { SkillsModule } from './skills/skills.module';
import { JobsModule } from './jobs/jobs.module';
import { PositionsModule } from './positions/positions.module';
import { JobApplicationsModule } from './job-applications/job-applications.module';
import { PackagesModule } from './packages/packages.module';
import 'dotenv/config';
import { CacheModule } from './cache-manager/cache-manager.module';
import { InvitationsModule } from './invitations/invitations.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ThreadModule } from './thread/thread.module';
import { TemplatesModule } from './templates/templates.module';
import { MigrationModule } from './migration/migration.module';
import { StreamsModule } from './streams/streams.module';
import { SavedModule } from './saved/saved.module';
import { HideModule } from './hide/hide.module';

const DB_CONNECTION = process.env.DB_CONNECTION;
Logger.log(`DB: ${DB_CONNECTION}`, 'Database');

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(DB_CONNECTION),
    HttpModule,
    AuthModule,
    UsersModule,
    EmailModule,
    DemographyModule,
    FilesModule,
    OrganizationModule,
    SkillsModule,
    PositionsModule,
    JobsModule,
    JobApplicationsModule,
    PackagesModule,
    CacheModule,
    InvitationsModule,
    NotificationsModule,
    ThreadModule,
    TemplatesModule,
    MigrationModule,
    StreamsModule,
    SavedModule,
    HideModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}

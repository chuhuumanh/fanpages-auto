import { Module } from '@nestjs/common';
import databaseConfig from './database/config/database.config';
import appConfig from './config/app.config';
import mailConfig from './mail/config/mail.config';
import path from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nModule } from 'nestjs-i18n/dist/i18n.module';
import { HeaderResolver } from 'nestjs-i18n';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { MailModule } from './mail/mail.module';
import { HomeModule } from './home/home.module';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AllConfigType } from './config/config.type';
import { MailerModule } from './mailer/mailer.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './database/mongoose-config.service';
import { DatabaseConfig } from './database/config/database-config.type';

// <database-block>
const infrastructureDatabaseModule = (databaseConfig() as DatabaseConfig)
  .isDocumentDatabase
  ? MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    })
  : TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    });
// </database-block>

import { UsersModule } from './users/users.module';

import { RolesModule } from './roles/roles.module';

import { FanpagesModule } from './fanpages/fanpages.module';

import { PostsModule } from './posts/posts.module';

import { CommentsModule } from './comments/comments.module';

import { ScheduledTasksModule } from './scheduled-tasks/scheduled-tasks.module';

import { MediaModule } from './media/media.module';

import { PostMediaModule } from './post-media/post-media.module';

import { LogsModule } from './logs/logs.module';

@Module({
  imports: [
    LogsModule,
    PostMediaModule,
    MediaModule,
    ScheduledTasksModule,
    CommentsModule,
    PostsModule,
    FanpagesModule,
    RolesModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig, mailConfig],
      envFilePath: ['.env'],
    }),
    infrastructureDatabaseModule,
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService<AllConfigType>) => ({
        fallbackLanguage: configService.getOrThrow('app.fallbackLanguage', {
          infer: true,
        }),
        loaderOptions: { path: path.join(__dirname, '/i18n/'), watch: true },
      }),
      resolvers: [
        {
          use: HeaderResolver,
          useFactory: (configService: ConfigService<AllConfigType>) => {
            return [
              configService.get('app.headerLanguage', {
                infer: true,
              }),
            ];
          },
          inject: [ConfigService],
        },
      ],
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    MailModule,
    MailerModule,
    HomeModule,
  ],
})
export class AppModule {}

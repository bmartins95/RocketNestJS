import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question';
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions';

import { AuthModule } from './auth/auth';
import { DatabaseModule } from './database/database-module';
import { envSchema } from './env';
import { AuthenticationController } from './http/controllers/authentication';
import { CreateAccountController } from './http/controllers/create-account';
import { CreateQuestionController } from './http/controllers/create-question';
import { FetchRecentQuestionsController } from './http/controllers/fetch-recent-questions';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule
  ],
  controllers: [
    CreateAccountController,
    AuthenticationController,
    CreateQuestionController,
    FetchRecentQuestionsController
  ],
  providers: [
    DatabaseModule,
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase
  ],
})
export class AppModule { }

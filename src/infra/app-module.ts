import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student';
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question';
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions';
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student';

import { AuthModule } from './auth/auth-module';
import { BcryptHasher } from './cryptography/bcrypt-hasher';
import { JwtEncrypter } from './cryptography/jwt-encrypter';
import { DatabaseModule } from './database/database-module';
import { envSchema } from './env';
import { EnvService } from './env-service';
import { AuthenticationController } from './http/controllers/authenticate';
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
    FetchRecentQuestionsUseCase,
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,
    EnvService,
    { provide: 'Hasher', useClass: BcryptHasher },
    { provide: 'Encrypter', useClass: JwtEncrypter }
  ],
})
export class AppModule { }

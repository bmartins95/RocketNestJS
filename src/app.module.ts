import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth';
import { AuthenticationController } from './controllers/authentication';
import { CreateAccountController } from './controllers/create-account';
import { CreateQuestionController } from './controllers/create-question';
import { envSchema } from './env';
import { PrismaService } from './prisma/prisma.service';

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
    CreateQuestionController
  ],
  providers: [PrismaService],
})
export class AppModule { }

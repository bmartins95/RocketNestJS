import { NestFactory } from '@nestjs/core';

import { AppModule } from './app-module';
import { EnvService } from './env-service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const envService = app.get(EnvService);
  await app.listen(envService.get('PORT'));
}

void bootstrap();

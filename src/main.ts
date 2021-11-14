import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
  const logger = new Logger();
  logger.log(`Server is Running in ${await app.getUrl()} 🚀`);
}
bootstrap();

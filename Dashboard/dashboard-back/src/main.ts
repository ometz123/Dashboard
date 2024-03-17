import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  
  const port = configService.get("PORT") || 3000;

  await app.listen(port, () => console.log(`API is listening on port ${port}`));
}
bootstrap();

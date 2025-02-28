import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Dream Diary Swagger')
    .setDescription('The Dream Diary API description')
    .setVersion('1.0')
    .addTag('dream-diary')
    .addBearerAuth()
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, {
      ...config,
      servers: [{ url: '/api' }],
    });

  SwaggerModule.setup('docs', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: '*',
  });

  await app.listen(5000);
}

bootstrap();

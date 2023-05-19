import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // to set a prefix for every route registered in an HTTP application
  app.setGlobalPrefix('api/v2');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // sólo deja las propiedades definidas, elimina las demás
      forbidNonWhitelisted: true // en lugar de eliminar las propiedades no incluidas en la whitelist, el validator genera una exception
    })
  )

  await app.listen(3000);
}
bootstrap();

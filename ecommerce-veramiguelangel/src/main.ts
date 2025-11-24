import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { environment } from './config/environment.dev';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Proyecto Integrador M4-Backend')
    .setDescription('Proyecto creado con NestJS')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(environment.PORT);
  console.log(
    `Servidor escuchando en http://${environment.HOST}:${environment.PORT}`,
  );
}
bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});

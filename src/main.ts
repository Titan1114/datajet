import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('DataJet API')
    .setDescription('No code database integration')
    .setVersion('1.0')
    .addTag('Nest API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apis', app, document);

  await app.listen(3001);
}
bootstrap();

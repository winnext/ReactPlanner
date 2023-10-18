import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import { kafkaOptions } from './common/config/kafka.options';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, { abortOnError: false });

    
    const configService = app.get(ConfigService);
    console.log(configService.get('PORT'));

    const config = new DocumentBuilder()
      .setTitle('WinPlanner Microservice')
      .setVersion('1.0')
      .addTag('winplanner')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter JWT token',
          in: 'header',
        },
        'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
      )
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.useGlobalPipes(new ValidationPipe());

    // app.connectMicroservice(kafkaOptions);
    app.enableCors();
    // await app.startAllMicroservices();
    const PORT = configService.get('PORT') || 9001;
    await app.listen(PORT);
  } catch (error) {
    console.log(error);
  }
}
bootstrap();

import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { kafkaOptions } from './common/config/kafka.options';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, { abortOnError: false });

    const configService = app.get(ConfigService);

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

import { NestFactory } from '@nestjs/core';
import { ClinicalModule } from './clinical.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(ClinicalModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 4002,
    },
  });
  await app.startAllMicroservices();
  await app.listen(4002);
}
bootstrap();

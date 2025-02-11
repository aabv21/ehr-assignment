import { NestFactory } from '@nestjs/core';
import { EhrModule } from './ehr.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(EhrModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 4003,
    },
  });
  await app.startAllMicroservices();
  await app.listen(4003);
}
bootstrap();

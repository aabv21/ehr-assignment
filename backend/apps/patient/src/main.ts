import { NestFactory } from '@nestjs/core';
import { PatientModule } from './patient.module';
import { Transport } from '@nestjs/microservices';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
async function bootstrap() {
  const logger = new Logger('Patient Service');

  // Create the HTTP application
  const app = await NestFactory.create(PatientModule);

  // Add TCP microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { host: '127.0.0.1', port: 4001 },
  });

  // Start all microservices
  await app.startAllMicroservices();

  // Start the HTTP application
  await app.listen(4001);

  logger.log('Patient Service is running on port 4001');
}
bootstrap();

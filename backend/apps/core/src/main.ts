import { NestFactory } from '@nestjs/core';
import { CoreModule } from './core.module';

async function bootstrap() {
  const app = await NestFactory.create(CoreModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();

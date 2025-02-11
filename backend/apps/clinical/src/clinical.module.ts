import { Module } from '@nestjs/common';
import { ClinicalController } from './clinical.controller';
import { ClinicalService } from './clinical.service';
import { ClientsModule } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'CLINICAL_SERVICE', transport: Transport.TCP },
    ]),
  ],
  controllers: [ClinicalController],
  providers: [ClinicalService],
})
export class ClinicalModule {}

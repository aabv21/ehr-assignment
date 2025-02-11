import { Module } from '@nestjs/common';
import { EhrController } from './ehr.controller';
import { EhrService } from './ehr.service';
import { Transport } from '@nestjs/microservices';
import { ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([{ name: 'EHR_SERVICE', transport: Transport.TCP }]),
  ],
  controllers: [EhrController],
  providers: [EhrService],
})
export class EhrModule {}

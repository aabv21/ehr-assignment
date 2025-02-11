import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Body,
} from '@nestjs/common';

// Services
import { CoreService } from './core.service';

// Dtos
import { UpdatePatientDto } from 'apps/patient/src/dtos/update-patient.dto';
import { CreatePatientDto } from 'apps/patient/src/dtos/create-patient.dto';
import { AddSymptomsDto } from 'apps/clinical/src/dtos/add-symptoms.dto';
import { AddFamilyHistoryDto } from 'apps/clinical/src/dtos/add-family-history.dto';

@Controller()
export class CoreController {
  constructor(private readonly coreService: CoreService) {}

  @Get('patients/list')
  getPatients() {
    return this.coreService.getPatients();
  }

  @Get('patients/:id')
  getPatientById(@Param('id') id: string) {
    return this.coreService.getPatient(id);
  }

  @Post('patients')
  createPatient(@Body() body: [{ patient: CreatePatientDto }]) {
    return this.coreService.addPatient(body);
  }

  @Put('patients/:id')
  updatePatient(@Param('id') id: string, @Body() body: UpdatePatientDto) {
    return this.coreService.updatePatient(id, body);
  }

  @Delete('patients/:id')
  deletePatient(@Param('id') id: string) {
    return this.coreService.deletePatient(id);
  }

  @Post('patients/:id/add-symptoms')
  addSymptoms(@Param('id') id: string, @Body() body: AddSymptomsDto) {
    return this.coreService.addSymptoms(id, body);
  }

  @Post('patients/:id/add-family-history')
  addFamilyHistory(@Param('id') id: string, @Body() body: AddFamilyHistoryDto) {
    return this.coreService.addFamilyHistory(id, body);
  }
}

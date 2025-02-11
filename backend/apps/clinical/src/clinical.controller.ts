import { Controller, Param, Body } from '@nestjs/common';
import { ClinicalService } from './clinical.service';
import { EventPattern } from '@nestjs/microservices';

// Dtos
import { AddSymptomsDto } from './dtos/add-symptoms.dto';
import { AddFamilyHistoryDto } from './dtos/add-family-history.dto';

@Controller()
export class ClinicalController {
  constructor(private readonly clinicalService: ClinicalService) {}

  @EventPattern('add_symptoms')
  addSymptoms(@Param('id') id: string, @Body() body: AddSymptomsDto) {
    return this.clinicalService.addSymptoms(id, body);
  }

  @EventPattern('add_family_history')
  addFamilyHistory(@Param('id') id: string, @Body() body: AddFamilyHistoryDto) {
    return this.clinicalService.addFamilyHistory(id, body);
  }
}

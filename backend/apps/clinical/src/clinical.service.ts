import { Injectable } from '@nestjs/common';

// Dtos
import { AddSymptomsDto } from './dtos/add-symptoms.dto';
import { AddFamilyHistoryDto } from './dtos/add-family-history.dto';

@Injectable()
export class ClinicalService {
  constructor() {}

  // TODO: Implement this
  addSymptoms(id: string, symptoms: AddSymptomsDto) {
    return { id, symptoms };
  }

  // TODO: Implement this
  addFamilyHistory(id: string, familyHistory: AddFamilyHistoryDto) {
    return { id, familyHistory };
  }
}

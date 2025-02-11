import { Test, TestingModule } from '@nestjs/testing';
import { ClinicalController } from './clinical.controller';
import { ClinicalService } from './clinical.service';

// Dtos
import { AddSymptomsDto } from './dtos/add-symptoms.dto';
import { AddFamilyHistoryDto } from './dtos/add-family-history.dto';

// Interfaces
import { Symptoms } from './interfaces/symptoms';
import { FamilyHistory } from './interfaces/family-history';

describe('ClinicalController', () => {
  let clinicalController: ClinicalController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ClinicalController],
      providers: [ClinicalService],
    }).compile();

    clinicalController = app.get<ClinicalController>(ClinicalController);
  });

  describe('addSymptoms', () => {
    it('should return the symptoms', () => {
      expect(clinicalController.addSymptoms('1', {} as AddSymptomsDto)).toBe(
        {} as Symptoms,
      );
    });
  });

  describe('addFamilyHistory', () => {
    it('should return the family history', () => {
      expect(
        clinicalController.addFamilyHistory('1', {} as AddFamilyHistoryDto),
      ).toBe({} as FamilyHistory);
    });
  });
});

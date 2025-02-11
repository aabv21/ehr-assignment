import { Test, TestingModule } from '@nestjs/testing';
import { CoreController } from './core.controller';

// Services
import { CoreService } from './core.service';

// Interfaces
import { Patient } from 'apps/patient/src/interfaces/patient';

// Dtos
import { CreatePatientDto } from 'apps/patient/src/dtos/create-patient.dto';
import { UpdatePatientDto } from 'apps/patient/src/dtos/update-patient.dto';

describe('CoreController', () => {
  let coreController: CoreController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CoreController],
      providers: [CoreService],
    }).compile();

    coreController = app.get<CoreController>(CoreController);
  });

  describe('getPatients', () => {
    it('should return the patients', () => {
      expect(coreController.getPatients()).toBe([]);
    });
  });

  describe('getPatientById', () => {
    it('should return the patient', () => {
      expect(coreController.getPatientById('1')).toBe({} as Patient);
    });
  });

  describe('createPatient', () => {
    it('should return the patient', () => {
      expect(
        coreController.createPatient([{ patient: {} as CreatePatientDto }]),
      ).toBe({} as Patient);
    });
  });

  describe('updatePatient', () => {
    it('should return the patient', () => {
      expect(coreController.updatePatient('1', {} as UpdatePatientDto)).toBe(
        {} as Patient,
      );
    });
  });

  describe('deletePatient', () => {
    it('should return the patient', () => {
      expect(coreController.deletePatient('1')).toBe({} as Patient);
    });
  });
});

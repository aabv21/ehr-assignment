import { Test, TestingModule } from '@nestjs/testing';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { Patient } from './interfaces/patient';
import { UpdatePatientDto } from './dtos/update-patient.dto';

describe('PatientController', () => {
  let patientController: PatientController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PatientController],
      providers: [PatientService],
    }).compile();

    patientController = app.get<PatientController>(PatientController);
  });

  describe('addPatient', () => {
    it('should return the patient', () => {
      expect(patientController.addPatient({} as Patient)).toBe({} as Patient);
    });
  });

  describe('getPatient', () => {
    it('should return the patient', () => {
      expect(patientController.getPatient('1')).toBe({} as Patient);
    });
  });

  describe('updatePatient', () => {
    it('should return the patient', () => {
      expect(
        patientController.updatePatient({
          id: '1',
          patient: {} as UpdatePatientDto,
        }),
      ).toBe({} as Patient);
    });
  });

  describe('deletePatient', () => {
    it('should return the patient', () => {
      expect(patientController.deletePatient('1')).toBe({} as Patient);
    });
  });
});

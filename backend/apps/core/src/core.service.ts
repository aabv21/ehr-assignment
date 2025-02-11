import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeout, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

// Dtos
import { CreatePatientDto } from 'apps/patient/src/dtos/create-patient.dto';
import { UpdatePatientDto } from 'apps/patient/src/dtos/update-patient.dto';
import { AddSymptomsDto } from 'apps/clinical/src/dtos/add-symptoms.dto';
import { AddFamilyHistoryDto } from 'apps/clinical/src/dtos/add-family-history.dto';

@Injectable()
export class CoreService {
  constructor(
    @Inject('PATIENT_SERVICE') private readonly patientClient: ClientProxy,
    @Inject('CLINICAL_SERVICE') private readonly clinicalClient: ClientProxy,
    @Inject('EHR_SERVICE') private readonly ehrClient: ClientProxy,
  ) {}

  addPatient(ehrPatients: [{ patient: CreatePatientDto }]) {
    ehrPatients.forEach((ehr) => {
      const patientData = ehr.patient;
      this.patientClient.emit('add_patient', patientData);
    });
  }

  getPatient(id: string) {
    return this.patientClient.send({ cmd: 'get_patient' }, id);
  }

  getPatients() {
    return this.patientClient.send({ cmd: 'get_patients' }, {}).pipe(
      timeout(5000),
      catchError((error) => {
        console.error('Error fetching patients:', error);
        return of([]);
      }),
    );
  }

  updatePatient(id: string, patient: UpdatePatientDto) {
    return this.patientClient.emit('update_patient', { id, patient });
  }

  deletePatient(id: string) {
    return this.patientClient.emit('delete_patient', id);
  }

  addSymptoms(id: string, symptoms: AddSymptomsDto) {
    return this.clinicalClient.emit('add_symptoms', { id, symptoms });
  }

  addFamilyHistory(id: string, familyHistory: AddFamilyHistoryDto) {
    return this.clinicalClient.emit('add_family_history', {
      id,
      familyHistory,
    });
  }
}

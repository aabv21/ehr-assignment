import { Patient, PatientWithDifferentEhr } from '../interfaces/patient';

export class UpdatePatientEvent {
  constructor(public readonly patient: Patient | PatientWithDifferentEhr) {}
}

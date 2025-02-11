import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
// DTOs
import { CreatePatientDto } from './dtos/create-patient.dto';
import { UpdatePatientDto } from './dtos/update-patient.dto';

// Interfaces
import { Patient, PatientWithDifferentEhr } from './interfaces/patient';

@Injectable()
export class PatientService {
  private patients: (Patient | PatientWithDifferentEhr)[] = [];

  constructor() {}

  /**
   * Get patient by id
   */
  getPatientById(id: string) {
    return this.patients.find((patient) => patient.id === id);
  }

  /**
   * Get all patients
   */
  getPatients() {
    return this.patients;
  }

  /**
   * Create a patient
   */
  createPatient(createPatientRequest: CreatePatientDto) {
    const patient: Patient | PatientWithDifferentEhr = {
      id: uuidv4(),
      ...createPatientRequest,
      createdAt: new Date().toISOString(),
    };
    this.patients.push(patient);
  }

  /**
   * Update a patient
   */
  updatePatient(id: string, updatePatientRequest: UpdatePatientDto) {
    const patient = this.patients.find((patient) => patient.id === id);
    if (!patient) {
      throw new Error('Patient not found');
    }

    if (updatePatientRequest.name) {
      patient.name = updatePatientRequest.name;
    }
  }

  /**
   * Delete a patient
   */
  deletePatient(id: string) {
    const patientIndex = this.patients.findIndex(
      (patient) => patient.id === id,
    );
    if (patientIndex === -1) {
      throw new Error('Patient not found');
    }

    this.patients.splice(patientIndex, 1);
  }
}

import { Controller } from '@nestjs/common';

// Services
import { PatientService } from './patient.service';

// DTOs
import { CreatePatientDto } from './dtos/create-patient.dto';
import { UpdatePatientDto } from './dtos/update-patient.dto';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  /**
   * Handle add patient event
   */
  @EventPattern('add_patient')
  addPatient(patient: CreatePatientDto) {
    return this.patientService.createPatient(patient);
  }

  /**
   * Handle get patient event
   */
  @MessagePattern({ cmd: 'get_patient' })
  getPatient(id: string) {
    return this.patientService.getPatientById(id);
  }

  /**
   * Handle get patients event
   */
  @MessagePattern({ cmd: 'get_patients' })
  getPatients() {
    return this.patientService.getPatients();
  }

  /**
   * Handle update patient event
   */
  @EventPattern('update_patient')
  updatePatient(data: { id: string; patient: UpdatePatientDto }) {
    return this.patientService.updatePatient(data.id, data.patient);
  }

  /**
   * Handle delete patient event
   */
  @EventPattern('delete_patient')
  deletePatient(id: string) {
    return this.patientService.deletePatient(id);
  }
}

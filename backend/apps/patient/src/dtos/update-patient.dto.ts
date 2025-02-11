import { IsString, IsOptional } from 'class-validator';

export class UpdatePatientDto {
  @IsString()
  @IsOptional()
  name?: string;
  @IsString()
  @IsOptional()
  gender?: string;
  @IsString()
  @IsOptional()
  ehrSystem?: string;
  @IsString()
  @IsOptional()
  dateOfBirth?: string;
  @IsString()
  @IsOptional()
  dateOfDeath?: string;
  @IsString()
  @IsOptional()
  address?: string;
  @IsString()
  @IsOptional()
  phoneNumber?: string;
  @IsString()
  @IsOptional()
  email?: string;
  @IsString()
  @IsOptional()
  medicalHistory?: string;
  @IsString()
  @IsOptional()
  medications?: string;
  @IsString()
  @IsOptional()
  allergies?: string;
  @IsString()
  @IsOptional()
  vitals?: string;

  @IsString()
  @IsOptional()
  p_name?: string;
  @IsString()
  @IsOptional()
  p_gender?: string;
  @IsString()
  @IsOptional()
  p_ehrSystem?: string;
  @IsString()
  @IsOptional()
  p_dateOfBirth?: string;
  @IsString()
  @IsOptional()
  p_dateOfDeath?: string;
  @IsString()
  @IsOptional()
  p_address?: string;
  @IsString()
  @IsOptional()
  p_phoneNumber?: string;
  @IsString()
  @IsOptional()
  p_email?: string;
  @IsString()
  @IsOptional()
  p_medicalHistory?: string;
  @IsString()
  @IsOptional()
  p_medications?: string;
  @IsString()
  @IsOptional()
  p_allergies?: string;
  @IsString()
  @IsOptional()
  p_vitals?: string;

  @IsString()
  @IsOptional()
  createdAt?: string;
}

// Dtos
import { AddEhrDto } from './add-ehr.dto';

export class UpdateEhrDto extends AddEhrDto {
  updatedFields: Partial<AddEhrDto>;
}

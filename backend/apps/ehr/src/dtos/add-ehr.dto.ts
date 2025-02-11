import { IsNotEmpty } from 'class-validator';

export class AddEhrDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
  // TODO: Add more fields
}

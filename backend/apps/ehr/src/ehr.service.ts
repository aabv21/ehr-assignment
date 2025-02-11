import { Injectable } from '@nestjs/common';

// Dtos
import { AddEhrDto } from './dtos/add-ehr.dto';
import { UpdateEhrDto } from './dtos/update-ehr.dto';

// Interfaces
import { Athena, OtherScripts } from './interfaces/ehrs';

@Injectable()
export class EhrService {
  constructor() {}

  addEhr(body: AddEhrDto): Athena | OtherScripts {
    console.log(body);
    // TODO: Implement this
    return {} as Athena | OtherScripts;
  }

  getEhr(id: string): Athena | OtherScripts {
    console.log(id);
    // TODO: Implement this
    return {} as Athena | OtherScripts;
  }

  updateEhr(id: string, body: UpdateEhrDto): Athena | OtherScripts {
    console.log(id, body);
    // TODO: Implement this
    return {} as Athena | OtherScripts;
  }

  deleteEhr(id: string): void {
    console.log(id);
    // TODO: Implement this
  }
}

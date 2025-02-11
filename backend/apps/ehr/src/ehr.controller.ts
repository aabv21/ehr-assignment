import { Controller, Body, Param } from '@nestjs/common';
import { EhrService } from './ehr.service';
import { EventPattern } from '@nestjs/microservices';

// Dtos
import { AddEhrDto } from './dtos/add-ehr.dto';
import { UpdateEhrDto } from './dtos/update-ehr.dto';

@Controller()
export class EhrController {
  constructor(private readonly ehrService: EhrService) {}

  @EventPattern('add_ehr')
  addEhr(@Body() body: AddEhrDto) {
    return this.ehrService.addEhr(body);
  }

  @EventPattern('update_ehr')
  updateEhr(@Param('id') id: string, @Body() body: UpdateEhrDto) {
    return this.ehrService.updateEhr(id, body);
  }
}

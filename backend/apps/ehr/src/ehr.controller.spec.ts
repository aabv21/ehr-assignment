import { Test, TestingModule } from '@nestjs/testing';
import { EhrController } from './ehr.controller';

// Services
import { EhrService } from './ehr.service';

// Interfaces
import { Athena, OtherScripts } from './interfaces/ehrs';

// Dtos
import { AddEhrDto } from './dtos/add-ehr.dto';
import { UpdateEhrDto } from './dtos/update-ehr.dto';

describe('EhrController', () => {
  let ehrController: EhrController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EhrController],
      providers: [EhrService],
    }).compile();

    ehrController = app.get<EhrController>(EhrController);
  });

  describe('addEhr', () => {
    it('should return the ehr', () => {
      expect(ehrController.addEhr({} as AddEhrDto)).toBe(
        {} as Athena | OtherScripts,
      );
    });
  });

  describe('updateEhr', () => {
    it('should return the ehr', () => {
      expect(ehrController.updateEhr('1', {} as UpdateEhrDto)).toBe(
        {} as Athena | OtherScripts,
      );
    });
  });
});

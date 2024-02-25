import { Test, TestingModule } from '@nestjs/testing';
import { DatasourceController } from './datasource.controller';

describe('DatasourceController', () => {
  let controller: DatasourceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatasourceController],
    }).compile();

    controller = module.get<DatasourceController>(DatasourceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

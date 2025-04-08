import { Test, TestingModule } from '@nestjs/testing';
import { UserStickersController } from './user-stickers.controller';
import { UserStickersService } from './user-stickers.service';

describe('UserStickersController', () => {
  let controller: UserStickersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserStickersController],
      providers: [UserStickersService],
    }).compile();

    controller = module.get<UserStickersController>(UserStickersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

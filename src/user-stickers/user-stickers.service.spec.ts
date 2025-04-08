import { Test, TestingModule } from '@nestjs/testing';
import { UserStickersService } from './user-stickers.service';

describe('UserStickersService', () => {
  let service: UserStickersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserStickersService],
    }).compile();

    service = module.get<UserStickersService>(UserStickersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { FriendsRelationshipService } from './friends-relationship.service';

describe('FriendsRelationshipService', () => {
  let service: FriendsRelationshipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FriendsRelationshipService],
    }).compile();

    service = module.get<FriendsRelationshipService>(FriendsRelationshipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

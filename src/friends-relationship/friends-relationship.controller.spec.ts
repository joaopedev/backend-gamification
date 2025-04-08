import { Test, TestingModule } from '@nestjs/testing';
import { FriendsRelationshipController } from './friends-relationship.controller';
import { FriendsRelationshipService } from './friends-relationship.service';

describe('FriendsRelationshipController', () => {
  let controller: FriendsRelationshipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FriendsRelationshipController],
      providers: [FriendsRelationshipService],
    }).compile();

    controller = module.get<FriendsRelationshipController>(FriendsRelationshipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

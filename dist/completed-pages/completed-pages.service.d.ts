import { UpdateCompletedPageDto } from './dto/update-completed-page.dto';
import { CompletedPage } from './entities/completed-page.entity';
import { Repository } from 'typeorm';
import { Users } from 'src/users/entities/user.entity';
import { CompletePageDto } from './dto/create-completed-page.dto';
export declare class CompletedPagesService {
    private readonly completedPageRepo;
    private readonly usersRepo;
    constructor(completedPageRepo: Repository<CompletedPage>, usersRepo: Repository<Users>);
    create(userId: number, createCompletedPageDto: CompletePageDto): Promise<{
        ticket: number;
    }>;
    findAll(): Promise<{
        id: number;
        userId: number;
        pageIndex: number;
        ticket: string;
    }[]>;
    findOne(id: number): string;
    update(id: number, updateCompletedPageDto: UpdateCompletedPageDto): string;
    remove(id: number): string;
}

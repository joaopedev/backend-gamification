import { CompletePageDto } from './dto/create-completed-page.dto';
import { UpdateCompletedPageDto } from './dto/update-completed-page.dto';
import { CompletedPagesService } from './completed-pages.service';
export declare class CompletedPagesController {
    private readonly completedPagesService;
    constructor(completedPagesService: CompletedPagesService);
    completePage(dto: CompletePageDto): Promise<{
        ticket: number;
        coinsRewarded: number;
    }>;
    findAll(): Promise<{
        id: number;
        userId: number;
        pageIndex: number;
        ticket: string;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        userId: number;
        pageIndex: number;
        ticket: string;
    }>;
    update(id: string, updateCompletedPageDto: UpdateCompletedPageDto): Promise<{
        message: string;
        updated: import("./entities/completed-page.entity").CompletedPage;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

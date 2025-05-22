import { CompletePageDto } from './dto/create-completed-page.dto';
import { UpdateCompletedPageDto } from './dto/update-completed-page.dto';
import { CompletedPagesService } from './completed-pages.service';
export declare class CompletedPagesController {
    private readonly completedPagesService;
    constructor(completedPagesService: CompletedPagesService);
    completePage(dto: CompletePageDto): Promise<{
        ticket: number;
    }>;
    findAll(): Promise<{
        id: number;
        userId: number;
        pageIndex: number;
        ticket: string;
    }[]>;
    findOne(id: string): string;
    update(id: string, updateCompletedPageDto: UpdateCompletedPageDto): string;
    remove(id: string): string;
}

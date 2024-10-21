import { BookService } from './book.service';
import { CreateBookDto } from './create-book.dto';
import { Book } from './book.schema';
export declare class BookController {
    private readonly bookService;
    constructor(bookService: BookService);
    test(): string;
    findAll(): Promise<Book[]>;
    getVerifiedBooks(): Promise<Book[]>;
    findByTitle(title: string): Promise<Book[]>;
    findByAuthor(author: string): Promise<Book[]>;
    findByJournal(journal: string): Promise<Book[]>;
    findByYear(publicationYear: string): Promise<Book[]>;
    extractDetails(id: string): Promise<Partial<Book>>;
    findOne(id: string): Promise<Book>;
    addBook(createBookDto: CreateBookDto): Promise<{
        message: string;
    }>;
    updateBook(id: string, createBookDto: CreateBookDto): Promise<{
        message: string;
    }>;
    deleteBook(id: string): Promise<import("mongoose").Document<unknown, {}, Book> & Book & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    rateBook(id: string, rating: number): Promise<{
        averageRating: number;
    }>;
    checkDuplicates(book: Partial<Book>): Promise<{
        duplicates: Book[];
    }>;
    getRecentBooks(): Promise<Book[]>;
    verifyBook(id: string): Promise<any>;
}

import { Book } from './book.schema';
import { Model } from 'mongoose';
import { CreateBookDto } from './create-book.dto';
export declare class BookService {
    private bookModel;
    constructor(bookModel: Model<Book>);
    test(): string;
    findAll(): Promise<Book[]>;
    findOne(id: string): Promise<Book>;
    create(createBookDto: CreateBookDto): Promise<import("mongoose").Document<unknown, {}, Book> & Book & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, createBookDto: CreateBookDto): Promise<import("mongoose").Document<unknown, {}, Book> & Book & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    delete(id: string): Promise<import("mongoose").Document<unknown, {}, Book> & Book & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findByTitle(title: string): Promise<Book[]>;
    findByAuthor(author: string): Promise<Book[]>;
    findByJournal(journalName: string): Promise<Book[]>;
    findByYear(publicationYear: string): Promise<Book[]>;
    rateBook(id: string, rating: number): Promise<{
        averageRating: number;
    }>;
    checkDuplicates(book: Partial<Book>): Promise<Book[]>;
    getRecentBooks(): Promise<Book[]>;
    verifyBook(id: string): Promise<any>;
    getVerifiedBooks(): Promise<Book[]>;
    markDetailsAsExtracted(id: string, extractedDetails: Partial<Book>): Promise<Book>;
    extractDetails(id: string): Promise<Partial<Book>>;
}

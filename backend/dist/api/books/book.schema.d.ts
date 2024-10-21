import { HydratedDocument } from 'mongoose';
export type BookDocument = HydratedDocument<Book>;
export declare class Book {
    title: string;
    authors: string;
    journalName: string;
    publicationYear: string;
    volume: string;
    issueNumber: string;
    pages: string;
    doi: string;
    keywords: string;
    typeOfResearch: string;
    abstract: string;
    institution: string;
    published_date: Date;
    publisher: string;
    updated_date: Date;
    ratings: number[];
    averageRating: number;
    createdAt: Date;
    verified: boolean;
    detailsExtracted: boolean;
}
export declare const BookSchema: import("mongoose").Schema<Book, import("mongoose").Model<Book, any, any, any, import("mongoose").Document<unknown, any, Book> & Book & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Book, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Book>> & import("mongoose").FlatRecord<Book> & {
    _id: import("mongoose").Types.ObjectId;
}>;

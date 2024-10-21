import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './book.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookDto } from './create-book.dto';

@Injectable()
export class BookService {
    constructor(@InjectModel(Book.name) private bookModel: Model<Book>) { }

    test(): string {
        return 'book route testing';
    }

    async findAll(): Promise<Book[]> {
        return await this.bookModel.find().exec();
    }

    async findOne(id: string): Promise<Book> {
        return await this.bookModel.findById(id).exec();
    }

    async create(createBookDto: CreateBookDto) {
        return await this.bookModel.create(createBookDto);
    }

    async update(id: string, createBookDto: CreateBookDto) {
        return await this.bookModel.findByIdAndUpdate(id, createBookDto).exec();
    }

    async delete(id: string) {
        const deletedBook = await this.bookModel.findByIdAndDelete(id).exec();
        return deletedBook;
    }

    async findByTitle(title: string): Promise<Book[]> {
        return await this.bookModel.find({ title: { $regex: title, $options: 'i' } }).exec();
    }

    async findByAuthor(author: string): Promise<Book[]> {
        return await this.bookModel.find({ authors: { $regex: author, $options: 'i' } }).exec();
    }

    async findByJournal(journalName: string): Promise<Book[]> {
        return await this.bookModel.find({ journalName: { $regex: journalName, $options: 'i' } }).exec();
    }

    async findByYear(publicationYear: string): Promise<Book[]> {
        return await this.bookModel.find({ publicationYear: { $regex: publicationYear, $options: 'i' } }).exec();
    }

    async rateBook(id: string, rating: number): Promise<{ averageRating: number }> {
        const book = await this.bookModel.findById(id);
        if (!book) {
            throw new Error('Book not found');
        }
    
        book.ratings.push(rating);
        book.averageRating = book.ratings.reduce((sum, r) => sum + r, 0) / book.ratings.length;
    
        await book.save();
        return { averageRating: book.averageRating }; // Ensure you return the new average rating
    }

    async checkDuplicates(book: Partial<Book>): Promise<Book[]> {
        return this.bookModel.find({
            title: { $regex: new RegExp(book.title, 'i') },
            authors: { $regex: new RegExp(book.authors, 'i') },
            journalName: { $regex: new RegExp(book.journalName, 'i') }
        }).exec();
    }
    
    async getRecentBooks(): Promise<Book[]> {
        return this.bookModel.find()
          .sort({ createdAt: -1 })
          .limit(10)
          .exec();
    }

    async verifyBook(id: string): Promise<any> {
        const book = await this.bookModel.findById(id);
        if (!book) {
          throw new NotFoundException('Book not found');
        }
        book.verified = true;
        await book.save();
        return { message: 'Book verified successfully' };
    }

    async getVerifiedBooks(): Promise<Book[]> {
        return this.bookModel.find({ verified: true }).exec();
    }

    async markDetailsAsExtracted(id: string, extractedDetails: Partial<Book>): Promise<Book> {
        const book = await this.bookModel.findById(id);
        if (!book) {
            throw new NotFoundException('Book not found');
        }
        book.detailsExtracted = true;
        Object.assign(book, extractedDetails);
        await book.save();
        return book;
    }

    async extractDetails(id: string): Promise<Partial<Book>> {
        const book = await this.bookModel.findById(id);
        if (!book) {
            throw new NotFoundException('Book not found');
        }
        
        // Logic to extract required details
        const extractedDetails: Partial<Book> = {
            title: book.title,
            authors: book.authors,
            journalName: book.journalName,
            publicationYear: book.publicationYear,
            abstract: book.abstract,
            keywords: book.keywords,
        };
        
        return extractedDetails;
    }
}
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const common_1 = require("@nestjs/common");
const book_schema_1 = require("./book.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let BookService = class BookService {
    constructor(bookModel) {
        this.bookModel = bookModel;
    }
    test() {
        return 'book route testing';
    }
    async findAll() {
        return await this.bookModel.find().exec();
    }
    async findOne(id) {
        return await this.bookModel.findById(id).exec();
    }
    async create(createBookDto) {
        return await this.bookModel.create(createBookDto);
    }
    async update(id, createBookDto) {
        return await this.bookModel.findByIdAndUpdate(id, createBookDto).exec();
    }
    async delete(id) {
        const deletedBook = await this.bookModel.findByIdAndDelete(id).exec();
        return deletedBook;
    }
    async findByTitle(title) {
        return await this.bookModel.find({ title: { $regex: title, $options: 'i' } }).exec();
    }
    async findByAuthor(author) {
        return await this.bookModel.find({ authors: { $regex: author, $options: 'i' } }).exec();
    }
    async findByJournal(journalName) {
        return await this.bookModel.find({ journalName: { $regex: journalName, $options: 'i' } }).exec();
    }
    async findByYear(publicationYear) {
        return await this.bookModel.find({ publicationYear: { $regex: publicationYear, $options: 'i' } }).exec();
    }
    async rateBook(id, rating) {
        const book = await this.bookModel.findById(id);
        if (!book) {
            throw new Error('Book not found');
        }
        book.ratings.push(rating);
        book.averageRating = book.ratings.reduce((sum, r) => sum + r, 0) / book.ratings.length;
        await book.save();
        return { averageRating: book.averageRating };
    }
    async checkDuplicates(book) {
        return this.bookModel.find({
            title: { $regex: new RegExp(book.title, 'i') },
            authors: { $regex: new RegExp(book.authors, 'i') },
            journalName: { $regex: new RegExp(book.journalName, 'i') }
        }).exec();
    }
    async getRecentBooks() {
        return this.bookModel.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .exec();
    }
    async verifyBook(id) {
        const book = await this.bookModel.findById(id);
        if (!book) {
            throw new common_1.NotFoundException('Book not found');
        }
        book.verified = true;
        await book.save();
        return { message: 'Book verified successfully' };
    }
    async getVerifiedBooks() {
        return this.bookModel.find({ verified: true }).exec();
    }
    async markDetailsAsExtracted(id, extractedDetails) {
        const book = await this.bookModel.findById(id);
        if (!book) {
            throw new common_1.NotFoundException('Book not found');
        }
        book.detailsExtracted = true;
        Object.assign(book, extractedDetails);
        await book.save();
        return book;
    }
    async extractDetails(id) {
        const book = await this.bookModel.findById(id);
        if (!book) {
            throw new common_1.NotFoundException('Book not found');
        }
        const extractedDetails = {
            title: book.title,
            authors: book.authors,
            journalName: book.journalName,
            publicationYear: book.publicationYear,
            abstract: book.abstract,
            keywords: book.keywords,
        };
        return extractedDetails;
    }
};
exports.BookService = BookService;
exports.BookService = BookService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(book_schema_1.Book.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BookService);
//# sourceMappingURL=book.service.js.map
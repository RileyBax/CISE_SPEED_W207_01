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
exports.BookController = void 0;
const common_1 = require("@nestjs/common");
const book_service_1 = require("./book.service");
const create_book_dto_1 = require("./create-book.dto");
const console_1 = require("console");
let BookController = class BookController {
    constructor(bookService) {
        this.bookService = bookService;
    }
    test() {
        return this.bookService.test();
    }
    async findAll() {
        try {
            return this.bookService.findAll();
        }
        catch {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: 'No Books found',
            }, common_1.HttpStatus.NOT_FOUND, { cause: console_1.error });
        }
    }
    async getVerifiedBooks() {
        return this.bookService.getVerifiedBooks();
    }
    async findByTitle(title) {
        try {
            const books = await this.bookService.findByTitle(title);
            if (books.length === 0) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    error: `No books found with title: ${title}`,
                }, common_1.HttpStatus.NOT_FOUND);
            }
            return books;
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error occurred while fetching books by title',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findByAuthor(author) {
        try {
            const books = await this.bookService.findByAuthor(author);
            if (books.length === 0) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    error: `No books found with author: ${author}`,
                }, common_1.HttpStatus.NOT_FOUND);
            }
            return books;
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error occurred while fetching books by author',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findByJournal(journal) {
        try {
            const books = await this.bookService.findByJournal(journal);
            if (books.length === 0) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    error: `No books found with journal: ${journal}`,
                }, common_1.HttpStatus.NOT_FOUND);
            }
            return books;
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error occurred while fetching books by journal',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findByYear(publicationYear) {
        try {
            const books = await this.bookService.findByYear(publicationYear);
            if (books.length === 0) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    error: `No books found with publicationYear: ${publicationYear}`,
                }, common_1.HttpStatus.NOT_FOUND);
            }
            return books;
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error occurred while fetching books by publicationYear',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async extractDetails(id) {
        try {
            const bookDetails = await this.bookService.extractDetails(id);
            return bookDetails;
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: `No detailed information found for book with id: ${id}`,
            }, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async findOne(id) {
        try {
            return this.bookService.findOne(id);
        }
        catch {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: 'No Book found',
            }, common_1.HttpStatus.NOT_FOUND, { cause: console_1.error });
        }
    }
    async addBook(createBookDto) {
        try {
            await this.bookService.create(createBookDto);
            return { message: 'Book added successfully' };
        }
        catch {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: 'Unable to add this book',
            }, common_1.HttpStatus.BAD_REQUEST, { cause: console_1.error });
        }
    }
    async updateBook(id, createBookDto) {
        try {
            await this.bookService.update(id, createBookDto);
            return { message: 'Book updated successfully' };
        }
        catch {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: 'Unable to update this book',
            }, common_1.HttpStatus.BAD_REQUEST, { cause: console_1.error });
        }
    }
    async deleteBook(id) {
        try {
            return await this.bookService.delete(id);
        }
        catch {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: 'No such a book',
            }, common_1.HttpStatus.NOT_FOUND, { cause: console_1.error });
        }
    }
    async rateBook(id, rating) {
        return this.bookService.rateBook(id, rating);
    }
    async checkDuplicates(book) {
        try {
            const duplicates = await this.bookService.checkDuplicates(book);
            return { duplicates };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error occurred while checking for duplicates',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getRecentBooks() {
        try {
            const recentBooks = await this.bookService.getRecentBooks();
            return recentBooks;
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error occurred while fetching recent books',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async verifyBook(id) {
        return this.bookService.verifyBook(id);
    }
};
exports.BookController = BookController;
__decorate([
    (0, common_1.Get)('/test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BookController.prototype, "test", null);
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('verified'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookController.prototype, "getVerifiedBooks", null);
__decorate([
    (0, common_1.Get)('/title/:title'),
    __param(0, (0, common_1.Param)('title')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "findByTitle", null);
__decorate([
    (0, common_1.Get)('/authors/:authors'),
    __param(0, (0, common_1.Param)('authors')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "findByAuthor", null);
__decorate([
    (0, common_1.Get)('/journalName/:journalName'),
    __param(0, (0, common_1.Param)('journalName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "findByJournal", null);
__decorate([
    (0, common_1.Get)('/publicationYear/:publicationYear'),
    __param(0, (0, common_1.Param)('publicationYear')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "findByYear", null);
__decorate([
    (0, common_1.Get)('/:id/details'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "extractDetails", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_book_dto_1.CreateBookDto]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "addBook", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_book_dto_1.CreateBookDto]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "updateBook", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "deleteBook", null);
__decorate([
    (0, common_1.Post)(':id/rate'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('rating')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "rateBook", null);
__decorate([
    (0, common_1.Post)('check-duplicates'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "checkDuplicates", null);
__decorate([
    (0, common_1.Get)('recent'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookController.prototype, "getRecentBooks", null);
__decorate([
    (0, common_1.Post)(':id/verify'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "verifyBook", null);
exports.BookController = BookController = __decorate([
    (0, common_1.Controller)('api/books'),
    __metadata("design:paramtypes", [book_service_1.BookService])
], BookController);
//# sourceMappingURL=book.controller.js.map
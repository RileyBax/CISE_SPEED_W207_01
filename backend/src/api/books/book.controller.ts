import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './create-book.dto';
import { error } from 'console';
import { Book } from './book.schema';

@Controller('api/books')
export class BookController {
    constructor(private readonly bookService: BookService) { }

    @Get('/test')
    test() {
        return this.bookService.test();
    }

    // Get all books
    @Get('/')
    async findAll() {
        try {
            return this.bookService.findAll();
        } catch {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: 'No Books found',
                },
                HttpStatus.NOT_FOUND,
                { cause: error },
            );
        }
    }

    @Get('verified')
    async getVerifiedBooks() {
        return this.bookService.getVerifiedBooks();
    }

    // Get a book by title
    @Get('/title/:title')
    async findByTitle(@Param('title') title: string) {
        try {
            const books = await this.bookService.findByTitle(title);
            if (books.length === 0) {
                throw new HttpException(
                    {
                        status: HttpStatus.NOT_FOUND,
                        error: `No books found with title: ${title}`,
                    },
                    HttpStatus.NOT_FOUND,
                );
            }
            return books;
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error occurred while fetching books by title',
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    // Get a book by author
    @Get('/authors/:authors')
    async findByAuthor(@Param('authors') author: string) {
        try {
            const books = await this.bookService.findByAuthor(author);
            if (books.length === 0) {
                throw new HttpException(
                    {
                        status: HttpStatus.NOT_FOUND,
                        error: `No books found with author: ${author}`,
                    },
                    HttpStatus.NOT_FOUND,
                );
            }
            return books;
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error occurred while fetching books by author',
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    // Get a book by journal
    @Get('/journalName/:journalName')
    async findByJournal(@Param('journalName') journal: string) {
        try {
            const books = await this.bookService.findByJournal(journal);
            if (books.length === 0) {
                throw new HttpException(
                    {
                        status: HttpStatus.NOT_FOUND,
                        error: `No books found with journal: ${journal}`,
                    },
                    HttpStatus.NOT_FOUND,
                );
            }
            return books;
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error occurred while fetching books by journal',
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    // Get a book by year
    @Get('/publicationYear/:publicationYear')
    async findByYear(@Param('publicationYear') publicationYear: string) {
        try {
            const books = await this.bookService.findByYear(publicationYear);
            if (books.length === 0) {
                throw new HttpException(
                    {
                        status: HttpStatus.NOT_FOUND,
                        error: `No books found with publicationYear: ${publicationYear}`,
                    },
                    HttpStatus.NOT_FOUND,
                );
            }
            return books;
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error occurred while fetching books by publicationYear',
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    // Get detailed information of a book by ID
    @Get('/:id/details')
    async extractDetails(@Param('id') id: string) {
        try {
            const bookDetails = await this.bookService.extractDetails(id);
            return bookDetails;
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: `No detailed information found for book with id: ${id}`,
                },
                HttpStatus.NOT_FOUND,
            );
        }
    }

    // Get one book via id
    @Get('/:id')
    async findOne(@Param('id') id: string) {
        try {
            return this.bookService.findOne(id);
        } catch {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: 'No Book found',
                },
                HttpStatus.NOT_FOUND,
                { cause: error },
            );
        }
    }

    // Create/add a book
    @Post('/')
    async addBook(@Body() createBookDto: CreateBookDto) {
        try {
            await this.bookService.create(createBookDto);
            return { message: 'Book added successfully' };
        } catch {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: 'Unable to add this book',
                },
                HttpStatus.BAD_REQUEST,
                { cause: error },
            );
        }
    }

    // Update a book
    @Put('/:id')
    async updateBook(
        @Param('id') id: string,
        @Body() createBookDto: CreateBookDto,
    ) {
        try {
            await this.bookService.update(id, createBookDto);
            return { message: 'Book updated successfully' };
        } catch {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: 'Unable to update this book',
                },
                HttpStatus.BAD_REQUEST,
                { cause: error },
            );
        }
    }

    // Delete a book via id
    @Delete('/:id')
    async deleteBook(@Param('id') id: string) {
        try {
            return await this.bookService.delete(id);
        } catch {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: 'No such a book',
                },
                HttpStatus.NOT_FOUND,
                { cause: error },
            );
        }
    }

    @Post(':id/rate')
    async rateBook(
        @Param('id') id: string,
        @Body('rating') rating: number,
    ): Promise<{ averageRating: number }> {
        return this.bookService.rateBook(id, rating);
    }

    @Post('check-duplicates')
    async checkDuplicates(@Body() book: Partial<Book>) {
        try {
            const duplicates = await this.bookService.checkDuplicates(book);
            return { duplicates };
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error occurred while checking for duplicates',
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Get('recent')
    async getRecentBooks() {
        try {
            const recentBooks = await this.bookService.getRecentBooks();
            return recentBooks;
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error occurred while fetching recent books',
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Post(':id/verify')
    async verifyBook(@Param('id') id: string) {
        return this.bookService.verifyBook(id);
    }
}
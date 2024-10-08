'use client';
import React, { useState, useEffect } from 'react';
import { Book } from './Books';
import BookCard from './BookCard';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type SubmittedBook = Book & { isDuplicate?: boolean; _id: string; verified?: boolean };

const SubmissionForm = () => {
    const [submittedBooks, setSubmittedBooks] = useState<SubmittedBook[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<SubmittedBook[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<'all' | 'duplicates' | 'unique'>('all');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useRouter();

    useEffect(() => {
        fetchBooks();
    }, []);

    useEffect(() => {
        filterBooks();
    }, [submittedBooks, filter]);

    const fetchBooks = async () => {
        setIsLoading(true);
        try {
            const endpoint = process.env.NEXT_PUBLIC_URL + 'api/books';
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }
            const data = await response.json();
            const uniqueBooks = getUniqueBooks(data);
            setSubmittedBooks(uniqueBooks);
            setFilteredBooks(uniqueBooks);
        } catch (err) {
            setError('An error occurred while fetching books.');
        } finally {
            setIsLoading(false);
        }
    };

    const generateBookKey = (book: Book) => {
        return `${book.title}-${book.authors}-${book.journalName}`;
    };

    const getUniqueBooks = (books: Book[]): SubmittedBook[] => {
        const uniqueKeys = new Set();
        return books.map(book => {
            const key = generateBookKey(book);
            const isDuplicate = uniqueKeys.has(key);
            uniqueKeys.add(key);
            return { ...book, isDuplicate, _id: book._id as string, verified: book.verified };
        });
    };

    const filterBooks = () => {
        if (filter === 'duplicates') {
            setFilteredBooks(submittedBooks.filter(book => book.isDuplicate));
        } else if (filter === 'unique') {
            setFilteredBooks(submittedBooks.filter(book => !book.isDuplicate));
        } else {
            setFilteredBooks(submittedBooks);
        }
    };

    const verifyBook = async (bookId: string) => {
        if (!bookId) {
            console.error('Cannot verify, ID is undefined');
            return;
        }
    
        setIsLoading(true);
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_URL + `api/books/${bookId}/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to verify book');
            }
    
            // Update the local state
            setSubmittedBooks(prevBooks => 
                prevBooks.map(book => 
                    book._id === bookId ? { ...book, verified: true } : book
                )
            );
            setFilteredBooks(prevBooks => 
                prevBooks.map(book => 
                    book._id === bookId ? { ...book, verified: true } : book
                )
            );

            alert('Book verified successfully');
        } catch (error) {
            console.error('Error verifying book:', error);
            setError(`Failed to verify book: ${error instanceof Error ? error.message : String(error)}`);
        } finally {
            setIsLoading(false);
        }
    };

    const onDeleteClick = async (bookId: string) => {
        if (!bookId) {
            console.error('Cannot delete, ID is undefined');
            return;
        }

        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_URL + `api/books/${bookId}`, { method: 'DELETE' });
                if (!response.ok) {
                    throw new Error('Failed to delete book');
                }
                setSubmittedBooks(submittedBooks.filter(book => book._id !== bookId));
                setFilteredBooks(filteredBooks.filter(book => book._id !== bookId));
            } catch (err) {
                console.error('Error deleting book:', err);
                setError('Failed to delete book. Please try again.');
            }
        }
    };

    return (
        <div className="submissionForm">
            {isLoading && <div className="loading">Loading...</div>}
            <div className="header mb-4">
                <h1 className="title text-3xl">All Submitted Articles</h1>
            </div>

            <div className="filterDropdown mb-4">
                <label htmlFor="filter" className="mr-2">Filter:</label>
                <select
                    id="filter"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as 'all' | 'duplicates' | 'unique')}
                    className="form-select"
                >
                    <option value="all">All Articles</option>
                    <option value="duplicates">Duplicates</option>
                    <option value="unique">Unique</option>
                </select>
            </div>

            {error && (
                <div className="error-alert mb-4" onClick={() => setError(null)}>
                    {error}
                    <span className="close-btn">&times;</span>
                </div>
            )}

            <div className="bookGrid">
                {filteredBooks.map((book, index) => (
                    <div key={index} className="bookEntry border p-3 relative">
                        <BookCard book={book} />
                        <span className={book.isDuplicate ? "duplicateIndicator absolute top-2 right-2" : "uniqueIndicator absolute top-2 right-2"}>
                            {book.isDuplicate ? '❌ Duplicate' : '✅ Unique'}
                        </span>
                        <div className="actionButtons mt-2">
                            {!book.isDuplicate && (
                                book.verified ? (
                                    <span className="text-green-600 font-bold bg-green-100 px-2 py-1 rounded">Verified</span>
                                ) : (
                                    <button
                                        className="btn btn-primary mr-2"
                                        onClick={() => verifyBook(book._id)}
                                    >
                                        Verify
                                    </button>
                                )
                            )}
                            {book.isDuplicate && (
                                <button
                                    className="btn btn-danger"
                                    onClick={() => onDeleteClick(book._id)}
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SubmissionForm;
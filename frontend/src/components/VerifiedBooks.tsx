// components/VerifiedBooks.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Book } from './Books';  // Assuming you have a Book type
import Link from 'next/link';

const VerifiedBooks = () => {
    const [verifiedBooks, setVerifiedBooks] = useState<Book[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchVerifiedBooks = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_URL + 'api/books');
            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }
            const data = await response.json();
            const verifiedBooks = data.filter((book: Book) => book.verified);
            setVerifiedBooks(verifiedBooks);
        } catch (err) {
            console.error('Error fetching verified books:', err);
            setError('An error occurred while fetching verified books. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchVerifiedBooks();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <Link href="/moderator-page" className="linkButton">
                    Moderator Dashboard
                </Link>
                <h1 className="text-3xl font-bold">Verified Articles</h1>
                <button onClick={fetchVerifiedBooks} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                    Refresh
                </button>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">Error:</strong>
                    <span className="block sm:inline"> {error}</span>
                </div>
            )}

            {isLoading ? (
                <div className="text-center py-8">Loading verified books...</div>
            ) : verifiedBooks.length > 0 ? (
                <ul className="space-y-4">
                    {verifiedBooks.map((book) => (
                        <li key={book._id} className="border p-4 rounded-lg bg-white shadow-sm">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-bold">{book.title}</h2>
                                    <p className="text-gray-600">Author: {book.authors}</p>
                                    <p className="text-gray-600">Journal: {book.journalName}</p>
                                </div>
                                <span className="text-green-600 font-bold bg-green-100 px-3 py-1 rounded">
                                    Verified
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-center py-8">
                    <p className="text-xl font-semibold">No verified books available at the moment.</p>
                    <p className="mt-2">Books will appear here once they have been verified by a moderator.</p>
                </div>
            )}
        </div>
    );
};

export default VerifiedBooks;
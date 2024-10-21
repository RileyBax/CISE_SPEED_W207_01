'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Book, DefaultEmptyBook } from './Books';
import Link from 'next/link';
import StarRating from './StarRating';

function ShowBookDetails() {
    const [book, setBook] = useState<Book>(DefaultEmptyBook);
    const [averageRating, setAverageRating] = useState<number | null>(null);
    const [userRating, setUserRating] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [ratingMessage, setRatingMessage] = useState<string>('');
    const { id } = useParams<{ id: string }>() || {};
    const navigate = useRouter();

    useEffect(() => {
        setIsLoading(true);
        fetch(process.env.NEXT_PUBLIC_URL + `api/books/${id}/details`) // Update the route here to match the backend
            .then((res) => res.json())
            .then((json) => {
                setBook(json);
                const avgRating = json.averageRating != null ? Number(json.averageRating) : null;
                setAverageRating(avgRating);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log('Error from ShowBookDetails: ' + err);
                setError('Failed to load book details. Please try again later.');
                setIsLoading(false);
            });
    }, [id]);    

    const handleRating = async (newRating: number) => {
        setUserRating(newRating);
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_URL + `api/books/${id}/rate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rating: newRating }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to submit rating');
            }

            const data = await response.json();
            if (data.averageRating !== undefined) {
                setAverageRating(data.averageRating); // Update average rating from response
            } else {
                throw new Error('Average rating not provided in response');
            }

            setRatingMessage('Thanks for rating!');
            setTimeout(() => setRatingMessage(''), 3000);
        } catch (error) {
            console.error('Error submitting rating:', error);
            setRatingMessage('Error saving rating. Please try again.');
        }
    };

    const onDeleteClick = (id: string) => {
        fetch(process.env.NEXT_PUBLIC_URL + `api/books/${id}`, { method: 'DELETE' })
            .then(() => {
                navigate.push('/');
            })
            .catch((err) => {
                console.log('Error from ShowBookDetails_deleteClick: ' + err);
            });
    };

    return (
        <div className="container mx-auto p-4">
            <Link href="/" className="linkButton">
                Return
            </Link>
            <div className="text-center mb-4">
                <h1 className="text-3xl font-bold">Article&apos;s Record</h1>
                <p className="lead">View Article&apos;s Info</p>
                <hr />
            </div>

            {error && (
                <div className="alert alert-danger">{error}</div>
            )}
            {isLoading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <div className="border p-4 rounded-lg shadow-md mb-4 bg-white">
                    <ul className="space-y-4">
                        <li className="flex justify-between">
                            <span className="font-semibold">Title:</span>
                            <span>{book.title}</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="font-semibold">Authors:</span>
                            <span>{book.authors}</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="font-semibold">Journal Name:</span>
                            <span>{book.journalName}</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="font-semibold">DOI:</span>
                            <span>{book.doi}</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="font-semibold">Publication Year:</span>
                            <span>{book.publicationYear}</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="font-semibold">Volume:</span>
                            <span>{book.volume}</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="font-semibold">Issue Number:</span>
                            <span>{book.issueNumber}</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="font-semibold">Pages:</span>
                            <span>{book.pages}</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="font-semibold">Keywords:</span>
                            <span>{book.keywords}</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="font-semibold">Abstract:</span>
                            <span>{book.abstract}</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="font-semibold">Institution/Organization:</span>
                            <span>{book.institution}</span>
                        </li>
                    </ul>
                </div>
            )}

            {/* Edit and Delete Buttons Section */}
            <div className="flex justify-center mb-4">
                <Link href={`/edit-book/${book._id}`} className="btn btn-outline-info btn-lg mr-4">
                    Edit Article
                </Link>
                <button
                    type="button"
                    className="btn btn-outline-danger btn-lg"
                    onClick={() => {
                        onDeleteClick(book._id || '');
                    }}
                >
                    Delete Article
                </button>
            </div>

            {/* Rating Component Section */}
            <div className="mb-4">
                <h3 className="text-center text-2xl mb-3">Rate this Article</h3>
                <div className="flex justify-center">
                    <StarRating
                        value={userRating || 0}
                        onChange={handleRating}
                        size={36}
                    />
                </div>
                <p className="text-center mt-2">
                    Your Rating: {userRating !== null ? userRating : 'Not rated yet'}
                </p>
                <p className="text-center mt-2">
                    Average Rating: {averageRating !== null && averageRating !== undefined 
                        ? Number(averageRating).toFixed(1) 
                        : 'Not rated yet'}
                </p>
                {ratingMessage && <p className="text-center mt-2">{ratingMessage}</p>}
            </div>
        </div>
    );
}

export default ShowBookDetails;
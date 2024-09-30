import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import Link from 'next/link';
import BookCard from './BookCard';
import { Book } from './Books';

function ShowBookList() {
    const [books, setBooks] = useState<Book[]>([]);
    const [input, setInput] = useState('');

    // Handle input changes
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    // Handle search form submission
    const onSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetch(`http://localhost:8082/api/books/title/${input}`)
            .then((res) => {
                if (!res.ok) {
                    fetchAllBooks();
                    throw new Error("Response empty");
                }
                return res.json();
            })
            .then((books) => {
                setBooks(books);
            })
            .catch((err) => {
                console.log('Error from ShowBookList: ' + err);
            });
    };

    // Fetch all books
    const fetchAllBooks = () => {
        fetch('http://localhost:8082/api/books')
            .then((res) => res.json())
            .then((books) => setBooks(books))
            .catch((err) => {
                console.error('Error fetching all books: ', err);
            });
    };

    // Fetch books on initial render
    useEffect(() => {
        fetchAllBooks();
    }, []);

    return (
        <div className='showBookList'>
            <div className='container'>
                <div className='header'>
                    <h1 className='title'>Books List</h1>
                    <div className='buttonGroup'>
                        <Link href='/submission-form' className='linkButton'>
                            Submission
                        </Link>
                        <Link href='/create-book' className='linkButton'>
                            + Add New Book
                        </Link>
                    </div>
                </div>
                <form className='searchForm' noValidate onSubmit={onSearch}>
                    <input
                        type="text"
                        placeholder="Book Title"
                        name="title"
                        className='searchInput'
                        required
                        onChange={onChange}
                    />
                    <button className='searchButton' type='submit'>
                        Search
                    </button>
                </form>
                <div className='bookGrid'>
                    {books.length === 0 ? (
                        <p className="no-books">There are no book records!</p>
                    ) : (
                        books.map((book, k) => <BookCard book={book} key={k} />)
                    )}
                </div>
            </div>
            <table 
            className="table table-hover table-dark table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope = "col">Title</th>
                            <th scope = "col">Author</th>
                            <th scope = "col">Journal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookList}
                    </tbody>
                </table>
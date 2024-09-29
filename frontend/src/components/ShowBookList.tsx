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

    const bookList = 
        books.length === 0 
            ? 'There are no book records!' 
            : books.map((book, k) => <BookCard book={book} key={k} />);

    return (
        <div className='ShowBookList'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <br />
                        <h2 className='display-4 text-center'>Books List</h2>
                    </div>
                    <div className='col-md-11'>
                        <Link href='/submission-form' className='btn btn-outline-warning float-right'>
                            Submission
                        </Link>
                        <Link href='/create-book' className='btn btn-outline-warning float-right' style={{ marginRight: '10px' }}>
                            + Add New Book
                        </Link>
                        <form noValidate onSubmit={onSearch}>
                            <button className='btn btn-outline-warning float-left' type='submit'>
                                Search
                            </button>
                            <input
                                type="text"
                                placeholder="Book Title"
                                name="title"
                                className='form-control'
                                required
                                onChange={onChange}
                            />
                        </form>
                        <br />
                        <br />
                        <hr />
                    </div>
                </div>
                <div className='list'>{bookList}</div>
            </div>
        </div>
    );
}

export default ShowBookList;

import React, { useRef, ChangeEvent, FormEvent, useState, useEffect } from 'react';
import Link from 'next/link';
import BookCard from './BookCard';
import { Book } from './Books';
import { Input } from 'postcss';
function ShowBookList() {
    const [books, setBooks] = useState<[Book?]>([]);
    var input = '';
    const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        input = event.target.value;
    };
    const onSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetch("http://localhost:8082/api/books/title/" + input)
        .then((res) => {
            if(!res.ok) {
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
    useEffect(() => {
        fetchAllBooks();
    }, []);
    const bookList =
        books.length === 0
            ? 'there is no book record!'
            : books.map((book, k) => <BookCard
                book={book}
                key={k} />);
    return (<div
        className='ShowBookList'>
        <div
            className='container'>
            <div
                className='row'>
                <div
                    className='col-md-12'>
                    <br />
                    <h2
                        className='display-4 text-center'>Books List</h2>
                </div>
                <div
                    className='col-md-11'>
                    <Link
                        href='/create-book'
                        className='btn btn-outline-warning float-right'
                    >
                        + Add New Book
                    </Link>

                    <form noValidate onSubmit={onSearch}>
                        <button
                            className='btn btn-outline-warning float-left'
                            type='submit'
                        >
                            Search
                        </button>
                        <input
                            type="text"
                            placeholder="Article Name"
                            name="title"
                            className='form-control'
                            required
                            onChange={onChange}>

                        </input>
                    </form>
                    <br />
                    <br />
                    <hr />
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
        </div>
    </div>
    );
}
export default ShowBookList;
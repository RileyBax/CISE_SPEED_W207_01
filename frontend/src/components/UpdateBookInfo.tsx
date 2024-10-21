import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Book, DefaultEmptyBook } from './Books';
import Link from 'next/link';

function UpdateBookInfo() {
    const [book, setBook] = useState<Book>(DefaultEmptyBook);
    const { id } = useParams<{ id: string }>() || {};
    const router = useRouter();

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_URL + `api/books/${id}`)
            .then((res) => res.json())
            .then((json) => {
                setBook(json);
            })
            .catch((err) => {
                console.log('Error from UpdateBookInfo: ' + err);
            });
    }, [id]);

    const inputOnChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setBook({ ...book, [event.target.name]: event.target.value });
    };

    const textAreaOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setBook({ ...book, [event.target.name]: event.target.value });
    };

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetch(process.env.NEXT_PUBLIC_URL + `api/books/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(book),
        })
            .then(() => {
                router.push(`/show-book/${id}`);
            })
            .catch((err) => {
                console.log('Error from UpdateBookInfo: ' + err);
            });
    };

    return (
        <div className="UpdateBookInfo">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <br />
                        <Link href="/" className="btn btn-outline-warning float-left">
                            Show Article List
                        </Link>
                    </div>
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Edit Article</h1>
                        <p className="lead text-center">Update Article&apos;s Info</p>
                    </div>
                </div>
                <div className="col-md-8 m-auto">
                    <form noValidate onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                placeholder="Title of the Book"
                                name="title"
                                className="form-control"
                                value={book.title}
                                onChange={inputOnChange}
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="authors">Authors</label>
                            <input
                                type="text"
                                placeholder="Authors"
                                name="authors"
                                className="form-control"
                                value={book.authors}
                                onChange={inputOnChange}
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="journalName">Journal Name</label>
                            <input
                                type="text"
                                placeholder="Journal Name"
                                name="journalName"
                                className="form-control"
                                value={book.journalName}
                                onChange={inputOnChange}
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="doi">DOI</label>
                            <input
                                type="text"
                                placeholder="DOI"
                                name="doi"
                                className="form-control"
                                value={book.doi}
                                onChange={inputOnChange}
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="publicationYear">Publication Year</label>
                            <input
                                type="number"
                                placeholder="Publication Year"
                                name="publicationYear"
                                className="form-control"
                                value={book.publicationYear}
                                onChange={inputOnChange}
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="volume">Volume</label>
                            <input
                                type="text"
                                placeholder="Volume (Optional)"
                                name="volume"
                                className="form-control"
                                value={book.volume}
                                onChange={inputOnChange}
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="issueNumber">Issue Number</label>
                            <input
                                type="text"
                                placeholder="Issue Number (Optional)"
                                name="issueNumber"
                                className="form-control"
                                value={book.issueNumber}
                                onChange={inputOnChange}
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="pages">Pages</label>
                            <input
                                type="text"
                                placeholder="Pages (Optional)"
                                name="pages"
                                className="form-control"
                                value={book.pages}
                                onChange={inputOnChange}
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="keywords">Keywords</label>
                            <textarea
                                placeholder="Keywords (Optional)"
                                name="keywords"
                                className="form-control"
                                value={book.keywords}
                                onChange={textAreaOnChange}
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="abstract">Abstract</label>
                            <textarea
                                placeholder="Abstract (Optional)"
                                name="abstract"
                                className="form-control"
                                value={book.abstract}
                                onChange={textAreaOnChange}
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="institution">Institution/Organization</label>
                            <input
                                type="text"
                                placeholder="Institution/Organization (Optional)"
                                name="institution"
                                className="form-control"
                                value={book.institution}
                                onChange={inputOnChange}
                            />
                        </div>
                        <br />
                        <button type="submit" className="btn btn-outline-info btn-lg btn-block">
                            Update Article
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateBookInfo;
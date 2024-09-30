import React from 'react';
import { Book } from './Books';
import { useRouter } from 'next/navigation';

interface IProp {
    book?: Book;
}

const BookCard = ({ book }: IProp) => {
    const router = useRouter();

    if (!book) {
        return null;
    }

    const onClick = () => {
        router.push(`/show-book/${book._id}`);
    };

    return (
        <tr onClick={onClick}>
                <th scope = "row">{book.title}</th>
                <td>{book.authors}</td> 
                <td>{book.journalName}</td> 
        </tr>
    );
};

export default BookCard;

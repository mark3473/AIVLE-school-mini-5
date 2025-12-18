import React from 'react';

function BookCard({ book, onClick }) {
    if (!book) return null;

    const handleCardClick = () => {
        if (onClick) onClick(book);
    };

    return (
        <div
            className="book-card"
            onClick={handleCardClick}
        >
            <div className="book-cover">
                <img
                    src={book.coverImg || "/images/default-book.png"}
                    alt="book cover"
                />
            </div>

            <div className="book-info">
                <h3>{book.title || "제목 없음"}</h3>
                <p className="author">저자: {book.author || "정보 없음"}</p>
                <p className="publisher">출판사: {book.publisher || "정보 없음"}</p>
                <p className="genre">장르: {book.genre || "정보 없음"}</p>
            </div>
        </div>
    );
}

export default BookCard;
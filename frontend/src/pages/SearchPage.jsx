import React, { useState } from "react";
import BookCard from "../components/BookCard";
import "./SearchPage.css";

function SearchPage({books = [], setBooks}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searched, setSearched] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();

        if (!searchTerm.trim()) {
            alert("검색어를 입력하세요.");
            return;
        }

        setSearched(true);

        // books가 배열인지 체크
        const results = Array.isArray(books)
            ? books.filter(
                (book) =>
                    (book.title && book.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (book.author && book.author.toLowerCase().includes(searchTerm.toLowerCase()))
            )
            : [];

        setSearchResults(results);
    };

    return (
        <div className="search-page">
            <div className="search-header">
                <h1>📚 도서 검색</h1>
                <p className="search-description">원하시는 도서를 검색해보세요</p>
            </div>

            <form onSubmit={handleSearch} className="search-form">
                <div className="search-input-wrapper">
                    <input
                        type="text"
                        placeholder="도서명 또는 저자명을 입력하세요"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <button type="submit" className="btn-search">
                        🔍 검색
                    </button>
                </div>
            </form>

            {searched && (
                <div className="search-results">
                    <h2 className="results-title">
                        검색 결과{" "}
                        <span className="result-count">({searchResults.length}건)</span>
                    </h2>

                    {searchResults.length === 0 ? (
                        <div className="no-results">
                            <p>검색 결과가 없습니다.</p>
                            <p className="no-results-subtitle">
                                다른 검색어로 다시 시도해보세요.
                            </p>
                        </div>
                    ) : (
                        <div className="book-grid">
                            {searchResults.map((book) => (
                                <BookCard
                                    key={book.id || book.isbn}
                                    book={book}
                                    setBooks={setBooks} // 삭제/수정 가능
                                    onClick={() => console.log("Book clicked:", book.id)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default SearchPage;
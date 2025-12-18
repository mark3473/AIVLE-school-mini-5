import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import NewBookPage from './pages/NewBookPage';
import EditBookPage from './pages/EditBookPage';
import BookDetailPage from './pages/BookDetailPage';
import BookListPage from './pages/BookListPage';
import SearchPage from './pages/SearchPage';
import Layout from './components/Layout';
import ChangePasswordPage from "./pages/ChangePasswordPage.jsx";
import axios from 'axios';

function App() {
    const [books, setBooks] = useState([]);

    const fetchBooks = () => {
        axios.get('/api/books').then(res => setBooks(res.data));
    };

    const addNewBook = (newBook) => {
        setBooks(prevBooks => [...prevBooks, { ...newBook, id: prevBooks.length + 1 }]);
    };

    return (
        <Router>
            <Routes>
                {/* 로그인, 메인 페이지는 레이아웃 없이 렌더링 */}
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />

                {/* 사이드바와 헤더가 포함된 레이아웃 */}
                <Route element={<Layout />}>
                    <Route path="/books" element={<BookListPage books={books} setBooks={setBooks} fetchBooks={fetchBooks} />} />
                    <Route path="/search" element={<SearchPage books={books} setBooks={setBooks} />} />
                    <Route path="/new-book" element={<NewBookPage addNewBook={addNewBook} />} />
                    <Route path="/book/:id" element={<BookDetailPage books={books} />} />
                    
                    {/* ▼▼▼ [수정된 부분] 아래 두 줄이 모두 있어야 합니다 ▼▼▼ */}
                    
                    {/* 1. 사이드바에서 '도서 수정' 눌렀을 때 (목록 나옴) */}
                    <Route path="/edit-book" element={<EditBookPage books={books} setBooks={setBooks} />} />
                    
                    {/* 2. 목록에서 '수정하기' 버튼 눌렀을 때 (수정 폼 나옴) */}
                    <Route path="/edit-book/:id" element={<EditBookPage books={books} setBooks={setBooks} />} />

                    {/*비밀번호 변경*/}
                    <Route path="/change-password" element={<ChangePasswordPage />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
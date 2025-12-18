import axios from 'axios';

const API_BASE = '/api/books';

export const fetchBooks = async (searchTerm = '') => {
    try {
        const response = await axios.get(API_BASE);
        let books = response.data.books || []; // 서버가 { books: [...] } 형태라면 이렇게 접근
        if (searchTerm) {
            books = books.filter(b =>
                b.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return books;
    } catch (error) {
        console.error('도서 목록 조회 에러:', error);
        return [];
    }
};

export const fetchBookById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE}/${id}`);
        return response.data;
    } catch (error) {
        console.error('도서 상세 조회 에러:', error);
        return null;
    }
};

export const createBook = async (bookData) => {
    try {
        const response = await axios.post(API_BASE, bookData);
        return response.data;
    } catch (error) {
        console.error('도서 등록 에러:', error);
        return null;
    }
};

export const updateBook = async (id, bookData) => {
    try {
        const response = await axios.put(`${API_BASE}/${id}`, bookData);
        return response.data;
    } catch (error) {
        console.error('도서 수정 에러:', error);
        return null;
    }
};

export const deleteBook = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE}/${id}`);
        return response.data;
    } catch (error) {
        console.error('도서 삭제 에러:', error);
        return null;
    }
};

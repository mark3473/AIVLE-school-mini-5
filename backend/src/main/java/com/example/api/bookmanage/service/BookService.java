package com.example.api.bookmanage.service;

import com.example.api.bookmanage.domain.Book;
import com.example.api.bookmanage.domain.Book.Genre;
import com.example.api.bookmanage.dto.BookDTO;
import com.example.api.bookmanage.exception.BookNotFoundException;
import com.example.api.bookmanage.repository.BookRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;

    //책을 등록
    @Transactional
    public Book insertBook(Book book) {
        return bookRepository.save(book);
    }
    //책을 업데이트(PUT)
    @Transactional
    public Book updateBook(Long id, Book book) {
        Book b = getBook(id);
        b.setTitle(book.getTitle());
        b.setSummary(book.getSummary());
        b.setAuthor(book.getAuthor());
        b.setPublisher(book.getPublisher());
        b.setGenre(book.getGenre());
        b.setCoverImg(book.getCoverImg());
        return bookRepository.save(b);
    }

    private Book getBook(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException("존재하지 않는 책입니다."));
    }

    //책 장르만 업데이트(PATCH)
    @Transactional
    public Book updateBook(Long id, Genre genre) {
        Book b = getBook(id);
        b.setGenre(genre);
        return bookRepository.save(b);
    }

    //책을 삭제하고
    @Transactional
    public void deleteBook(Long id) {
        Book b = getBook(id);
//        if(b.getStatus() == Book.Status.BORROWED) {
//            throw new IllegalArgumentException("대출 중인 책은 삭제할 수 없습니다.");
//        }
        bookRepository.delete(b);
    }
    //책을 조회하고(단건)
    public Book findBook(Long id) {
        return getBook(id);
    }

    //책을 조회하고(다건)
    public List<Book> findBooks() {
        return bookRepository.findAll();
    }

    public List<BookDTO.Response> searchBooks(String title, String author, Genre genre){
        List<Book> books = bookRepository.searchBooks(title, author, genre);

        return books.stream().map(book -> new BookDTO.Response(
                book.getId(),
                book.getTitle(),
                book.getAuthor(),
                book.getPublisher(),
                book.getSummary(),
                book.getCoverImg(),
                book.getGenre()
        )).toList();
    }
}

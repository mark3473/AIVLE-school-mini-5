package com.example.api.bookmanage.controller;

import com.example.api.bookmanage.domain.Book;
import com.example.api.bookmanage.dto.BookDTO;
import com.example.api.bookmanage.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookController {

    public final BookService bookService;

    //GET 다건
    @GetMapping
    public List<Book> getBooks(){
        return bookService.findBooks();
    }

    //GET 단건
    @GetMapping("/{bookId}")
    public Book getBook(@PathVariable("bookId") Long bookId) {
        return bookService.findBook(bookId);
    }

    //POST
    @PostMapping
    public Book createBook(@RequestBody Book book){
        return bookService.insertBook(book);
    }
    //PUT
    @PutMapping("/{bookId}")
    public Book updateBook(
            @PathVariable("bookId") Long id, @RequestBody Book book){
        return bookService.updateBook(id, book);
    }
    //PATCH
    @PatchMapping("/{bookId}")
    public Book updateBookStatus(
            @PathVariable("bookId") Long id, @RequestBody Book book){
        return bookService.updateBook(id, book.getGenre());
    }
    //DELETE
    @DeleteMapping("/{bookId}")
    public void deleteBook(@PathVariable("bookId") Long id) {
        bookService.deleteBook(id);
    }

    // 제목, 작가, 장르 별 키워드로 검색하기
    @GetMapping("/search")
    public List<BookDTO.Response> searchBooks(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String author,
            @RequestParam(required = false) Book.Genre genre
    ){
        return bookService.searchBooks(title, author, genre);
    }
}

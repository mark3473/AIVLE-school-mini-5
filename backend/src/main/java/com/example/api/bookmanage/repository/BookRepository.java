package com.example.api.bookmanage.repository;

import com.example.api.bookmanage.domain.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    @Query("""
        SELECT b FROM Book b
        WHERE (:title IS NULL OR b.title LIKE %:title%)
          AND (:author IS NULL OR b.author LIKE %:author%)
          AND (:genre IS NULL OR b.genre = :genre)
    """)
    List<Book> searchBooks(
            @Param("title") String title,
            @Param("author") String author,
            @Param("genre") Book.Genre genre
    );
}

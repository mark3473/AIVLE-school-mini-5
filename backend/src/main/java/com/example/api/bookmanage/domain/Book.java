package com.example.api.bookmanage.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 45)
    private String title;

    @Column()
    private String summary;

    @Column()
    private String author;

    @Column(length = 45)
    private String publisher;

    @Column(length = 2000)
    private String coverImg;

    @Enumerated(EnumType.STRING)
    private Genre genre;

    public enum Genre{
        FANTASY, SF, THRILLER, ROMANCE, MYSTERY, ESSAY, HISTORY
    }

//    @Column(length = 45)
//    private String publisher;
//
//    @Enumerated(EnumType.STRING)
//    private Status status;
//
//    public enum Status{
//        BORROWED, AVAILABLE
//    }
}

package com.example.api.bookmanage.dto;

import com.example.api.bookmanage.domain.Book;
import com.example.api.bookmanage.domain.Book.Genre;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class BookDTO {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Post {

        @NotBlank(message = "제목은 필수 입력 값입니다.")
        @NotNull(message = "제목은 반드시 입력하셔야 합니다.")
        @Size(min = 1, max = 45, message = "제목은 45자 이하여야 합니다.")
        private String title;

        @Column(length = 45)
        private String author;

        @Column(length = 45)
        private String publisher;

        private String summary;
        private Genre genre;
        private String coverImg;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Put {

        @NotBlank(message = "제목은 필수 입력 값입니다.")
        @NotNull(message = "제목은 반드시 입력하셔야 합니다.")
        @Size(min = 1, max = 45, message = "제목은 45자 이하여야 합니다.")
        private String title;

        @Column(length = 45)
        private String author;

        @Column(length = 45)
        private String publisher;

        private String summary;
        private Genre genre;
        private String coverImg;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Patch {
        private Genre genre;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private Long id;
        private String title;
        private String author;
        private String pulbisher;
        private String summary;
        private String coverImg;
        private Genre genre;
    }
}

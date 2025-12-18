package com.example.api.bookmanage.exception;

public class BookNotFoundException extends IllegalArgumentException{
    public BookNotFoundException(String message){
        super(message);
    }
}

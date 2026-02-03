package com.example.backend.utils.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;


@ResponseStatus(HttpStatus.BAD_REQUEST)
public class TestimonialCharacterLimitException extends RuntimeException {
    public TestimonialCharacterLimitException(String message) {
        super("Testimonial character limit exceeded: " + message);
    }
}
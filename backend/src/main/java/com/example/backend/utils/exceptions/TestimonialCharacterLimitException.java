package com.example.backend.utils.exceptions;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class TestimonialCharacterLimitException extends RuntimeException {
    public TestimonialCharacterLimitException(String message) {
        super("Testimonial character limit exceeded: " + message);
    }
}
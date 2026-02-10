package com.example.backend.utils;

import com.example.backend.utils.exceptions.NotFoundException;
import com.example.backend.utils.exceptions.TestimonialQueueFullException;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import java.time.ZonedDateTime;

import com.example.backend.utils.HttpErrorInfo;
import com.example.backend.utils.exceptions.TestimonialCharacterLimitException;


import com.example.backend.utils.HttpErrorInfo;
import com.example.backend.utils.exceptions.TestimonialCharacterLimitException;

import static org.springframework.http.HttpStatus.*;

@RestControllerAdvice
@Slf4j
public class GlobalControllerExceptionHandler {


    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(TestimonialCharacterLimitException.class)
    public HttpErrorInfo handleTestimonialCharacterLimitException(WebRequest request, Exception ex) {
        return createHttpErrorInfo(BAD_REQUEST, request, ex);
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(NotFoundException.class)
    public HttpErrorInfo handleNotFoundException(WebRequest request, Exception ex) {
        return createHttpErrorInfo(NOT_FOUND, request, ex);
    }

    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(TestimonialQueueFullException.class)
    public HttpErrorInfo handleTestimonialQueueFullException(WebRequest request, Exception ex) {
        return  createHttpErrorInfo(CONFLICT, request, ex);
    }
        
    private HttpErrorInfo createHttpErrorInfo(HttpStatus httpStatus, WebRequest request, Exception ex) {
        final String path = request.getDescription(false).replace("uri=", "");
        final String message = ex.getMessage();

        log.debug("Returning HTTP status: {} for path: {}, message: {}", httpStatus, path, message);

        // Matches your HttpErrorInfo constructor: (timestamp, path, httpStatus, message)
        return new HttpErrorInfo(ZonedDateTime.now(), path, httpStatus, message);
    }
}
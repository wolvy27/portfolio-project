package com.example.backend.utils;

import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.time.ZonedDateTime;

@Getter
public class HttpErrorInfo {

    private final ZonedDateTime timestamp;
    private final String path;
    private final HttpStatus httpStatus;
    private final String message;

    public HttpErrorInfo(ZonedDateTime timestamp, String path, HttpStatus httpStatus, String message) {
        this.timestamp = timestamp;
        this.path = path;
        this.httpStatus = httpStatus;
        this.message = message;
    }
}

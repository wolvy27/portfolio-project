package com.example.backend.utils;

import HttpErrorInfo;
import com.example.backend.utils.backend.TestimonialCharacterLimitException;

@RestControllerAdvice
@Slf4j
public class GlobalControllerExceptionHandler {


    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(TestimonialCharacterLimitException.class)
    public HttpErrorInfo handleTestimonialCharacterLimitException(WebRequest request, Exception ex) {
        return createHttpErrorInfo(BAD_REQUEST, request, ex);
    }
        
}
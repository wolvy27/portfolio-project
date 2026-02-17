package com.example.backend.usersubdomain.presentationlayer;

import com.example.backend.usersubdomain.businesslogiclayer.AuthenticationService;
import com.example.backend.utils.RateLimitingService;
import io.github.bucket4j.Bucket;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthenticationService service;
    private final RateLimitingService rateLimitingService;

//    @PostMapping("/register")
//    public ResponseEntity<AuthResponse> register(@RequestBody AuthRequest request, HttpServletRequest servletRequest) {
//        Bucket bucket = rateLimitingService.resolveBucket(servletRequest.getRemoteAddr());
//        if (!bucket.tryConsume(1)) {
//            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).build();
//        }
//
//        return ResponseEntity.ok(service.register(request));
//    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request, HttpServletRequest servletRequest) {
        // Rate limit
        Bucket bucket = rateLimitingService.resolveBucket(servletRequest.getRemoteAddr());
        if (!bucket.tryConsume(1)) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).build();
        }

        return ResponseEntity.ok(service.authenticate(request));
    }
}
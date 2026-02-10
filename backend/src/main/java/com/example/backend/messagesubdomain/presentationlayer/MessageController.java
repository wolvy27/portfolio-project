package com.example.backend.messagesubdomain.presentationlayer;

import com.example.backend.messagesubdomain.businesslogiclayer.MessageService;
import com.example.backend.testimonialsubdomain.businesslogiclayer.TestimonialService;
import com.example.backend.testimonialsubdomain.dataaccesslayer.Testimonial;
import com.example.backend.utils.EmailService;
import com.example.backend.utils.RateLimitingService;
import io.github.bucket4j.Bucket;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageService messageService;
    private final EmailService emailService;
    private final RateLimitingService rateLimitingService;

    public MessageController(MessageService messageService, EmailService emailService, RateLimitingService rateLimitingService) {
        this.messageService = messageService;
        this.emailService = emailService;
        this.rateLimitingService = rateLimitingService;
    }

    @GetMapping
    public ResponseEntity<List<MessageResponseDTO>> getAllMessages() {
        return ResponseEntity.ok(messageService.getAllMessages());
    }

    @PostMapping
    public ResponseEntity<String> sendMessage(@RequestBody MessageRequest request, HttpServletRequest servletRequest) {

        // Rate limit check
        Bucket bucket = rateLimitingService.resolveBucket(servletRequest.getRemoteAddr());
        if (!bucket.tryConsume(1)) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body("Too many messages sent.");
        }

        // Simple Honeypot Check
        if (request.getFaxNumber() != null && !request.getFaxNumber().isEmpty()) {
            return ResponseEntity.ok("Message sent!");
        }

        // Send Email
        emailService.sendContactMessage(request.getSenderName(), request.getEmail(), request.getContent());

        return ResponseEntity.ok("Message sent successfully.");
    }

    @PatchMapping("/{messageId}/read")
    public ResponseEntity<MessageResponseDTO> markAsRead(@PathVariable String messageId) {
        return ResponseEntity.ok(messageService.markMessageAsRead(messageId));
    }

    @DeleteMapping("/{messageId}")
    public ResponseEntity<Void> deleteMessage(@PathVariable String messageId) {
        messageService.deleteMessage(messageId);
        return ResponseEntity.noContent().build();
    }
}
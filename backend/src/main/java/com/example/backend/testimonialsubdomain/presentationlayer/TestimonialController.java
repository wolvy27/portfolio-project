package com.example.backend.testimonialsubdomain.presentationlayer;

import com.example.backend.testimonialsubdomain.businesslogiclayer.TestimonialService;
import com.example.backend.utils.RateLimitingService;
import io.github.bucket4j.Bucket;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Pattern;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/testimonials")
@Validated
public class TestimonialController {

    private final TestimonialService testimonialService;
    private final RateLimitingService rateLimitingService;
    private static final String UUID_REGEX = "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$";

    public TestimonialController(TestimonialService testimonialService, RateLimitingService rateLimitingService) {
        this.testimonialService = testimonialService;
        this.rateLimitingService = rateLimitingService;
    }

    // Public Endpoint (Only Approved)
    @GetMapping("/approved")
    public ResponseEntity<List<TestimonialResponseDTO>> getApprovedTestimonials() {
        return ResponseEntity.ok(testimonialService.getApprovedTestimonials());
    }

    // Admin Endpoint (All)
    @GetMapping
    public ResponseEntity<List<TestimonialResponseDTO>> getAllTestimonials() {
        return ResponseEntity.ok(testimonialService.getAllTestimonials());
    }

    @PostMapping
    public ResponseEntity<String> submitTestimonial(@RequestBody TestimonialRequestDTO request, HttpServletRequest servletRequest) {

        Bucket bucket = rateLimitingService.resolveBucket(servletRequest.getRemoteAddr());
        if (!bucket.tryConsume(1)) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body("Rate limit exceeded");
        }

        if (request.getFaxNumber() != null && !request.getFaxNumber().isEmpty()) {
            return ResponseEntity.ok("Testimonial submitted for approval.");
        }

        testimonialService.createTestimonial(request);
        return ResponseEntity.ok("Testimonial submitted for approval.");
    }

    // Update Status Endpoint
    @PatchMapping("/{testimonialId}/status")
    public ResponseEntity<TestimonialResponseDTO> updateStatus(
            @PathVariable @Pattern(regexp = UUID_REGEX, message = "Invalid ID") String testimonialId,
            @RequestBody TestimonialStatusRequestDTO statusDTO) {

        return ResponseEntity.ok(testimonialService.updateTestimonialStatus(testimonialId, statusDTO.isApproved()));
    }

    @DeleteMapping("/{testimonialId}")
    public ResponseEntity<Void> deleteTestimonial(
            @PathVariable @Pattern(regexp = UUID_REGEX, message = "Invalid ID") String testimonialId) {
        testimonialService.deleteTestimonial(testimonialId);
        return ResponseEntity.noContent().build();
    }
}
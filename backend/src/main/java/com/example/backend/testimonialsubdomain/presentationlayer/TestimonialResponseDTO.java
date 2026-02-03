package com.example.backend.testimonialsubdomain.presentationlayer;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TestimonialResponseDTO {
    private String testimonialId;
    private String authorName;
    private String authorRole;
    private String content;
    private boolean approved;
    private LocalDateTime receivedAt;
}
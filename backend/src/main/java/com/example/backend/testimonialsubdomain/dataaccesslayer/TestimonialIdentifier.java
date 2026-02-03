package com.example.backend.testimonialsubdomain.dataaccesslayer;

import jakarta.persistence.Embeddable;
import lombok.Getter;

import java.util.UUID;

@Embeddable
@Getter
public class TestimonialIdentifier {

    private String testimonialId;

    public TestimonialIdentifier() {
        this.testimonialId = UUID.randomUUID().toString();
    }

    public TestimonialIdentifier(String testimonialId) {
        this.testimonialId = testimonialId;
    }

    public TestimonialIdentifier(boolean generate) {
        if (generate) {
            this.testimonialId = UUID.randomUUID().toString();
        }
    }
}
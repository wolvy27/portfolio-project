package com.example.backend.testimonialsubdomain.dataaccesslayer;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.util.UUID;


@Embeddable
@Data
public class TestimonialIdentifier {
    private String testimonialId;

    public TestimonialIdentifier(String testimonialId) { this.testimonialId = testimonialId; }

    public TestimonialIdentifier() { this.testimonialId = UUID.randomUUID().toString(); }

}
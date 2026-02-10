package com.example.backend.testimonialsubdomain.dataaccesslayer;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Entity
@Table(name = "testimonials")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Testimonial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Embedded 
    private TestimonialIdentifier testimonialIdentifier;

    private String endorserFirstName;
    private String endorserLastName;
    private String endorserEmailAddress;
    private String companyRole;

    @Column(columnDefinition = "TEXT")
    private String content;
    // should create custom exceptions for these validations

    private boolean isApproved;

    private LocalDateTime receivedAt;

    private String faxNumber;
    
}
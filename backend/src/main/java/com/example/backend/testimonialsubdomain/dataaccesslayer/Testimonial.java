package com.example.backend.testimonialsubdomain.dataaccesslayer;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

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

    private String content; // should enforce a character limit at the service layer
    // should create custom exceptions for these validations
    
}
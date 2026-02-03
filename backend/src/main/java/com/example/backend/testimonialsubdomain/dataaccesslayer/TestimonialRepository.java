package com.example.backend.testimonialsubdomain.dataaccesslayer;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface TestimonialRepository extends JpaRepository<Testimonial, Integer> {

    Optional<Testimonial> findByTestimonialIdentifier_TestimonialId(String testimonialId);

    // Boolean finder
    List<Testimonial> findAllByIsApproved(boolean isApproved);
}
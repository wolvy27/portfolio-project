package com.example.backend.testimonialsubdomain.businesslogiclayer;

import com.example.backend.testimonialsubdomain.presentationlayer.TestimonialRequestDTO;
import com.example.backend.testimonialsubdomain.presentationlayer.TestimonialResponseDTO;

import java.util.List;

public interface TestimonialService {

    // For Admin: View all (pending, approved, rejected)
    List<TestimonialResponseDTO> getAllTestimonials();

    // For Public: View only approved
    List<TestimonialResponseDTO> getApprovedTestimonials();

    // Create new (default pending)
    TestimonialResponseDTO createTestimonial(TestimonialRequestDTO requestDTO);

    // Update status (Approve/Reject)
    TestimonialResponseDTO updateTestimonialStatus(String testimonialId, boolean isApproved);

    // Delete
    void deleteTestimonial(String testimonialId);
}
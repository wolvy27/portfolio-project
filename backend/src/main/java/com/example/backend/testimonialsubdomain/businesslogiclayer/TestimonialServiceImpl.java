package com.example.backend.testimonialsubdomain.businesslogiclayer;

import com.example.backend.testimonialsubdomain.dataaccesslayer.*;
import com.example.backend.testimonialsubdomain.datamapperlayer.TestimonialResponseMapper;
import com.example.backend.testimonialsubdomain.presentationlayer.*;
import com.example.backend.utils.exceptions.NotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TestimonialServiceImpl implements TestimonialService {

    private final TestimonialRepository testimonialRepository;
    private final TestimonialResponseMapper testimonialResponseMapper;

    public TestimonialServiceImpl(TestimonialRepository testimonialRepository, TestimonialResponseMapper testimonialResponseMapper) {
        this.testimonialRepository = testimonialRepository;
        this.testimonialResponseMapper = testimonialResponseMapper;
    }

    @Override
    @Transactional(readOnly = true)
    public List<TestimonialResponseDTO> getAllTestimonials() {
        return testimonialResponseMapper.entityListToResponseDTOList(testimonialRepository.findAll());
    }

    @Override
    @Transactional(readOnly = true)
    public List<TestimonialResponseDTO> getApprovedTestimonials() {
        // Find where isApproved = true
        return testimonialResponseMapper.entityListToResponseDTOList(
                testimonialRepository.findAllByIsApproved(true)
        );
    }

    @Override
    @Transactional
    public TestimonialResponseDTO createTestimonial(TestimonialRequestDTO requestDTO) {
        long pendingCount = testimonialRepository.countTestimonialByIsApprovedFalse();
        if (pendingCount >= 50) {
            throw new RuntimeException("Submission queue full. Please try again later.");
        }
        Testimonial testimonial = testimonialResponseMapper.requestDTOToEntity(requestDTO);

        testimonial.setTestimonialIdentifier(new TestimonialIdentifier(true));
        testimonial.setApproved(false); // Default to unapproved
        testimonial.setReceivedAt(LocalDateTime.now());

        return testimonialResponseMapper.entityToResponseDTO(testimonialRepository.save(testimonial));
    }

    @Override
    @Transactional
    public TestimonialResponseDTO updateTestimonialStatus(String testimonialId, boolean isApproved) {
        Testimonial testimonial = testimonialRepository.findByTestimonialIdentifier_TestimonialId(testimonialId)
                .orElseThrow(() -> new NotFoundException("Testimonial not found"));

        testimonial.setApproved(isApproved);
        return testimonialResponseMapper.entityToResponseDTO(testimonialRepository.save(testimonial));
    }

    @Override
    @Transactional
    public void deleteTestimonial(String testimonialId) {
        Testimonial testimonial = testimonialRepository.findByTestimonialIdentifier_TestimonialId(testimonialId)
                .orElseThrow(() -> new NotFoundException("Testimonial not found"));
        testimonialRepository.delete(testimonial);
    }
}
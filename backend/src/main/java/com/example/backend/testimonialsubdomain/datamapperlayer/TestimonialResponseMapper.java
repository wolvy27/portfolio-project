package com.example.backend.testimonialsubdomain.datamapperlayer;

import com.example.backend.testimonialsubdomain.dataaccesslayer.Testimonial;
import com.example.backend.testimonialsubdomain.presentationlayer.TestimonialRequestDTO;
import com.example.backend.testimonialsubdomain.presentationlayer.TestimonialResponseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TestimonialResponseMapper {

    @Mapping(target = "testimonialId", source = "testimonialIdentifier.testimonialId")
    @Mapping(target = "authorName", expression = "java(entity.getEndorserFirstName() + \" \" + entity.getEndorserLastName())")
    @Mapping(target = "authorRole", source = "companyRole")
    @Mapping(target = "approved", source = "approved")
    TestimonialResponseDTO entityToResponseDTO(Testimonial entity);

    List<TestimonialResponseDTO> entityListToResponseDTOList(List<Testimonial> entities);

    @Mapping(target = "endorserFirstName", source = "firstName")
    @Mapping(target = "endorserLastName", source = "lastName")
    @Mapping(target = "endorserEmailAddress", source = "email")
    @Mapping(target = "companyRole", source = "companyRole")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "testimonialIdentifier", ignore = true)
    @Mapping(target = "approved", ignore = true) // Set manually in service
    @Mapping(target = "receivedAt", ignore = true) // Set manually in service
    @Mapping(target = "faxNumber", ignore = true) // bot ahh
    Testimonial requestDTOToEntity(TestimonialRequestDTO dto);
}
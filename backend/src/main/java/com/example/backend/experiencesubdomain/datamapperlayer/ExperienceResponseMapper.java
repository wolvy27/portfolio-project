package com.example.backend.experiencesubdomain.datamapperlayer;


import com.example.backend.experiencesubdomain.dataaccesslayer.Experience;
import com.example.backend.experiencesubdomain.presentationlayer.ExperienceRequestDTO;
import com.example.backend.experiencesubdomain.presentationlayer.ExperienceResponseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import java.util.List;

@Mapper(componentModel = "spring")
public interface ExperienceResponseMapper {

    @Mapping(target = "experienceId", source = "experienceIdentifier.experienceId")
    ExperienceResponseDTO entityToResponseDTO(Experience entity);

    List<ExperienceResponseDTO> entityListToResponseDTOList(List<Experience> entities);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "experienceIdentifier", ignore = true)
    Experience requestDTOToEntity(ExperienceRequestDTO dto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "experienceIdentifier", ignore = true)
    Experience updateEntityFromRequest(ExperienceRequestDTO dto, @MappingTarget Experience entity);
}

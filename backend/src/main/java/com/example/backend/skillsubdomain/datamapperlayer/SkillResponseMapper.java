package com.example.backend.skillsubdomain.datamapperlayer;

import com.example.backend.skillsubdomain.dataaccesslayer.Skill;
import com.example.backend.skillsubdomain.presentationlayer.SkillRequestDTO;
import com.example.backend.skillsubdomain.presentationlayer.SkillResponseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import java.util.List;

@Mapper(componentModel = "spring")
public interface SkillResponseMapper {

    @Mapping(target = "skillId", source = "skillIdentifier.skillId")
    SkillResponseDTO entityToResponseDTO(Skill entity);

    List<SkillResponseDTO> entityListToResponseDTOList(List<Skill> entities);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "skillIdentifier", ignore = true)
    Skill requestDTOToEntity(SkillRequestDTO dto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "skillIdentifier", ignore = true)
    Skill updateEntityFromRequest(SkillRequestDTO dto, @MappingTarget Skill entity);
}

package com.example.backend.projectsubdomain.datamapperlayer;

import com.example.backend.projectsubdomain.dataaccesslayer.Project;
import com.example.backend.projectsubdomain.presentationlayer.ProjectRequestDTO;
import com.example.backend.projectsubdomain.presentationlayer.ProjectResponseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProjectResponseMapper {

    @Mapping(source = "projectIdentifier.projectId", target = "projectId")
    ProjectResponseDTO entityToResponseDTO(Project entity);

    List<ProjectResponseDTO> entityListToResponseDTOList(List<Project> entities);
    
    // For Updates
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "projectIdentifier", ignore = true)
    Project updateEntityFromRequest(ProjectRequestDTO requestDTO, @MappingTarget Project entity);
    
    // For Creation
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "projectIdentifier", ignore = true)
    Project requestDTOToEntity(ProjectRequestDTO requestDTO);
}
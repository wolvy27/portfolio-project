package com.example.backend.projectsubdomain.businesslogiclayer;

import com.example.backend.projectsubdomain.presentationlayer.ProjectRequestDTO;
import com.example.backend.projectsubdomain.presentationlayer.ProjectResponseDTO;
import java.util.List;

public interface ProjectService {
    List<ProjectResponseDTO> getAllProjects();
    ProjectResponseDTO getProjectById(String projectId);
    ProjectResponseDTO createProject(ProjectRequestDTO projectRequestDTO);
    ProjectResponseDTO updateProject(String projectId, ProjectRequestDTO projectRequestDTO);
    void deleteProject(String projectId);
}
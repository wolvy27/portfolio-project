package com.example.backend.projectsubdomain.businesslogiclayer;

import com.example.backend.projectsubdomain.dataaccesslayer.Project;
import com.example.backend.projectsubdomain.dataaccesslayer.ProjectIdentifier;
import com.example.backend.projectsubdomain.dataaccesslayer.ProjectRepository;
import com.example.backend.projectsubdomain.datamapperlayer.ProjectResponseMapper;
import com.example.backend.projectsubdomain.presentationlayer.ProjectRequestDTO;
import com.example.backend.projectsubdomain.presentationlayer.ProjectResponseDTO;
import com.example.backend.utils.exceptions.NotFoundException; // Assuming you have a custom exception package
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectResponseMapper projectResponseMapper;

    public ProjectServiceImpl(ProjectRepository projectRepository, ProjectResponseMapper projectResponseMapper) {
        this.projectRepository = projectRepository;
        this.projectResponseMapper = projectResponseMapper;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProjectResponseDTO> getAllProjects() {
        return projectResponseMapper.entityListToResponseDTOList(projectRepository.findAll());
    }

    @Override
    @Transactional(readOnly = true)
    public ProjectResponseDTO getProjectById(String projectId) {
        Project project = projectRepository.findByProjectIdentifier_ProjectId(projectId)
                .orElseThrow(() -> new NotFoundException("Project with ID " + projectId + " not found."));
        return projectResponseMapper.entityToResponseDTO(project);
    }

    @Override
    @Transactional
    public ProjectResponseDTO createProject(ProjectRequestDTO projectRequestDTO) {
        Project project = projectResponseMapper.requestDTOToEntity(projectRequestDTO);
        project.setProjectIdentifier(new ProjectIdentifier(true)); // Generate UUID
        return projectResponseMapper.entityToResponseDTO(projectRepository.save(project));
    }

    @Override
    @Transactional
    public ProjectResponseDTO updateProject(String projectId, ProjectRequestDTO projectRequestDTO) {
        Project existingProject = projectRepository.findByProjectIdentifier_ProjectId(projectId)
                .orElseThrow(() -> new NotFoundException("Project with ID " + projectId + " not found."));

        Project updatedProject = projectResponseMapper.updateEntityFromRequest(projectRequestDTO, existingProject);
        return projectResponseMapper.entityToResponseDTO(projectRepository.save(updatedProject));
    }

    @Override
    @Transactional
    public void deleteProject(String projectId) {
        Project existingProject = projectRepository.findByProjectIdentifier_ProjectId(projectId)
                .orElseThrow(() -> new NotFoundException("Project with ID " + projectId + " not found."));
        projectRepository.delete(existingProject);
    }
}

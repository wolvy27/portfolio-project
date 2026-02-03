package com.example.backend.projectsubdomain.presentationlayer;


import com.example.backend.projectsubdomain.businesslogiclayer.ProjectService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Pattern;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@Validated
public class ProjectController {

    private final ProjectService projectService;
    private static final String UUID_REGEX = "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$";

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public ResponseEntity<List<ProjectResponseDTO>> getAllProjects() {
        return ResponseEntity.ok(projectService.getAllProjects());
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<ProjectResponseDTO> getProjectById(
            @PathVariable @Pattern(regexp = UUID_REGEX, message = "Invalid projectId format") String projectId) {
        return ResponseEntity.ok(projectService.getProjectById(projectId));
    }

    @PostMapping
    public ResponseEntity<ProjectResponseDTO> createProject(@RequestBody @Valid ProjectRequestDTO requestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(projectService.createProject(requestDTO));
    }

    @PutMapping("/{projectId}")
    public ResponseEntity<ProjectResponseDTO> updateProject(
            @PathVariable @Pattern(regexp = UUID_REGEX, message = "Invalid projectId format") String projectId,
            @RequestBody @Valid ProjectRequestDTO requestDTO) {
        return ResponseEntity.ok(projectService.updateProject(projectId, requestDTO));
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<Void> deleteProject(
            @PathVariable @Pattern(regexp = UUID_REGEX, message = "Invalid projectId format") String projectId) {
        projectService.deleteProject(projectId);
        return ResponseEntity.noContent().build();
    }
}

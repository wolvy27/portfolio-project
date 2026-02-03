package com.example.backend.projectsubdomain.presentationlayer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProjectResponseDTO {
    private String projectId; // Mapped from ProjectIdentifier
    private String englishTitle;
    private String frenchTitle;
    private String englishDescription;
    private String frenchDescription;
    private List<String> techStack;
    private boolean deployed;
    private String demoUrl;
    private String repoUrl;
    private String projectImage;
    private Integer displayOrder;
}
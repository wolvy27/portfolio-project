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
public class ProjectRequestDTO {
    private String englishTitle;
    private String frenchTitle;
    private String englishDescription;
    private String frenchDescription;
    private List<String> techStack;
    private Boolean deployed;
    private String demoUrl;
    private String repoUrl;
    private String projectImage; // The URL string from MinIO
    private Integer displayOrder;
}
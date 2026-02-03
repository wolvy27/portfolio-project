package com.example.backend.projectsubdomain.dataaccesslayer;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "projects")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Embedded
    private ProjectIdentifier projectIdentifier;

    // Bilingual Content
    private String englishTitle;
    private String frenchTitle;

    @Column(columnDefinition = "TEXT")
    private String englishDescription;

    @Column(columnDefinition = "TEXT")
    private String frenchDescription;

    // Tech Stack (Stored as a separate table linked by project_id)
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "project_tech_stack", joinColumns = @JoinColumn(name = "project_id"))
    @Column(name = "technology")
    private List<String> techStack;

    // Deployment & Media
    private boolean deployed;
    private String demoUrl; 
    private String repoUrl;
    private String projectImage; // Stores the URL string

    private Integer displayOrder;
}
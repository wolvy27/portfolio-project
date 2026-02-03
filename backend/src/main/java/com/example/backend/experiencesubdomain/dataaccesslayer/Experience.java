package com.example.backend.experiencesubdomain.dataaccesslayer;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "experiences")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Embedded
    private ExperienceIdentifier experienceIdentifier;

    @Enumerated(EnumType.STRING)
    private ExperienceType type; // Enum defined below

    private String institution; // Company or School Name

    private String englishRole;
    private String frenchRole;

    @Column(columnDefinition = "TEXT")
    private String englishDescription;

    @Column(columnDefinition = "TEXT")
    private String frenchDescription;

    private LocalDate startDate;
    private LocalDate endDate; // Nullable (if null, represents "Present")
}
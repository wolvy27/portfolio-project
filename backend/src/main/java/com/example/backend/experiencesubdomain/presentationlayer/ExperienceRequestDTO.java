package com.example.backend.experiencesubdomain.presentationlayer;

import com.example.backend.experiencesubdomain.dataaccesslayer.ExperienceType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ExperienceRequestDTO {
    private ExperienceType type; // WORK, EDUCATION
    private String institution;
    private String englishRole;
    private String frenchRole;
    private String englishDescription;
    private String frenchDescription;
    private LocalDate startDate;
    private LocalDate endDate;
}
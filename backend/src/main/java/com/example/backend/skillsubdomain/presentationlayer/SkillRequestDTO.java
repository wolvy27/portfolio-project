package com.example.backend.skillsubdomain.presentationlayer;

import com.example.backend.skillsubdomain.dataaccesslayer.SkillCategory;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SkillRequestDTO {
    private String name;
    private SkillCategory category; // BACKEND, FRONTEND, etc.
    private Integer displayOrder;
}

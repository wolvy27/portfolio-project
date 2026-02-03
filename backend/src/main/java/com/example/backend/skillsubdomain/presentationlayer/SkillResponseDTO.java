package com.example.backend.skillsubdomain.presentationlayer;

import com.example.backend.skillsubdomain.dataaccesslayer.SkillCategory;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SkillResponseDTO {
    private String skillId;
    private String name;
    private SkillCategory category;
    private Integer displayOrder;
}

package com.example.backend.skillsubdomain.businesslogiclayer;

import com.example.backend.skillsubdomain.presentationlayer.SkillRequestDTO;
import com.example.backend.skillsubdomain.presentationlayer.SkillResponseDTO;
import java.util.List;

public interface SkillService {
    List<SkillResponseDTO> getAllSkills();
    SkillResponseDTO createSkill(SkillRequestDTO requestDTO);
    SkillResponseDTO updateSkill(String skillId, SkillRequestDTO requestDTO);
    void deleteSkill(String skillId);
}

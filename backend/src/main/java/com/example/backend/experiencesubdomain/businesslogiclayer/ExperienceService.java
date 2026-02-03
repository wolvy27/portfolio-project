package com.example.backend.experiencesubdomain.businesslogiclayer;

import com.example.backend.experiencesubdomain.presentationlayer.ExperienceRequestDTO;
import com.example.backend.experiencesubdomain.presentationlayer.ExperienceResponseDTO;
import java.util.List;

public interface ExperienceService {
    List<ExperienceResponseDTO> getAllExperiences();
    ExperienceResponseDTO getExperienceById(String experienceId);
    ExperienceResponseDTO createExperience(ExperienceRequestDTO requestDTO);
    ExperienceResponseDTO updateExperience(String experienceId, ExperienceRequestDTO requestDTO);
    void deleteExperience(String experienceId);
}
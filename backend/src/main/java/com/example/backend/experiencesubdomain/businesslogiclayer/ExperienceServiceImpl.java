package com.example.backend.experiencesubdomain.businesslogiclayer;

import com.example.backend.experiencesubdomain.dataaccesslayer.*;
import com.example.backend.experiencesubdomain.datamapperlayer.ExperienceResponseMapper;
import com.example.backend.experiencesubdomain.presentationlayer.*;
import com.example.backend.utils.exceptions.NotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class ExperienceServiceImpl implements ExperienceService {

    private final ExperienceRepository experienceRepository;
    private final ExperienceResponseMapper experienceResponseMapper;

    public ExperienceServiceImpl(ExperienceRepository repo, ExperienceResponseMapper mapper) {
        this.experienceRepository = repo;
        this.experienceResponseMapper = mapper;
    }

    @Override
    public List<ExperienceResponseDTO> getAllExperiences() {
        return experienceResponseMapper.entityListToResponseDTOList(experienceRepository.findAll());
    }

    @Override
    public ExperienceResponseDTO getExperienceById(String experienceId) {
        return experienceRepository.findByExperienceIdentifier_ExperienceId(experienceId)
                .map(experienceResponseMapper::entityToResponseDTO)
                .orElseThrow(() -> new NotFoundException("Experience not found: " + experienceId));
    }

    @Override
    public ExperienceResponseDTO createExperience(ExperienceRequestDTO requestDTO) {
        Experience experience = experienceResponseMapper.requestDTOToEntity(requestDTO);
        experience.setExperienceIdentifier(new ExperienceIdentifier(true));
        return experienceResponseMapper.entityToResponseDTO(experienceRepository.save(experience));
    }

    @Override
    public ExperienceResponseDTO updateExperience(String experienceId, ExperienceRequestDTO requestDTO) {
        Experience experience = experienceRepository.findByExperienceIdentifier_ExperienceId(experienceId)
                .orElseThrow(() -> new NotFoundException("Experience not found: " + experienceId));
        Experience updated = experienceResponseMapper.updateEntityFromRequest(requestDTO, experience);
        return experienceResponseMapper.entityToResponseDTO(experienceRepository.save(updated));
    }

    @Override
    public void deleteExperience(String experienceId) {
        Experience experience = experienceRepository.findByExperienceIdentifier_ExperienceId(experienceId)
                .orElseThrow(() -> new NotFoundException("Experience not found: " + experienceId));
        experienceRepository.delete(experience);
    }
}

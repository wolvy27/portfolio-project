package com.example.backend.skillsubdomain.businesslogiclayer;

import com.example.backend.skillsubdomain.dataaccesslayer.*;
import com.example.backend.skillsubdomain.datamapperlayer.SkillResponseMapper;
import com.example.backend.skillsubdomain.presentationlayer.*;
import com.example.backend.utils.exceptions.NotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class SkillServiceImpl implements SkillService {

    private final SkillRepository skillRepository;
    private final SkillResponseMapper skillResponseMapper;

    public SkillServiceImpl(SkillRepository repo, SkillResponseMapper mapper) {
        this.skillRepository = repo;
        this.skillResponseMapper = mapper;
    }

    @Override
    public List<SkillResponseDTO> getAllSkills() {
        return skillResponseMapper.entityListToResponseDTOList(skillRepository.findAll());
    }

    @Override
    public SkillResponseDTO createSkill(SkillRequestDTO requestDTO) {
        Skill skill = skillResponseMapper.requestDTOToEntity(requestDTO);
        skill.setSkillIdentifier(new SkillIdentifier(true));
        return skillResponseMapper.entityToResponseDTO(skillRepository.save(skill));
    }

    @Override
    public SkillResponseDTO updateSkill(String skillId, SkillRequestDTO requestDTO) {
        Skill skill = skillRepository.findBySkillIdentifier_SkillId(skillId)
                .orElseThrow(() -> new NotFoundException("Skill not found: " + skillId));
        Skill updated = skillResponseMapper.updateEntityFromRequest(requestDTO, skill);
        return skillResponseMapper.entityToResponseDTO(skillRepository.save(updated));
    }

    @Override
    public void deleteSkill(String skillId) {
        Skill skill = skillRepository.findBySkillIdentifier_SkillId(skillId)
                .orElseThrow(() -> new NotFoundException("Skill not found: " + skillId));
        skillRepository.delete(skill);
    }
}

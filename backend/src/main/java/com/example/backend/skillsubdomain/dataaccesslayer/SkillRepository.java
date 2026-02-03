package com.example.backend.skillsubdomain.dataaccesslayer;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface SkillRepository extends JpaRepository<Skill, Integer> {
    Optional<Skill> findBySkillIdentifier_SkillId(String skillId);
}

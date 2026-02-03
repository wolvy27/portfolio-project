package com.example.backend.experiencesubdomain.dataaccesslayer;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ExperienceRepository extends JpaRepository<Experience, Integer> {
    Optional<Experience> findByExperienceIdentifier_ExperienceId(String experienceId);
}
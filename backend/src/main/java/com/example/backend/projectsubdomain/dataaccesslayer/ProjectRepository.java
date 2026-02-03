package com.example.backend.projectsubdomain.dataaccesslayer;


import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Integer> {
    Optional<Project> findByProjectIdentifier_ProjectId(String projectId);
}
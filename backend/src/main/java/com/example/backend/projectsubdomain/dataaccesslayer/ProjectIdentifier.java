package com.example.backend.projectsubdomain.dataaccesslayer;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Embeddable
@Getter
@NoArgsConstructor
public class ProjectIdentifier {

    private String projectId;

    public ProjectIdentifier(String projectId) {
        this.projectId = projectId;
    }

    public ProjectIdentifier(boolean generate) {
        if (generate) {
            this.projectId = UUID.randomUUID().toString();
        }
    }
}
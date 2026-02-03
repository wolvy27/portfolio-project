package com.example.backend.experiencesubdomain.dataaccesslayer;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Embeddable
@Getter
@NoArgsConstructor
public class ExperienceIdentifier {
    private String experienceId;

    public ExperienceIdentifier(String experienceId) {
        this.experienceId = experienceId;
    }

    public ExperienceIdentifier(boolean generate) {
        if(generate) {
            this.experienceId = UUID.randomUUID().toString();
        }
    }
}
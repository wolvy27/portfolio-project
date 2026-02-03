package com.example.backend.skillsubdomain.dataaccesslayer;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Embeddable
@Getter
@NoArgsConstructor
public class SkillIdentifier {
    private String skillId;

    public SkillIdentifier(String skillId) {
        this.skillId = skillId;
    }

    public SkillIdentifier(boolean generate) {
        if (generate) {
            this.skillId = UUID.randomUUID().toString();
        }
    }
}
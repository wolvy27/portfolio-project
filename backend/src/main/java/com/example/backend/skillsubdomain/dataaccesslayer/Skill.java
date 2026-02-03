package com.example.backend.skillsubdomain.dataaccesslayer;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "skills")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Embedded
    private SkillIdentifier skillIdentifier;

    private String name;

    @Enumerated(EnumType.STRING)
    private SkillCategory category; // Enum defined below

    private Integer displayOrder;
}
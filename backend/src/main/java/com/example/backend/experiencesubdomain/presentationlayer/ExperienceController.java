package com.example.backend.experiencesubdomain.presentationlayer;


import com.example.backend.experiencesubdomain.businesslogiclayer.ExperienceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/experiences")
public class ExperienceController {

    private final ExperienceService experienceService;

    public ExperienceController(ExperienceService experienceService) {
        this.experienceService = experienceService;
    }

    @GetMapping
    public ResponseEntity<List<ExperienceResponseDTO>> getAllExperiences() {
        return ResponseEntity.ok(experienceService.getAllExperiences());
    }

    @GetMapping("/{experienceId}")
    public ResponseEntity<ExperienceResponseDTO> getExperience(@PathVariable String experienceId) {
        return ResponseEntity.ok(experienceService.getExperienceById(experienceId));
    }

    @PostMapping
    public ResponseEntity<ExperienceResponseDTO> createExperience(@RequestBody ExperienceRequestDTO requestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(experienceService.createExperience(requestDTO));
    }

    @PutMapping("/{experienceId}")
    public ResponseEntity<ExperienceResponseDTO> updateExperience(@PathVariable String experienceId, @RequestBody ExperienceRequestDTO requestDTO) {
        return ResponseEntity.ok(experienceService.updateExperience(experienceId, requestDTO));
    }

    @DeleteMapping("/{experienceId}")
    public ResponseEntity<Void> deleteExperience(@PathVariable String experienceId) {
        experienceService.deleteExperience(experienceId);
        return ResponseEntity.noContent().build();
    }
}
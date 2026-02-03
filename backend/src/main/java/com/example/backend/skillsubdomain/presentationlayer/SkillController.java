package com.example.backend.skillsubdomain.presentationlayer;


import com.example.backend.skillsubdomain.businesslogiclayer.SkillService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @GetMapping
    public ResponseEntity<List<SkillResponseDTO>> getAllSkills() {
        return ResponseEntity.ok(skillService.getAllSkills());
    }

    @PostMapping
    public ResponseEntity<SkillResponseDTO> createSkill(@RequestBody SkillRequestDTO requestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(skillService.createSkill(requestDTO));
    }

    @PutMapping("/{skillId}")
    public ResponseEntity<SkillResponseDTO> updateSkill(@PathVariable String skillId, @RequestBody SkillRequestDTO requestDTO) {
        return ResponseEntity.ok(skillService.updateSkill(skillId, requestDTO));
    }

    @DeleteMapping("/{skillId}")
    public ResponseEntity<Void> deleteSkill(@PathVariable String skillId) {
        skillService.deleteSkill(skillId);
        return ResponseEntity.noContent().build();
    }
}
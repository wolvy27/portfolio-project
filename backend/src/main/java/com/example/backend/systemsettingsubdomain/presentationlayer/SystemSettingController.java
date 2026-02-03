package com.example.backend.systemsettingsubdomain.presentationlayer;

import com.example.backend.systemsettingsubdomain.businesslogiclayer.SystemSettingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/settings")
public class SystemSettingController {

    private final SystemSettingService service;

    public SystemSettingController(SystemSettingService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<SystemSettingResponseDTO>> getAllSettings() {
        return ResponseEntity.ok(service.getAllSettings());
    }

    @GetMapping("/{key}")
    public ResponseEntity<SystemSettingResponseDTO> getSetting(@PathVariable String key) {
        return ResponseEntity.ok(service.getSettingByKey(key));
    }

    @PutMapping("/{key}")
    public ResponseEntity<SystemSettingResponseDTO> updateSetting(@PathVariable String key, @RequestBody SystemSettingRequestDTO requestDTO) {
        return ResponseEntity.ok(service.updateSetting(key, requestDTO));
    }

    @PostMapping("/{key}")
    public ResponseEntity<SystemSettingResponseDTO> createSetting(@PathVariable String key, @RequestBody SystemSettingRequestDTO requestDTO) {
        return ResponseEntity.ok(service.createSetting(key, requestDTO));
    }
}

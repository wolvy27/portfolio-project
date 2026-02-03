package com.example.backend.systemsettingsubdomain.presentationlayer;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SystemSettingResponseDTO {
    private String settingKey;
    private String settingValue;
    private String description;
}
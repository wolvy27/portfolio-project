package com.example.backend.systemsettingsubdomain.presentationlayer;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SystemSettingRequestDTO {
    private String settingValue;
    private String description;
}
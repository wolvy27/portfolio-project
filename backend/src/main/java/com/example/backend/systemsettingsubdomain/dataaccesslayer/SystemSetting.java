package com.example.backend.systemsettingsubdomain.dataaccesslayer;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "system_settings")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SystemSetting {

    @Id
    private String settingKey;

    private String settingValue;

    private String description;
}
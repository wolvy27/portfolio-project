package com.example.backend.systemsettingsubdomain.dataaccesslayer;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SystemSettingRepository extends JpaRepository<SystemSetting, String> {
    // Standard JpaRepository methods (findById, save) are enough since ID is String
}

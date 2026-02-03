package com.example.backend.systemsettingsubdomain.businesslogiclayer;

import com.example.backend.systemsettingsubdomain.presentationlayer.SystemSettingRequestDTO;
import com.example.backend.systemsettingsubdomain.presentationlayer.SystemSettingResponseDTO;
import java.util.List;

public interface SystemSettingService {
    List<SystemSettingResponseDTO> getAllSettings();
    SystemSettingResponseDTO getSettingByKey(String key);
    SystemSettingResponseDTO updateSetting(String key, SystemSettingRequestDTO requestDTO);
    SystemSettingResponseDTO createSetting(String key, SystemSettingRequestDTO requestDTO);
}

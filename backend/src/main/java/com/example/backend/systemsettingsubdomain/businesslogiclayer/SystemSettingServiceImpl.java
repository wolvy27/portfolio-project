package com.example.backend.systemsettingsubdomain.businesslogiclayer;

import com.example.backend.systemsettingsubdomain.dataaccesslayer.*;
import com.example.backend.systemsettingsubdomain.datamapperlayer.SystemSettingResponseMapper;
import com.example.backend.systemsettingsubdomain.presentationlayer.*;
import com.example.backend.utils.exceptions.NotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SystemSettingServiceImpl implements SystemSettingService {

    private final SystemSettingRepository repository;
    private final SystemSettingResponseMapper mapper;

    public SystemSettingServiceImpl(SystemSettingRepository repository, SystemSettingResponseMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public List<SystemSettingResponseDTO> getAllSettings() {
        return mapper.entityListToResponseDTOList(repository.findAll());
    }

    @Override
    public SystemSettingResponseDTO getSettingByKey(String key) {
        return repository.findById(key)
                .map(mapper::entityToResponseDTO)
                .orElseThrow(() -> new NotFoundException("Setting not found: " + key));
    }

    @Override
    public SystemSettingResponseDTO createSetting(String key, SystemSettingRequestDTO requestDTO) {
        SystemSetting setting = new SystemSetting();
        setting.setSettingKey(key);
        setting.setSettingValue(requestDTO.getSettingValue());
        setting.setDescription(requestDTO.getDescription());
        return mapper.entityToResponseDTO(repository.save(setting));
    }

    @Override
    public SystemSettingResponseDTO updateSetting(String key, SystemSettingRequestDTO requestDTO) {
        SystemSetting setting = repository.findById(key)
                .orElse(new SystemSetting()); // Create new if not found
        
        if (setting.getSettingKey() == null) {
            setting.setSettingKey(key);
        }

        setting.setSettingValue(requestDTO.getSettingValue());
        setting.setDescription(requestDTO.getDescription());
        
        return mapper.entityToResponseDTO(repository.save(setting));
    }
}

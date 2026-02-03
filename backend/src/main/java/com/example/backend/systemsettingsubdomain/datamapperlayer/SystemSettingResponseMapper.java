package com.example.backend.systemsettingsubdomain.datamapperlayer;

import com.example.backend.systemsettingsubdomain.dataaccesslayer.SystemSetting;
import com.example.backend.systemsettingsubdomain.presentationlayer.SystemSettingRequestDTO;
import com.example.backend.systemsettingsubdomain.presentationlayer.SystemSettingResponseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import java.util.List;

@Mapper(componentModel = "spring")
public interface SystemSettingResponseMapper {

    SystemSettingResponseDTO entityToResponseDTO(SystemSetting entity);

    List<SystemSettingResponseDTO> entityListToResponseDTOList(List<SystemSetting> entities);

    @Mapping(target = "settingKey", ignore = true) // Key handled separately
    SystemSetting updateEntityFromRequest(SystemSettingRequestDTO dto, @MappingTarget SystemSetting entity);
}
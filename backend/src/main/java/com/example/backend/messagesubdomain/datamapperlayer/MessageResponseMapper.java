package com.example.backend.messagesubdomain.datamapperlayer;

import com.example.backend.messagesubdomain.dataaccesslayer.Message;
import com.example.backend.messagesubdomain.presentationlayer.MessageRequestDTO;
import com.example.backend.messagesubdomain.presentationlayer.MessageResponseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import java.util.List;

@Mapper(componentModel = "spring")
public interface MessageResponseMapper {

    @Mapping(target = "messageId", source = "messageIdentifier.messageId")
    @Mapping(target = "read", source = "read")
    MessageResponseDTO entityToResponseDTO(Message entity);

    List<MessageResponseDTO> entityListToResponseDTOList(List<Message> entities);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "messageIdentifier", ignore = true)
    @Mapping(target = "receivedAt", ignore = true)
    @Mapping(target = "read", ignore = true)
    Message requestDTOToEntity(MessageRequestDTO dto);
}
package com.example.backend.messagesubdomain.businesslogiclayer;

import com.example.backend.messagesubdomain.presentationlayer.MessageRequestDTO;
import com.example.backend.messagesubdomain.presentationlayer.MessageResponseDTO;
import java.util.List;

public interface MessageService {
    List<MessageResponseDTO> getAllMessages();
    MessageResponseDTO createMessage(MessageRequestDTO requestDTO);
    MessageResponseDTO markMessageAsRead(String messageId);
    void deleteMessage(String messageId);
}

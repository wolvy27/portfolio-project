package com.example.backend.messagesubdomain.businesslogiclayer;

import com.example.backend.messagesubdomain.dataaccesslayer.*;
import com.example.backend.messagesubdomain.datamapperlayer.MessageResponseMapper;
import com.example.backend.messagesubdomain.presentationlayer.*;
import com.example.backend.utils.exceptions.NotFoundException;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;
    private final MessageResponseMapper messageResponseMapper;

    public MessageServiceImpl(MessageRepository repo, MessageResponseMapper mapper) {
        this.messageRepository = repo;
        this.messageResponseMapper = mapper;
    }

    @Override
    public List<MessageResponseDTO> getAllMessages() {
        return messageResponseMapper.entityListToResponseDTOList(messageRepository.findAll());
    }

    @Override
    public MessageResponseDTO createMessage(MessageRequestDTO requestDTO) {
        Message message = messageResponseMapper.requestDTOToEntity(requestDTO);
        message.setMessageIdentifier(new MessageIdentifier(true));
        message.setReceivedAt(LocalDateTime.now());
        message.setRead(false);
        return messageResponseMapper.entityToResponseDTO(messageRepository.save(message));
    }

    @Override
    public MessageResponseDTO markMessageAsRead(String messageId) {
        Message message = messageRepository.findByMessageIdentifier_MessageId(messageId)
                .orElseThrow(() -> new NotFoundException("Message not found: " + messageId));
        message.setRead(true);
        return messageResponseMapper.entityToResponseDTO(messageRepository.save(message));
    }

    @Override
    public void deleteMessage(String messageId) {
        Message message = messageRepository.findByMessageIdentifier_MessageId(messageId)
                .orElseThrow(() -> new NotFoundException("Message not found: " + messageId));
        messageRepository.delete(message);
    }
}

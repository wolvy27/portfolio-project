package com.example.backend.messagesubdomain.presentationlayer;

import com.example.backend.messagesubdomain.businesslogiclayer.MessageService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping
    public ResponseEntity<List<MessageResponseDTO>> getAllMessages() {
        return ResponseEntity.ok(messageService.getAllMessages());
    }

    @PostMapping
    public ResponseEntity<MessageResponseDTO> createMessage(@RequestBody @Valid MessageRequestDTO requestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(messageService.createMessage(requestDTO));
    }

    @PatchMapping("/{messageId}/read")
    public ResponseEntity<MessageResponseDTO> markAsRead(@PathVariable String messageId) {
        return ResponseEntity.ok(messageService.markMessageAsRead(messageId));
    }

    @DeleteMapping("/{messageId}")
    public ResponseEntity<Void> deleteMessage(@PathVariable String messageId) {
        messageService.deleteMessage(messageId);
        return ResponseEntity.noContent().build();
    }
}
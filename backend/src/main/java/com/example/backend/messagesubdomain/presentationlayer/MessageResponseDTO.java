package com.example.backend.messagesubdomain.presentationlayer;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class MessageResponseDTO {
    private String messageId;
    private String senderName;
    private String senderEmail;
    private String messageBody;
    private LocalDateTime receivedAt;
    private boolean read;
}

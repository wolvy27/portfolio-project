package com.example.backend.messagesubdomain.dataaccesslayer;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Embeddable
@Getter
@NoArgsConstructor
public class MessageIdentifier {
    private String messageId;

    public MessageIdentifier(String messageId) {
        this.messageId = messageId;
    }

    public MessageIdentifier(boolean generate) {
        if(generate) {
            this.messageId = UUID.randomUUID().toString();
        }
    }
}
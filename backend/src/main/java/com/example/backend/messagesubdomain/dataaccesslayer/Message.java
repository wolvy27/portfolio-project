package com.example.backend.messagesubdomain.dataaccesslayer;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "messages")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Embedded
    private MessageIdentifier messageIdentifier;

    private String senderName;
    private String senderEmail;

    @Column(columnDefinition = "TEXT")
    private String messageBody;

    private LocalDateTime receivedAt;

    private boolean isRead;
}
package com.example.backend.messagesubdomain.presentationlayer;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MessageRequestDTO {
    @NotBlank
    private String senderName;

    @Email
    @NotBlank
    private String senderEmail;

    @NotBlank
    private String messageBody;
}

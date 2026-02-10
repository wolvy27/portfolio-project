package com.example.backend.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.admin.email}")
    private String adminEmail;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendContactMessage(String senderName, String senderEmail, String content) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("portfolio-bot@yourdomain.com");
        message.setTo(adminEmail);
        message.setSubject("New Portfolio Contact: " + senderName);
        message.setText("From: " + senderName + " (" + senderEmail + ")\n\n" + content);

        mailSender.send(message);
    }
}
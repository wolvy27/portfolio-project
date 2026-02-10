package com.example.backend.messagesubdomain.presentationlayer;

public class MessageRequest {

    private String senderName;
    private String email;
    private String content;

    private String faxNumber;

    public MessageRequest() {
    }

    public MessageRequest(String senderName, String email, String content, String faxNumber) {
        this.senderName = senderName;
        this.email = email;
        this.content = content;
        this.faxNumber = faxNumber;
    }

    public String getSenderName() { return senderName; }
    public void setSenderName(String senderName) { this.senderName = senderName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getFaxNumber() { return faxNumber; }
    public void setFaxNumber(String faxNumber) { this.faxNumber = faxNumber; }
}
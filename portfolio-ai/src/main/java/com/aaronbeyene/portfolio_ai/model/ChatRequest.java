package com.aaronbeyene.portfolio_ai.model;

public class ChatRequest {

    private String message;
    private String previousResponseId;

    public ChatRequest() {
    }

    public String getMessage() {
        return message;
    }

    public String getPreviousResponseId() {
        return previousResponseId;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setPreviousResponseId(String previousResponseId) {
        this.previousResponseId = previousResponseId;
    }
}
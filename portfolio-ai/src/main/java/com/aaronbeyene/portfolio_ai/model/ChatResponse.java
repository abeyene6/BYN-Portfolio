package com.aaronbeyene.portfolio_ai.model;

public class ChatResponse {

    private String message;
    private String responseId;

    public ChatResponse(String message, String responseId) {
        this.message = message;
        this.responseId = responseId;
    }

    public String getMessage() {
        return message;
    }

    public String getResponseId() {
        return responseId;
    }
}
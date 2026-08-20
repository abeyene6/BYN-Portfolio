package com.aaronbeyene.portfolio_ai.controller;

import com.aaronbeyene.portfolio_ai.model.ChatRequest;
import com.aaronbeyene.portfolio_ai.model.ChatResponse;
import com.aaronbeyene.portfolio_ai.service.BynBotService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:5173")
public class ChatController {

    private final BynBotService bynBotService;

    public ChatController(BynBotService bynBotService) {
        this.bynBotService = bynBotService;
    }

    @PostMapping
    public ChatResponse chat(@RequestBody ChatRequest request) {

        return bynBotService.ask(
                request.getMessage(),
                request.getPreviousResponseId()
        );
    }
}
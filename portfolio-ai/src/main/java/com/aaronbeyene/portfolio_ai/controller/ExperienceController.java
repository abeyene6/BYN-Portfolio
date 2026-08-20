package com.aaronbeyene.portfolio_ai.controller;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aaronbeyene.portfolio_ai.model.Experience;
import com.aaronbeyene.portfolio_ai.service.ExperienceService;

@RestController
@RequestMapping("/experiences")
public class ExperienceController {

    private final ExperienceService experienceService;

    public ExperienceController(
            ExperienceService experienceService) {
        this.experienceService = experienceService;
    }

    @GetMapping
    public List<Experience> getExperiences() {
        return experienceService.getExperiences();
    }

    @GetMapping("/{id}")
    public Experience getExperience(@PathVariable Long id) {
        return experienceService.getExperienceById(id);
    }

    @PostMapping
    public Experience addExperience(
            @Valid @RequestBody Experience experience) {
        return experienceService.addExperience(experience);
    }

    @PutMapping("/{id}")
    public Experience updateExperience(
            @PathVariable Long id,
            @Valid @RequestBody Experience experience) {
        return experienceService.updateExperience(id, experience);
    }

    @DeleteMapping("/{id}")
    public void deleteExperience(@PathVariable Long id) {
        experienceService.deleteExperience(id);
    }
}
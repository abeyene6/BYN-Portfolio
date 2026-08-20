package com.aaronbeyene.portfolio_ai.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.aaronbeyene.portfolio_ai.model.Experience;
import com.aaronbeyene.portfolio_ai.repository.ExperienceRepository;

@Service
public class ExperienceService {

    private final ExperienceRepository repository;

    public ExperienceService(ExperienceRepository repository) {
        this.repository = repository;
    }

    public List<Experience> getExperiences() {
        return repository.findAll();
    }

    public Experience getExperienceById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Experience addExperience(Experience experience) {
        return repository.save(experience);
    }

    public Experience updateExperience(
            Long id,
            Experience updatedExperience) {

        Experience existingExperience =
                repository.findById(id).orElse(null);

        if (existingExperience == null) {
            return null;
        }

        existingExperience.setCompany(updatedExperience.getCompany());
        existingExperience.setRole(updatedExperience.getRole());
        existingExperience.setDescription(
                updatedExperience.getDescription());
        existingExperience.setStartDate(
                updatedExperience.getStartDate());
        existingExperience.setEndDate(
                updatedExperience.getEndDate());

        return repository.save(existingExperience);
    }

    public void deleteExperience(Long id) {
        repository.deleteById(id);
    }
}
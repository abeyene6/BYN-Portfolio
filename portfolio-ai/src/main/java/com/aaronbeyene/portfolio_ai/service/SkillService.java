package com.aaronbeyene.portfolio_ai.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.aaronbeyene.portfolio_ai.model.Skill;
import com.aaronbeyene.portfolio_ai.repository.SkillRepository;

@Service
public class SkillService {

    private final SkillRepository repository;

    public SkillService(SkillRepository repository) {
        this.repository = repository;
    }

    public List<Skill> getSkills() {
        return repository.findAll();
    }

    public Skill getSkillById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Skill addSkill(Skill skill) {
        return repository.save(skill);
    }

    public void deleteSkill(Long id) {
        repository.deleteById(id);
    }

    public Skill updateSkill(Long id, Skill updatedSkill) {
        Skill existingSkill = repository.findById(id).orElse(null);

        if (existingSkill == null) {
            return null;
        }

        existingSkill.setName(updatedSkill.getName());
        existingSkill.setCategory(updatedSkill.getCategory());

        return repository.save(existingSkill);
    }
}
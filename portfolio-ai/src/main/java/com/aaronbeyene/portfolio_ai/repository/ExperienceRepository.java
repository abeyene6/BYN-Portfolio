package com.aaronbeyene.portfolio_ai.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aaronbeyene.portfolio_ai.model.Experience;

public interface ExperienceRepository
        extends JpaRepository<Experience, Long> {
}
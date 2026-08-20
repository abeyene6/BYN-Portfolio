package com.aaronbeyene.portfolio_ai.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aaronbeyene.portfolio_ai.model.Project;

public interface ProjectRepository
        extends JpaRepository<Project, Long> {

}
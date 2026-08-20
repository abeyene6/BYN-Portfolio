package com.aaronbeyene.portfolio_ai.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.aaronbeyene.portfolio_ai.dto.ProjectDTO;
import com.aaronbeyene.portfolio_ai.model.Project;
import com.aaronbeyene.portfolio_ai.service.interfaces.IProjectService;

import jakarta.validation.Valid;

@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "https://byn-portfolio.onrender.com",
    "https://bynadeveloper.com",
    "https://www.bynadeveloper.com"
})
@RestController
@RequestMapping("/projects")
public class ProjectController {

    private final IProjectService projectService;

    public ProjectController(IProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public List<ProjectDTO> getProjects() {
        return projectService.getProjects();
    }

    @GetMapping("/{id}")
    public ProjectDTO getProject(@PathVariable Long id) {
        return projectService.getProjectById(id);
    }

    @PostMapping
    public ResponseEntity<Project> addProject(
            @Valid @RequestBody Project project) {

        Project savedProject = projectService.addProject(project);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedProject);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(
            @PathVariable Long id) {

        projectService.deleteProject(id);

        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public Project updateProject(
            @PathVariable Long id,
            @RequestBody Project project) {
        return projectService.updateProject(id, project);
    }

    
}
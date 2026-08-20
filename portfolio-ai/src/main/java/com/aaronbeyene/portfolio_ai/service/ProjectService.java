package com.aaronbeyene.portfolio_ai.service;

import com.aaronbeyene.portfolio_ai.exception.ResourceNotFoundException;
import com.aaronbeyene.portfolio_ai.model.Project;
import org.springframework.stereotype.Service;
import com.aaronbeyene.portfolio_ai.repository.ProjectRepository;
import com.aaronbeyene.portfolio_ai.service.interfaces.IProjectService;

import java.util.List;
import com.aaronbeyene.portfolio_ai.dto.ProjectDTO;

@Service
public class ProjectService implements IProjectService{
    private final ProjectRepository repository;
    private ProjectDTO toDTO(Project project) {

        return new ProjectDTO(
                project.getId(),
                project.getTitle(),
                project.getDescription()
        );
    }
    public ProjectService(ProjectRepository repository) {
        this.repository = repository;
    }
   public List<ProjectDTO> getProjects() {
        return repository.findAll(
                org.springframework.data.domain.Sort.by("id")
        )
                .stream()
                .map(this::toDTO)
                .toList();
    }

  public ProjectDTO getProjectById(Long id) {
        Project project = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Project with id " + id + " was not found."));

        return toDTO(project);
    }
        
    public Project addProject(Project project) {
        return repository.save(project);
    }
    
    public void deleteProject(Long id) {
        repository.deleteById(id);
    }


    public Project updateProject(Long id, Project updatedProject) {
        Project existingProject = repository.findById(id).orElse(null);

        if (existingProject == null) {
            return null;
        }

        existingProject.setTitle(updatedProject.getTitle());
        existingProject.setDescription(updatedProject.getDescription());

        return repository.save(existingProject);
    }
}

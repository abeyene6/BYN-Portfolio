package com.aaronbeyene.portfolio_ai.service.interfaces;

import java.util.List;

import com.aaronbeyene.portfolio_ai.dto.ProjectDTO;
import com.aaronbeyene.portfolio_ai.model.Project;

public interface IProjectService {

    List<ProjectDTO> getProjects();

    ProjectDTO getProjectById(Long id);

    Project addProject(Project project);

    Project updateProject(Long id, Project project);

    void deleteProject(Long id);

}
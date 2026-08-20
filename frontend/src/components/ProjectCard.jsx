function ProjectCard({ project }) {

  return (

    <div className="project-card">

      <div className="project-image">

        Coming Soon

      </div>

      <h3>{project.title}</h3>

      <p>{project.description}</p>

      <div className="project-links">

        <a
          className="project-link"
          href="#"
        >
          GitHub
        </a>

        <a
          className="project-link"
          href="#"
        >
          Live Demo
        </a>

      </div>

    </div>

  );

}

export default ProjectCard;
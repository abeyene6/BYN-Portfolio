import { useEffect, useState } from "react";

import bynBotFP from "../assets/svg/bynbot/BynBotFP.png";
import dungeonFP from "../assets/DC-FP.png";
import lockFP from "../assets/LockFP.png";

import bynBotVid from "../assets/BynBotVid.mp4";
import dungeonVid from "../assets/DCVid.mp4";
import lockVid from "../assets/LockVid.mp4";


function ProjectMedia({ image, video, title }) {

  const [isHovering, setIsHovering] = useState(false);


  return (

    <div
      className="project-image"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >

      <video
        src={video}
        className={`project-video ${
          isHovering ? "project-media-hidden" : ""
        }`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />


      <img
        src={image}
        alt={title}
        className={`project-still ${
          isHovering ? "project-media-visible" : ""
        }`}
        draggable="false"
      />

    </div>

  );

}


function Projects() {

  const [projects, setProjects] = useState([]);


  useEffect(() => {

    fetch("http://localhost:8080/projects")
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error(error));

  }, []);


  const descriptions = {

    "AI Portfolio":
      "A portfolio should answer more than a résumé ever can. So I built one that talks back.",

    "Dungeon Crawler":
      "Every object has its purpose. Every bug was its own fight.",

  };


  const techStacks = {

    "AI Portfolio":
      "Spring Boot · React · PostgreSQL",

    "Dungeon Crawler":
      "Java · Android SDK · JUnit",

  };


  const images = {

    "AI Portfolio": bynBotFP,

    "Dungeon Crawler": dungeonFP,

  };


  const videos = {

    "AI Portfolio": bynBotVid,

    "Dungeon Crawler": dungeonVid,

  };


  return (

    <section id="projects">


      <h2 className="projects-title">
        // FEATURED PROJECTS
      </h2>


      <div className="project-grid">


        {projects.map((project) => (

          <div
            className="project-card"
            key={project.id}
          >


            <ProjectMedia
              image={images[project.title]}
              video={videos[project.title]}
              title={project.title}
            />


            <div className="project-title">

              <h3>
                {project.title}
              </h3>

            </div>


            <div className="project-overlay">


              <h3>
                {project.title}
              </h3>


              <p>
                {descriptions[project.title]}
              </p>


              <small>
                {techStacks[project.title]}
              </small>


            </div>


          </div>

        ))}


        <div className="project-card">


          <ProjectMedia
            image={lockFP}
            video={lockVid}
            title="Classified"
          />


          <div className="project-title">

            <h3>
              Classified
            </h3>

          </div>


          <div className="project-overlay">


            <h3>
              COMING SOON...
            </h3>


            <p>
              Looking for spoilers?
              <br />
              Ask BYN Bot.
            </p>


          </div>


        </div>


      </div>


    </section>

  );

}


export default Projects;
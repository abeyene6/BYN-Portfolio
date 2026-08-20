import {
  SiOpenjdk,
  SiPython,
  SiJavascript,
  SiCplusplus,
  SiReact,
  SiSelenium,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiJira,
  SiLinux
} from "react-icons/si";

const rowOne = [
  { icon: <SiOpenjdk />, label: "Java", brand: "java" },
  { icon: <SiReact />, label: "React", brand: "react" },
  { icon: <SiPython />, label: "Python", brand: "python" },
  { icon: <SiDocker />, label: "Docker", brand: "docker" },
  { icon: <strong>SQL</strong>, label: "SQL", brand: "sql" },
  { icon: <SiGithub />, label: "GitHub", brand: "github" },
  { icon: <strong>ASM</strong>, label: "Assembly", brand: "asm" }
];

const rowTwo = [
  { icon: <SiJavascript />, label: "JavaScript", brand: "javascript" },
  { icon: <strong>SB</strong>, label: "Spring Boot", brand: "spring" },
  { icon: <SiGit />, label: "Git", brand: "git" },
  { icon: <SiMongodb />, label: "MongoDB", brand: "mongo" },
  { icon: <SiLinux />, label: "Linux", brand: "linux" },
  { icon: <strong>REST</strong>, label: "REST APIs", brand: "api" },
  { icon: <SiJira />, label: "Jira", brand: "jira" }
];

const rowThree = [
  { icon: <SiCplusplus />, label: "C++", brand: "cpp" },
  { icon: <SiSelenium />, label: "Selenium", brand: "selenium" },
  { icon: <SiPostgresql />, label: "PostgreSQL", brand: "postgres" },
  { icon: <SiGithubactions />, label: "GitHub Actions", brand: "gha" },
  { icon: <strong>J</strong>, label: "JUnit", brand: "junit" },
  { icon: <strong>CSS</strong>, label: "CSS", brand: "css" }
];

function SkillRow({ skills, reverse = false }) {
  const loop = [...skills, ...skills];

  return (
    <div className={`skills-row ${reverse ? "reverse" : ""}`}>
      <div className="skills-track">
        {loop.map((skill, index) => (
          <div
            className={`skill-pill brand-${skill.brand}`}
            key={`${skill.label}-${index}`}
          >
            <div className="skill-icon">
              {skill.icon}
            </div>

            <span>{skill.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills">

      <p className="section-label">
        // S K I L L S
      </p>

      <SkillRow skills={rowOne} />

      <SkillRow
        skills={rowTwo}
        reverse
      />

      <SkillRow skills={rowThree} />

    </section>
  );
}
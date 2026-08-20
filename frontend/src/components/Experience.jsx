import { useState } from "react";

import servicenowLogo from "../assets/ServiceNow_Logo.svg";
import gtLogo from "../assets/Georgia_Tech_logo.png";
import outlierLogo from "../assets/outlier.svg";


const experiences = [

  {
    company: "ServiceNow",
    role: "Software Quality Engineer Intern",
    theme: "servicenow",
    logo: servicenowLogo,

    tech: "Java • Selenium • Testing • GenAI",

    bullets: [
      "Developed and executed automated test cases using Java and Selenium, improving regression coverage across enterprise workflows.",

      "Identified and documented critical defects through end-to-end testing, accelerating issue resolution across cross-functional teams.",

      "Collaborated with developers and QA engineers in an Agile environment to improve product reliability and release quality."
    ]
  },


  {
    company: "Georgia Tech VIP",
    role: "Undergraduate Research Developer",
    theme: "gatech",
    logo: gtLogo,

    tech: "Python • Machine Learning • NLP • OpenAlex",

    bullets: [
      "Developed a machine learning classification tool in Python for academic research data, achieving ~83% classification accuracy.",

      "Integrated OpenAlex research data and applied NLP techniques including tokenization and text processing to build model-ready datasets.",

      "Collaborated with a research team to evaluate classification approaches, iterate on model performance, and translate research requirements into a working software prototype."
    ]
  },


  {
    company: "Outlier",
    role: "AI Training Intern",
    theme: "outlier",
    logo: outlierLogo,

    tech: "AI • Python • Java • C++",

    bullets: [
      "Evaluated AI-generated code across Python, Java, and C++, improving model response quality and accuracy.",

      "Created and reviewed technical datasets used to train large language models on software engineering tasks.",

      "Performed large-scale quality assurance on model outputs, ensuring consistency across coding and reasoning benchmarks."
    ]
  }

];


export default function Experience() {

  const [open, setOpen] = useState([]);


  const toggleExperience = (index) => {

    setOpen((prev) =>

      prev.includes(index)

        ? prev.filter((i) => i !== index)

        : [...prev, index]

    );

  };


  return (

    <section id="experience">


      <h2>
        // E X P E R I E N C E
      </h2>


      <div className="experience-list">


        {experiences.map((job, index) => {

          const isOpen = open.includes(index);


          return (

            <article
              key={job.company}
              className={`experience-banner ${job.theme} ${
                isOpen ? "open" : ""
              }`}
            >


              <button
                type="button"
                className="experience-main"
                onClick={() => toggleExperience(index)}
                aria-expanded={isOpen}
              >


                <div className="experience-company">


                  <div className="experience-company-name">
                    {job.company}
                  </div>


                  <img
                    src={job.logo}
                    alt={`${job.company} logo`}
                    className="experience-company-logo"
                  />


                  <p>
                    {job.role}
                  </p>


                </div>


                <span
                  className="experience-toggle"
                  aria-hidden="true"
                >

                  {isOpen ? "−" : "+"}

                </span>


              </button>


              <div
                className={`experience-dropdown ${
                  isOpen ? "open" : ""
                }`}
              >


                <div className="experience-dropdown-inner">


                  <div className="experience-tech">
                    {job.tech}
                  </div>


                  <ul>

                    {job.bullets.map((bullet, i) => (

                      <li key={i}>
                        {bullet}
                      </li>

                    ))}

                  </ul>


                </div>


              </div>


            </article>

          );

        })}


      </div>


    </section>

  );

}
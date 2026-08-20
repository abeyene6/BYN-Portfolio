import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Skills from "./components/Skills";

function App() {
  return (
    <>
      <Navbar />

      <main>

        <Hero />

        <Projects />

        <About />

        <Experience />

        <Education />
        
        <Skills />

        <Contact />

      </main>

      <Footer />
    </>
  );
}

export default App;
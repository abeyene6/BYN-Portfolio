import Logo from "../assets/Logo.png";

function Navbar() {
  return (
    <header className="navbar">

      <a href="#hero" className="logo">
        <img
          src={Logo}
          alt="Aaron Beyene logo"
          className="navbar-logo-image"
        />
      </a>

      <nav className="nav-links">

        <a href="#projects">
          Projects
        </a>

        <a href="#about">
          About
        </a>

        <a href="#experience">
          Experience
        </a>

        <a href="#contact">
          Contact
        </a>

      </nav>

    </header>
  );
}

export default Navbar;
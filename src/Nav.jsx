import React, { useEffect, useRef, useState } from "react";
import "./Nav.css";

const Nav = () => {
  const navRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const elements = navRef.current.querySelectorAll("h1, h4, button");
    elements.forEach((el, index) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(-40px)";
      
      setTimeout(() => {
        el.style.transition = "all 0.6s ease-out";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 300 + index * 150);
    });
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav ref={navRef}>
      <h1 className="hover-underline">Kratik Sen</h1>
      
      <div className="burger-icon" onClick={toggleMenu}>
        <i className="ri-menu-3-line"></i>
      </div>

      <div className={`part2 ${isMenuOpen ? 'active' : ''}`}>
        <h4 className="hover-underline" onClick={() => scrollToSection("about")}>
          About Me
        </h4>
        <h4
          className="hover-underline"
          onClick={() => scrollToSection("certificates")}
        >
          Certificates
        </h4>
        <h4 className="hover-underline" onClick={() => scrollToSection("skills")}>
          Skills
        </h4>
        <h4
          className="hover-underline"
          onClick={() => scrollToSection("projects")}
        >
          Projects
        </h4>
        <h4
          className="hover-underline"
          onClick={() => scrollToSection("contact")}
        >
          Contact
        </h4>

        <button
          onClick={() => {
            const link = document.createElement("a");
            link.href = "./resume.pdf";
            link.download = "Kratik_Sen_Resume.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setIsMenuOpen(false);
          }}
        >
          Download Resume
        </button>
        <h4>
          <a 
            href="https://github.com/Kratik-Sen" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <i className="ri-github-fill"></i>
          </a>
        </h4>

        <h4>
          <a 
            href="https://www.linkedin.com/in/kratik-sen" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <i className="ri-linkedin-box-fill"></i>
          </a>
        </h4>
      </div>
    </nav>
  );
};

export default Nav;
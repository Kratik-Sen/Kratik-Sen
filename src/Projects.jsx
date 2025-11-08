import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

import './Project.css'
export default function Projects() {
  const projects = [
    {
      id: 1,
      title: 'OneCart',
      description: `Developed a full-featured e-commerce platform using
the MERN stack, featuring a dedicated admin dashboard, secure payment gateway integration, and
Google Authentication for seamless user login. Implemented voice navigation for an enhanced user
experience and used Firebase Authentication for secure login management.`,
      image: './onecart.png',
      technologies: ['#react', '#mongodb', '#tailwind'],
      liveLink: 'https://one-cart-frontend-ojj5.onrender.com/',
      githubLink: 'https://github.com/Kratik-Sen/one-cart'
    },
    {
      id: 2,
      title: 'Chatly',
      description: `Built a real-time chat application using the MERN stack
with WebSocket integration for instant message delivery and live communication between users.
Designed a responsive and intuitive UI for seamless chatting experiences.`,
      image: './chatly.png',
      technologies: ['#react', '#restapi', '#css'],
      liveLink: 'https://chat-app-dsdv.onrender.com/',
      githubLink: 'https://github.com/Kratik-Sen/chat-app'
    },
    {
      id: 3,
      title: 'Best Stay Ever',
      description: `Developed a full-stack accommodation booking platform
where users can browse, book, and manage stays. Implemented property listings, user authentication,search and filter functionality, booking management.Integrated cloud image storage and responsive design for seamless use across devices.`,
      image: './BST.png',
      technologies: ['#nextjs', '#supabase', '#css'],
      liveLink: 'https://best-stay-ever-project-frontend.onrender.com/',
      githubLink: 'https://github.com/Kratik-Sen/Best-stay-ever-project'
    },
    {
      id: 4,
      title: 'Tic Tac Toe',
      description: 'Tic Tac Toe is a classic two-player game built using React and CSS. Players take turns marking X or O on a 3x3 grid to achieve three in a row.',
      image: './t.png',
      technologies: ['#nextjs', '#supabase', '#css'],
      liveLink: 'https://tic-tac-toe-mu-ecru.vercel.app/',
      githubLink: 'https://github.com/Kratik-Sen/tic-tac-toe'
    },
    
  ]

  const handleTilt = (e, cardRef) => {
    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
  }

  const handleTiltReset = (cardRef) => {
    const card = cardRef.current
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
  }

    const sectionRef = useRef(null)
    const introductionRef = useRef(null)
    const titleRef = useRef(null)
    const paragraphRef = useRef(null)
  
    useEffect(() => {
      const ctx = gsap.context(() => {
        gsap.set(introductionRef.current, { opacity: 0, y: -20 })
        gsap.set(titleRef.current, { opacity: 0, y: -20 })
        gsap.set(paragraphRef.current, { opacity: 0, y: 20 })
  
        gsap.to(introductionRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.2,
          ease: 'power2.out'
        })
        gsap.to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.4,
          ease: 'power2.out'
        })
        gsap.to(paragraphRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.6,
          ease: 'power2.out'
        })
      }, sectionRef)
  
      return () => ctx.revert()
    }, [])
  
    useEffect(() => {
      // Function to add rocket effect to an element
      const addRocketEffect = (element) => {
        if (!element) return
  
        const text = element.textContent
        element.innerHTML = ''
  
        text.split('').forEach((char) => {
          const span = document.createElement('span')
          span.textContent = char === ' ' ? '\u00A0' : char
          span.className = 'rocket-char'
          element.appendChild(span)
        })
  
        // Add hover animation to each character
        const chars = element.querySelectorAll('.rocket-char')
        chars.forEach((char) => {
          char.addEventListener('mouseenter', () => {
            gsap.timeline()
              .to(char, {
                y: -30,
                opacity: 0,
                duration: 0.2,
                ease: 'power2.in'
              })
              .set(char, { y: 30 })
              .to(char, {
                y: 0,
                opacity: 1,
                duration: 0.2,
                ease: 'power2.out'
              })
          })
        })
      }
  
      // Apply effect to both title and paragraph
      addRocketEffect(titleRef.current)
      addRocketEffect(paragraphRef.current)
    }, [])

  return (
    <section id="projects" className="projects-section">
    
      <div className="projects-container">
        <div className="projects-header">
           <div ref={introductionRef} className="introduction-label">My Work</div>
          <h2 ref={titleRef} className="about-title">Projects</h2>
          <p ref={paragraphRef} className="about-description">
             Following projects showcases my skills and experience through real-world examples of
            my work. Each project is briefly described with links to code repositories and live demos in
            it. It reflects my ability to solve complex problems, work with different technologies, and
            manage projects effectively.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => {
            const cardRef = useRef(null)
            
            return (
              <ProjectCard
                key={project.id}
                project={project}
                cardRef={cardRef}
                onMouseMove={(e) => handleTilt(e, cardRef)}
                onMouseLeave={() => handleTiltReset(cardRef)}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, cardRef, onMouseMove, onMouseLeave }) {
  return (
    <div
      ref={cardRef}
      className="project-card"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="project-image-wrapper">
        <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
          <img
            src={project.image}
            alt={project.title}
            className="project-image"
          />
        </a>
        <div className="project-links">
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link-icon"
            title="View Code"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link-icon"
            title="Live Demo"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </div>
      </div>

      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <div className="project-technologies">
          {project.technologies.map((tech, index) => (
            <span key={index} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
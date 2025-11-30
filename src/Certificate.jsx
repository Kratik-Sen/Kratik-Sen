import React, { useEffect, useRef } from 'react'
import './Certificate.css'

export default function Certificate() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const timelineRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          } else {
            entry.target.classList.remove('visible')
          }
        })
      },
      { threshold: 0.2 }
    )

    const items = document.querySelectorAll('.certificate-item')
    items.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  const certificates = [
    {
      id: 1,
      title: 'Back End Development and APIs Certification',
      organization: 'freeCodeCamp',
      date: '3 November 2025',
      logo: './fcc.png',
      hoverImage: '/fccCertificate.jpg',
      description: [
        'Built RESTful APIs using Node.js and Express.',
        'Integrated MongoDB for database management and CRUD operations.',
        'Implemented authentication and user management with JWT.',
        'Deployed full-stack apps on cloud platforms like Render and Vercel.'
      ]
    },
    {
      id: 2,
      title: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
      organization: 'Oracle',
      date: '20th October 2025',
      logo: './oracle.png',
      hoverImage: '/oracleCertificate.jpg',
      description: [
        'Gained foundational knowledge of AI, machine learning, and data science concepts.',
        'Learned to build, train, and deploy AI models using Oracle Cloud services.',
        'Understood key OCI tools for data management, vision, and language AI.',
        'Demonstrated practical skills in applying AI solutions for real-world business use cases.'
      ]
    },
    {
      id: 3,
      title: 'TCS iON Career Edge - Young Professional',
      organization: 'TCS iON',
      date: '23 October - 4 November 2025',
      logo: './tcsion.png',
      hoverImage: '/tcsionCertificate.jpg',
      description: [
        'Developed strong communication, presentation, and interpersonal skills.',
        'Learned essential corporate etiquette and workplace behavior.',
        'Gained insights into time management, problem-solving, and goal setting.',
        'Built a foundation for professional growth and career readiness.'
      ]
    },
    {
      id: 4,
      title: 'Basics of Data Structures and Algorithms',
      organization: 'simplilearn',
      date: '19th October 2025',
      logo: './sl.jpeg',
      hoverImage: '/skillup.jpg
      description: [
        'Gained strong understanding of core data structures like arrays, stacks, queues, and linked lists.',
        'Learned algorithmic techniques including searching, sorting, and recursion.',
        'Analyzed time and space complexity using Big O notation.',
        'Strengthened problem-solving and logical thinking skills for coding challenges.'
      ]
    }
  ]

  return (
    <section ref={sectionRef}  id="certificates" className="certificate-section">
      <div className="certificate-container">
        <div ref={headerRef} className="certificate-header">
          <div className="section-label">MY ACHIEVEMENTS</div>
          <h2 className="section-title">Certificates.</h2>
        </div>

        <div ref={timelineRef} className="timeline-container">
          <div className="timeline-line"></div>

          {certificates.map((cert, index) => (
            <div key={cert.id} className={`certificate-item ${index % 2 === 0 ? 'left' : 'right'}`}>
              <div className="certificate-card">
                {/* Content that disappears on hover */}
                <div className="card-content">
                  <h3 className="cert-title">{cert.title}</h3>
                 <div className="cert-organization">
  {cert.organization}
  <span className="hover-tip"> (HOVER ME TO SEE CERTIFICATE)</span>
</div>
                  <ul className="cert-description">
                    {cert.description.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>

                {/* Image that appears on hover */}
                <div
                  className="card-hover-image"
                  style={{ backgroundImage: `url(${cert.hoverImage})` }}
                ></div>
              </div>

              <div className="timeline-circle">
                <div className="circle-border">
                  <img src={cert.logo} alt={cert.organization} className="circle-logo" />
                </div>
                <div className="date-label">{cert.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

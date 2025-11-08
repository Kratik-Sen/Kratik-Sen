import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './About.css'

export const About = () => {
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

  const cards = [
    { id: 1, color: 'yellow', img: './js.webp', title: 'FRONTEND DEVELOPER' },
    { id: 2, color: 'cyan', img: './r2.webp', title: 'REACT DEVELOPER' },
    { id: 3, color: 'green', img: './n2.png', title: 'BACKEND DEVELOPER' }
  ]

  return (
    <section ref={sectionRef} id="about" className="about-section">
      <div className="about-container">
        <div className="about-header">
          <div ref={introductionRef} className="introduction-label">INTRODUCTION</div>
          <h2 ref={titleRef} className="about-title">Hello I Am Kratik Sen</h2>
          <p ref={paragraphRef} className="about-description">
            I'm a skilled software developer with experience in JavaScript, 
            and expertise in frameworks like React, Node.js, and Three.js. 
            I'm a quick learner and collaborate closely with clients to create 
            efficient, scalable, and user-friendly solutions. Let's bring your ideas to life!
          </p>
        </div>

        <div className="cards-container">
          {cards.map((card, index) => (
            <div key={card.id} className={`holographic-container card${card.id}`}>
              <div className="holographic-card" style={{ '--glow-color': card.color }}>
                <img src={card.img} alt={card.title} />
                <h2>{card.title}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
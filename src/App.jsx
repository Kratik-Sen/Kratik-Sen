import React, { useEffect, useRef, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { Scene } from "./Scene"
import "./marquee.css"
import "./style.css"
import Nav from "./Nav"
import { Bloom, EffectComposer, ToneMapping } from '@react-three/postprocessing'
import { About } from "./About"
import gsap from "gsap"
import  Certificate  from "./Certificate.jsx"
import SkillsBalls from "./SkillsBalls.jsx"
import Projects from "./Projects.jsx"
import Contact from "./Contact.jsx"

function App() {
  const marqueeRef = useRef(null)
  const marqueeContainerRef = useRef(null)
  const [userRot, setUserRot] = useState({ x: 0, y: 0 })
  const [isHover, setIsHover] = useState(false)

  useEffect(() => {
    // GSAP marquee scroll
    const marquee = marqueeRef.current
    gsap.to(marquee, {
      xPercent: -50,
      repeat: -1,
      duration: 15,
      ease: "linear",
    })
  }, [])

  useEffect(() => {
    // Animate marquee container fade-in synchronized with cylinder
    const timer = setTimeout(() => {
      if (marqueeContainerRef.current) {
        // Start invisible
        gsap.set(marqueeContainerRef.current, { opacity: 0, visibility: 'visible' })
        
        // Fade in with same timing as cylinder (0.3s delay, 1.5s duration)
        gsap.to(marqueeContainerRef.current, {
          opacity: 1,
          duration: 1.5,
          ease: 'power1.inOut',
          delay: 0.3,
        })
      }
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Nav />
      <div className="main-container">
        <Canvas
          flat
          camera={{ fov: 35 }}
          onPointerEnter={() => setIsHover(true)}
          onPointerLeave={() => {
            setIsHover(false)
          }}
          onPointerMove={(e) => {
            if (!isHover) return
            const rect = e.currentTarget.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            const nx = (x / rect.width) * 2 - 1
            const ny = (y / rect.height) * 2 - 1
            const maxTiltX = 0.5
            const maxTiltY = 0.8
            setUserRot({ x: -ny * maxTiltX, y: nx * maxTiltY })
          }}
          onDoubleClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          <Scene userRotationX={userRot.x} userRotationY={userRot.y} />
        
        </Canvas>

        {/* Marquee overlay */}
        <div className="marquee-container" ref={marqueeContainerRef}>
          <div className="marquee-track" ref={marqueeRef}>
            <h1>
              Hello Welcome to my Portfolio i am Kratik Sen Making Cool looking Websites Including technologies like Mern Stack and more Three.js And More! Scroll Down to see more about my work
            </h1>
          </div>
        </div>
      </div>

      <About />
<Certificate/>
<SkillsBalls/>
<Projects/>
<Contact/>
    </>
  )
}

export default App



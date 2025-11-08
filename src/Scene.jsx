import React, { useRef, useEffect } from 'react'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import { Starfield } from './Starfield'

export const Scene = ({ userRotationX = 0, userRotationY = 0 }) => {
  const tex = useTexture('./imageJPG.png')
  const cyl = useRef(null)
  const interactionGroup = useRef(null)

  // Continuous rotation
  useFrame((state, delta) => {
    if (cyl.current) {
      cyl.current.rotation.y += delta
    }
  })

  // GSAP simple fade-in on load
  useEffect(() => {
    const timer = setTimeout(() => {
      if (cyl.current && cyl.current.material) {
        // Start invisible
        cyl.current.material.opacity = 0

        // Fade to visible with ease
        gsap.to(cyl.current.material, {
          opacity: 0.9,
          duration: 1.5,
          ease: 'power1.inOut',
          delay: 0.3,
        })
      }
    }, 100)
    
    return () => clearTimeout(timer)
  }, [tex])

  // ✅ Added: mobile-only cylinder scaling (without changing existing values)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        if (cyl.current) {
          cyl.current.scale.set(0.7, 0.7, 0.7) // smaller on mobile
        }
      } else {
        if (cyl.current) {
          cyl.current.scale.set(1, 1, 1) // normal on tablet & desktop
        }
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      {/* Starfield background - render first so it's behind */}
      <Starfield count={8000} radius={50} />
      
      {/* Cylinder group - render after starfield */}
      <group ref={interactionGroup} rotation={[userRotationX, userRotationY, 0]}>
        <group rotation={[0, 1.4, 0.5]} position={[0, 0.6, 0]}>
          <mesh ref={cyl} renderOrder={1}>
            <cylinderGeometry args={[1.2, 1.2, 1, 60, 60, true]} />
            <meshBasicMaterial
              map={tex}
              transparent
              opacity={0.9}
              side={THREE.DoubleSide}
              depthWrite={true}
              color="#ffffff"
            />
          </mesh>
        </group>
      </group>
    </>
  )
}

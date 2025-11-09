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
  const deviceTilt = useRef({ x: 0, y: 0 }) // store device rotation

  // Continuous rotation
  useFrame((state, delta) => {
    if (cyl.current) {
      cyl.current.rotation.y += delta * 1 // normal slow spin
    }

    // ✅ Apply device tilt on mobile/tablet
    if (interactionGroup.current && window.innerWidth <= 900) {
      const targetX = deviceTilt.current.x
      const targetY = deviceTilt.current.y
      // smooth transition for natural tilt
      interactionGroup.current.rotation.x = THREE.MathUtils.lerp(
        interactionGroup.current.rotation.x,
        targetX,
        0.1
      )
      interactionGroup.current.rotation.y = THREE.MathUtils.lerp(
        interactionGroup.current.rotation.y,
        targetY,
        0.1
      )
    } else if (interactionGroup.current) {
      // normal desktop mouse rotation
      interactionGroup.current.rotation.x = userRotationX
      interactionGroup.current.rotation.y = userRotationY
    }
  })

  // ✅ Fade-in animation on load (no flicker)
  useEffect(() => {
    if (!cyl.current || !cyl.current.material) return
    cyl.current.material.opacity = 0

    gsap.to(cyl.current.material, {
      opacity: 0.9,
      duration: 1.5,
      ease: 'power1.inOut',
      delay: 0.3,
    })
  }, [tex])

  // ✅ Responsive scaling for mobile
  useEffect(() => {
    const handleResize = () => {
      if (!cyl.current) return
      if (window.innerWidth <= 600) {
        cyl.current.scale.set(0.7, 0.7, 0.7)
      } else {
        cyl.current.scale.set(1, 1, 1)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // ✅ Device tilt support for mobile & tablet
  useEffect(() => {
    const handleOrientation = (event) => {
      if (window.innerWidth > 900) return // only for mobile/tablet

      const { beta, gamma } = event // beta: front-back tilt, gamma: left-right tilt
      const maxTiltX = 0.4
      const maxTiltY = 0.6

      // Map beta/gamma to limited rotation range
      const x = THREE.MathUtils.clamp((beta / 90) * maxTiltX, -maxTiltX, maxTiltX)
      const y = THREE.MathUtils.clamp((gamma / 90) * maxTiltY, -maxTiltY, maxTiltY)

      deviceTilt.current = { x, y }
    }

    window.addEventListener('deviceorientation', handleOrientation)
    return () => window.removeEventListener('deviceorientation', handleOrientation)
  }, [])

  return (
    <>
      {/* Background stars */}
      <Starfield count={8000} radius={50} />

      {/* Main cylinder */}
      <group ref={interactionGroup} rotation={[userRotationX, userRotationY, 0]}>
        <group rotation={[0, 1.4, 0.5]} position={[0, 0.6, 0]}>
          <mesh ref={cyl} renderOrder={1}>
            <cylinderGeometry args={[1.2, 1.2, 1, 60, 60, true]} />
            <meshBasicMaterial
              map={tex}
              transparent
              opacity={0} // start invisible
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

import React, { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

export const Starfield = ({ count = 8000, radius = 50 }) => {
  const meshRef = useRef(null)
  const timeRef = useRef(0)

  // Generate random star positions in a sphere
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i += 3) {
      // Generate stars in a sphere around the origin
      const theta = Math.random() * Math.PI * 2 // Random angle around Y axis
      const phi = Math.acos(2 * Math.random() - 1) // Random angle from top to bottom
      const r = radius * (0.5 + Math.random() * 0.5) // Random distance from center

      positions[i] = r * Math.sin(phi) * Math.cos(theta)
      positions[i + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i + 2] = r * Math.cos(phi)
    }
    return positions
  }, [count, radius])

  // Generate random colors for stars (white to slightly blue/white)
  const colors = useMemo(() => {
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const intensity = 0.9 + Math.random() * 0.1 // Brighter stars for glow effect
      const color = new THREE.Color()
      
      // Mix white with slight blue tint for some stars
      if (Math.random() > 0.8) {
        color.setRGB(intensity, intensity * 0.95, intensity * 1.1) // Slight blue tint
      } else {
        color.setRGB(intensity, intensity, intensity) // Pure white
      }
      
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }
    return colors
  }, [count])

  // Animate twinkling effect
  useFrame((state, delta) => {
    timeRef.current += delta
    if (meshRef.current) {
      // Much faster rotation speed
      meshRef.current.rotation.y += 0.0015
      
      // Twinkling effect by modulating opacity
      const material = meshRef.current.material
      if (material) {
        material.opacity = 0.8 + Math.sin(timeRef.current * 0.5) * 0.2
      }
    }
  })

  return (
    <points ref={meshRef} renderOrder={0}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.4}
        sizeAttenuation={true}
        vertexColors={true}
        transparent
        opacity={1.0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        depthTest={true}
      />
    </points>
  )
}


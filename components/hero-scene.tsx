"use client"

import { useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Environment } from "@react-three/drei"
import * as THREE from "three"

const BRICK_COLOR = "#c26a3d"
const BRICK_DARK = "#8a4526"
const CREAM = "#ece5dc"

function Brick({
  position,
  rotation,
  scale = 1,
  color = BRICK_COLOR,
}: {
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  color?: string
}) {
  return (
    <mesh position={position} rotation={rotation} scale={scale} castShadow receiveShadow>
      <boxGeometry args={[1.2, 0.55, 0.7]} />
      <meshStandardMaterial color={color} roughness={0.85} metalness={0.05} />
    </mesh>
  )
}

function FloatingStructure() {
  const group = useRef<THREE.Group>(null)

  const bricks = useMemo(() => {
    const items: {
      position: [number, number, number]
      rotation: [number, number, number]
      scale: number
      color: string
    }[] = []
    // A loose spiral tower of bricks
    const count = 26
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 4
      const radius = 1.5 - (i / count) * 0.55
      const y = -2.2 + (i / count) * 4.6
      items.push({
        position: [Math.cos(angle) * radius, y, Math.sin(angle) * radius],
        rotation: [0, -angle + Math.PI / 2, 0],
        scale: 1 - (i / count) * 0.25,
        color: i % 5 === 0 ? BRICK_DARK : BRICK_COLOR,
      })
    }
    return items
  }, [])

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.getElapsedTime()
    group.current.rotation.y = t * 0.12
    // Subtle parallax with pointer
    const targetX = state.pointer.y * 0.12
    const targetZ = state.pointer.x * 0.08
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.04)
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, targetZ, 0.04)
  })

  return (
    <group ref={group}>
      {bricks.map((b, i) => (
        <Float key={i} speed={1.2} rotationIntensity={0.08} floatIntensity={0.35} floatingRange={[-0.06, 0.06]}>
          <Brick position={b.position} rotation={b.rotation} scale={b.scale} color={b.color} />
        </Float>
      ))}
      {/* Keystone cube at top */}
      <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh position={[0, 2.9, 0]} castShadow>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshStandardMaterial color={CREAM} roughness={0.4} metalness={0.1} />
        </mesh>
      </Float>
    </group>
  )
}

function GroundRing() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.z = state.clock.getElapsedTime() * 0.05
  })
  return (
    <mesh ref={ref} position={[0, -2.7, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[2.2, 2.26, 96]} />
      <meshBasicMaterial color={BRICK_COLOR} transparent opacity={0.35} side={THREE.DoubleSide} />
    </mesh>
  )
}

export default function HeroScene() {
  return (
    <div className="h-full w-full" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.4, 8], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[6, 8, 4]} intensity={1.6} color="#ffd9b8" castShadow />
        <pointLight position={[-6, -2, -4]} intensity={0.8} color="#c26a3d" />
        <FloatingStructure />
        <GroundRing />
        <Environment preset="night" />
      </Canvas>
    </div>
  )
}

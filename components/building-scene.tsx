"use client"

import { useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import type { MotionValue } from "framer-motion"
import * as THREE from "three"

const BRICK = "#c26a3d"
const BRICK_DARK = "#8a4526"
const BRICK_LIGHT = "#d98753"
const CREAM = "#ece5dc"
const GLOW = "#ffc48a"

const BRICK_W = 0.62
const BRICK_H = 0.28
const BRICK_D = 0.32
const GAP = 0.05

type BrickInstance = {
  position: [number, number, number]
  rotationY: number
  colorIndex: number // 0 brick, 1 dark, 2 light
}

/**
 * Procedurally lay a brick wall on the XZ plane facing +Z.
 * Openings are rectangles in wall-local coords {x, y, w, h}.
 */
function layWall(
  originX: number,
  originY: number,
  originZ: number,
  width: number,
  height: number,
  rotationY: number,
  openings: { x: number; y: number; w: number; h: number }[] = [],
  perforated = false,
): BrickInstance[] {
  const out: BrickInstance[] = []
  const cols = Math.floor(width / (BRICK_W + GAP))
  const rows = Math.floor(height / (BRICK_H + GAP))
  const dirX = Math.cos(rotationY)
  const dirZ = -Math.sin(rotationY)

  for (let r = 0; r < rows; r++) {
    const offset = r % 2 === 0 ? 0 : (BRICK_W + GAP) / 2
    for (let c = 0; c < cols; c++) {
      const lx = c * (BRICK_W + GAP) + offset + BRICK_W / 2
      const ly = r * (BRICK_H + GAP) + BRICK_H / 2
      if (lx > width) continue
      // Skip bricks inside openings
      const inOpening = openings.some(
        (o) => lx > o.x && lx < o.x + o.w && ly > o.y && ly < o.y + o.h,
      )
      if (inOpening) continue
      // Perforated screen: skip in a diagonal lattice pattern
      if (perforated && (r + c * 2) % 4 === 0) continue

      const seed = (r * 31 + c * 17) % 10
      out.push({
        position: [originX + dirX * lx, originY + ly, originZ + dirZ * lx],
        rotationY,
        colorIndex: seed === 0 ? 1 : seed === 5 ? 2 : 0,
      })
    }
  }
  return out
}

function BrickBuilding() {
  const { bricks } = useMemo(() => {
    let all: BrickInstance[] = []

    // ---- Main volume: front facade (facing camera, +Z), 12 wide x 7 tall
    all = all.concat(
      layWall(-6, 0, 3, 12, 7, 0, [
        { x: 4.4, y: 0, w: 3.2, h: 5.2 }, // grand entry opening
        { x: 0.9, y: 3.6, w: 1.9, h: 1.9 }, // window L
        { x: 9.2, y: 3.6, w: 1.9, h: 1.9 }, // window R
        { x: 0.9, y: 0.8, w: 1.9, h: 1.9 }, // window low L
        { x: 9.2, y: 0.8, w: 1.9, h: 1.9 }, // window low R
      ]),
    )
    // Back wall
    all = all.concat(layWall(-6, 0, -3, 12, 7, 0))
    // Side walls
    all = all.concat(layWall(-6, 0, -3, 6, 7, Math.PI / 2 - Math.PI, []))
    all = all.concat(
      layWall(6, 0, 3, 6, 7, -Math.PI / 2, [{ x: 1.8, y: 1.2, w: 2.4, h: 3.2 }]),
    )

    // ---- Taller tower volume on the left, slightly behind
    all = all.concat(
      layWall(-11, 0, 0.5, 4.6, 11, 0, [
        { x: 1.4, y: 7.6, w: 1.8, h: 2.2 },
        { x: 1.4, y: 4.2, w: 1.8, h: 2.2 },
      ]),
    )
    all = all.concat(layWall(-11, 0, -3, 4.6, 11, 0))
    all = all.concat(layWall(-11, 0, -3, 3.5, 11, Math.PI / 2 - Math.PI))
    all = all.concat(layWall(-6.4, 0, 0.5, 3.5, 11, -Math.PI / 2))

    // ---- Perforated brick screen in front of the entry (the signature detail)
    all = all.concat(layWall(-1.2, 0, 4.6, 3.0, 5.4, 0, [], true))

    return { bricks: all }
  }, [])

  const meshRef = useRef<THREE.InstancedMesh>(null)

  const { matrices, colors } = useMemo(() => {
    const dummy = new THREE.Object3D()
    const colorA = new THREE.Color(BRICK)
    const colorB = new THREE.Color(BRICK_DARK)
    const colorC = new THREE.Color(BRICK_LIGHT)
    const mats: THREE.Matrix4[] = []
    const cols: THREE.Color[] = []
    for (const b of bricks) {
      dummy.position.set(...b.position)
      dummy.rotation.set(0, b.rotationY, 0)
      dummy.updateMatrix()
      mats.push(dummy.matrix.clone())
      cols.push(b.colorIndex === 1 ? colorB : b.colorIndex === 2 ? colorC : colorA)
    }
    return { matrices: mats, colors: cols }
  }, [bricks])

  useFrame(() => {
    const mesh = meshRef.current
    if (!mesh || mesh.userData.initialized) return
    matrices.forEach((m, i) => mesh.setMatrixAt(i, m))
    colors.forEach((c, i) => mesh.setColorAt(i, c))
    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
    mesh.userData.initialized = true
  })

  return (
    <group>
      <instancedMesh ref={meshRef} args={[undefined, undefined, bricks.length]} castShadow receiveShadow>
        <boxGeometry args={[BRICK_W, BRICK_H, BRICK_D]} />
        <meshStandardMaterial roughness={0.88} metalness={0.04} />
      </instancedMesh>

      {/* Roof slabs */}
      <mesh position={[0, 7.15, 0]} castShadow>
        <boxGeometry args={[12.8, 0.3, 6.8]} />
        <meshStandardMaterial color={CREAM} roughness={0.6} />
      </mesh>
      <mesh position={[-8.7, 11.15, -1.25]} castShadow>
        <boxGeometry args={[5.3, 0.3, 4.2]} />
        <meshStandardMaterial color={CREAM} roughness={0.6} />
      </mesh>

      {/* Warm glowing interior seen through openings */}
      <mesh position={[0, 2.6, 2.4]}>
        <planeGeometry args={[3.1, 5.1]} />
        <meshBasicMaterial color={GLOW} toneMapped={false} />
      </mesh>
      <mesh position={[-4.15, 4.55, 2.95]}>
        <planeGeometry args={[1.8, 1.8]} />
        <meshBasicMaterial color={GLOW} toneMapped={false} />
      </mesh>
      <mesh position={[4.15, 4.55, 2.95]}>
        <planeGeometry args={[1.8, 1.8]} />
        <meshBasicMaterial color={GLOW} toneMapped={false} />
      </mesh>
      <mesh position={[-4.15, 1.75, 2.95]}>
        <planeGeometry args={[1.8, 1.8]} />
        <meshBasicMaterial color={GLOW} toneMapped={false} />
      </mesh>
      <mesh position={[4.15, 1.75, 2.95]}>
        <planeGeometry args={[1.8, 1.8]} />
        <meshBasicMaterial color={GLOW} toneMapped={false} />
      </mesh>
      {/* Tower windows */}
      <mesh position={[-8.7, 8.7, 0.45]}>
        <planeGeometry args={[1.7, 2.1]} />
        <meshBasicMaterial color={GLOW} toneMapped={false} />
      </mesh>
      <mesh position={[-8.7, 5.3, 0.45]}>
        <planeGeometry args={[1.7, 2.1]} />
        <meshBasicMaterial color={GLOW} toneMapped={false} />
      </mesh>
      {/* Side window */}
      <mesh position={[5.95, 2.8, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[2.3, 3.1]} />
        <meshBasicMaterial color={GLOW} toneMapped={false} />
      </mesh>

      {/* Ground plane */}
      <mesh position={[0, -0.05, 2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[90, 90]} />
        <meshStandardMaterial color="#211d1a" roughness={0.95} />
      </mesh>

      {/* Reflecting pool in front */}
      <mesh position={[1.5, 0.01, 9]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[9, 4.5]} />
        <meshStandardMaterial color="#2b2320" roughness={0.15} metalness={0.6} />
      </mesh>

      {/* Path to entry */}
      <mesh position={[0, 0.02, 6.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.4, 7]} />
        <meshStandardMaterial color={CREAM} roughness={0.8} />
      </mesh>
    </group>
  )
}

/**
 * Camera path keyframes: [x, y, z] and lookAt targets, sampled by scroll progress.
 */
const CAM_KEYS: { pos: [number, number, number]; look: [number, number, number] }[] = [
  { pos: [26, 16, 34], look: [-2, 3, 0] }, // 0.00 wide aerial
  { pos: [16, 9, 26], look: [-1, 3.2, 0] }, // 0.25 approach
  { pos: [6, 4.5, 18], look: [0, 3, 2] }, // 0.5 eye level facade
  { pos: [0.5, 2.8, 11], look: [0, 2.8, 3] }, // 0.75 at the entry
  { pos: [0.3, 2.6, 5.6], look: [0, 2.6, 2.4] }, // 1.00 into the glow
]

function lerp3(a: [number, number, number], b: [number, number, number], t: number): [number, number, number] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}

function ScrollCamera({ progress }: { progress: MotionValue<number> }) {
  const look = useRef(new THREE.Vector3())

  useFrame((state) => {
    const p = Math.min(Math.max(progress.get(), 0), 1)
    const seg = Math.min(Math.floor(p * (CAM_KEYS.length - 1)), CAM_KEYS.length - 2)
    const local = easeInOut(p * (CAM_KEYS.length - 1) - seg)
    const pos = lerp3(CAM_KEYS[seg].pos, CAM_KEYS[seg + 1].pos, local)
    const tgt = lerp3(CAM_KEYS[seg].look, CAM_KEYS[seg + 1].look, local)

    // Gentle pointer parallax on top of the path
    const px = state.pointer.x * 0.6 * (1 - p)
    const py = state.pointer.y * 0.4 * (1 - p)

    state.camera.position.set(pos[0] + px, pos[1] + py, pos[2])
    look.current.set(tgt[0], tgt[1], tgt[2])
    state.camera.lookAt(look.current)
  })
  return null
}

export default function BuildingScene({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="h-full w-full" aria-hidden="true">
      <Canvas
        camera={{ position: [26, 16, 34], fov: 38 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <fog attach="fog" args={["#141210", 40, 110]} />
        <hemisphereLight args={["#4a4038", "#1a1512", 0.7]} />
        <ambientLight intensity={0.25} />
        <directionalLight position={[18, 22, 14]} intensity={1.9} color="#ffd9b8" />
        <directionalLight position={[-14, 10, -8]} intensity={0.5} color="#6b5a4d" />
        <pointLight position={[0, 3, 5]} intensity={2.2} color={GLOW} distance={16} decay={2} />
        <pointLight position={[-12, 4, -6]} intensity={0.7} color={BRICK} />
        <BrickBuilding />
        <ScrollCamera progress={progress} />
      </Canvas>
    </div>
  )
}

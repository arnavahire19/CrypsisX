import { useRef, useState, useMemo } from 'react'
import { useMotionValue, useMotionValueEvent, type MotionValue } from 'framer-motion'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PresentationControls } from '@react-three/drei'
import * as THREE from 'three'

// Configuration
const CUBE_SIZE = 3 
const CUBIE_SIZE = 1
const SPACING = 0.08
const TOTAL_SIZE = CUBIE_SIZE + SPACING

// Materials
const darkMaterial = new THREE.MeshStandardMaterial({
  color: '#0b0b0c',
  metalness: 0.78,
  roughness: 0.24,
})

function Cubelet({
  position,
  isMiddleSlice,
  hovered,
  sliceRotation,
}: {
  position: THREE.Vector3
  isMiddleSlice: boolean
  hovered: boolean
  sliceRotation: React.MutableRefObject<number>
}) {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((_, delta) => {
    if (!groupRef.current) {
      return
    }

    const targetRotation = isMiddleSlice ? sliceRotation.current : 0
    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotation, 6, delta)
  })

  return (
    <group ref={groupRef} position={position}>
      <mesh geometry={new THREE.BoxGeometry(CUBIE_SIZE, CUBIE_SIZE, CUBIE_SIZE)} material={darkMaterial} castShadow receiveShadow />
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(CUBIE_SIZE, CUBIE_SIZE, CUBIE_SIZE)]} />
        <lineBasicMaterial color={hovered ? '#ffb06e' : '#f97316'} transparent opacity={hovered ? 0.95 : 0.42} />
      </lineSegments>
    </group>
  )
}

function InteractiveCube({
  scrollProgress,
  compact = false,
}: {
  scrollProgress?: MotionValue<number>
  compact?: boolean
}) {
  const groupRef = useRef<THREE.Group>(null!)
  const [hovered, setHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const lastInteractionTime = useRef(Date.now())
  const sliceRotation = useRef(0)
  const sliceTarget = useRef(0)
  const nextEntropyShift = useRef(2.8)
  const driftTarget = useRef({ x: 0.08, y: 0.18, z: 0 })
  const scrollInfluence = useRef(0)
  const { viewport } = useThree()
  const fallbackScrollProgress = useMotionValue(0)
  const activeScrollProgress = scrollProgress ?? fallbackScrollProgress

  // Responsive scale and position
  const isMobile = viewport.width < 7 || compact
  const scale = compact ? 0.68 : isMobile ? 0.82 : 1.2
  const positionX = compact || isMobile ? 0 : viewport.width / 4

  const cubies = useMemo(() => {
    const items = []
    const offset = (CUBE_SIZE - 1) / 2 * TOTAL_SIZE

    for (let x = 0; x < CUBE_SIZE; x++) {
      for (let y = 0; y < CUBE_SIZE; y++) {
        for (let z = 0; z < CUBE_SIZE; z++) {
          if (x === 1 && y === 1 && z === 1) continue
          items.push({
            position: new THREE.Vector3(
              x * TOTAL_SIZE - offset,
              y * TOTAL_SIZE - offset,
              z * TOTAL_SIZE - offset
            ),
            id: `cubie-${x}-${y}-${z}`,
            isMiddleSlice: y === 1 
          })
        }
      }
    }
    return items
  }, [])

  useMotionValueEvent(activeScrollProgress, 'change', (value) => {
    scrollInfluence.current = value
  })

  useFrame((state, delta) => {
    const elapsed = state.clock.elapsedTime
    const isIdle = !isDragging && Date.now() - lastInteractionTime.current > 1800

    if (isIdle && elapsed > nextEntropyShift.current) {
      driftTarget.current = {
        x: THREE.MathUtils.randFloat(-0.22, 0.22),
        y: THREE.MathUtils.randFloat(-0.55, 0.55),
        z: THREE.MathUtils.randFloat(-0.12, 0.12),
      }

      sliceTarget.current += (Math.random() > 0.5 ? 1 : -1) * (Math.PI / 2)
      nextEntropyShift.current = elapsed + THREE.MathUtils.randFloat(2.6, 5)
    }

    sliceRotation.current = THREE.MathUtils.damp(
      sliceRotation.current,
      isIdle ? sliceTarget.current : 0,
      4.8,
      delta,
    )

    const orbitalX = Math.sin(elapsed * 0.52) * 0.035
    const orbitalY = Math.cos(elapsed * 0.33) * 0.06
    const orbitalZ = Math.sin(elapsed * 0.26) * 0.025
    const entropyFactor = compact ? 0.55 : 1
    const targetY = (isIdle ? (driftTarget.current.y + orbitalY) * entropyFactor : 0) + scrollInfluence.current * (compact ? 0.08 : 0.22)
    const targetX = 0.04 + (isIdle ? (driftTarget.current.x + orbitalX) * entropyFactor : 0) + scrollInfluence.current * (compact ? 0.04 : 0.1)
    const targetZ = isIdle ? (driftTarget.current.z + orbitalZ) * entropyFactor : 0
    const targetPosY = -scrollInfluence.current * (compact ? 0.14 : 0.38)
    const targetScale = scale * (hovered ? 1.03 : 1)

    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetY, 4.4, delta)
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetX, 4.2, delta)
    groupRef.current.rotation.z = THREE.MathUtils.damp(groupRef.current.rotation.z, targetZ, 4, delta)
    groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, positionX, 5, delta)
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetPosY, 4.4, delta)

    const nextScale = THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 5.2, delta)
    groupRef.current.scale.setScalar(nextScale)
  })

  return (
    <group 
      ref={groupRef}
      position={[positionX, 0, 0]}
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerDown={() => {
        setIsDragging(true)
        lastInteractionTime.current = Date.now()
      }}
      onPointerUp={() => {
        setIsDragging(false)
        lastInteractionTime.current = Date.now()
      }}
    >
      {cubies.map((cubie) => (
        <Cubelet
          key={cubie.id}
          position={cubie.position}
          isMiddleSlice={cubie.isMiddleSlice}
          hovered={hovered}
          sliceRotation={sliceRotation}
        />
      ))}
    </group>
  )
}

export default function SystemVisualization({
  scrollProgress,
  mode = 'absolute',
  compact = false,
}: {
  scrollProgress?: MotionValue<number>
  mode?: 'absolute' | 'contained'
  compact?: boolean
}) {
  return (
    <div
      className={
        mode === 'absolute'
          ? 'absolute inset-0 -z-10 w-full h-full pointer-events-auto overflow-hidden'
          : 'relative w-full h-full overflow-hidden rounded-[2rem] border border-white/[0.05] bg-background-darker/30'
      }
    >
      <Canvas 
        frameloop="always"
        camera={{ position: [0, 0, compact ? 10.5 : 12], fov: compact ? 42 : 35 }} 
        dpr={compact ? [1, 1.2] : [1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={compact ? 0.68 : 0.55} />
        <directionalLight position={[8, 8, 10]} intensity={compact ? 1.6 : 1.9} color="#ffffff" />
        <pointLight position={[0, 0, 6]} intensity={compact ? 1.05 : 1.3} color="#f97316" />

        <PresentationControls 
          global 
          enabled={!compact}
          config={{ mass: compact ? 1.2 : 1.6, tension: compact ? 180 : 240 }} 
          snap={{ mass: compact ? 2 : 2.5, tension: compact ? 240 : 320 }} 
          rotation={[0, 0, 0]} 
          polar={[-Math.PI / 3, Math.PI / 3]} 
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          <InteractiveCube scrollProgress={scrollProgress} compact={compact} />
        </PresentationControls>
      </Canvas>

      {/* Screen Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(249,115,22,0.08)]" />
        
        <div className={compact ? 'absolute -top-28 -right-20 w-[300px] h-[300px] rounded-full bg-ember/10 blur-[90px]' : 'absolute -top-60 -right-60 w-[800px] h-[800px] rounded-full bg-ember/10 blur-[140px]'} />
        <div className={compact ? 'absolute -bottom-24 -left-16 w-[260px] h-[260px] rounded-full bg-ember/5 blur-[80px]' : 'absolute -bottom-60 -left-60 w-[700px] h-[700px] rounded-full bg-ember/5 blur-[120px]'} />

        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-ember/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-ember/30 to-transparent" />
        <div className="absolute top-12 left-12 w-6 h-6 border-t border-l border-ember/30" />
        <div className="absolute bottom-12 right-12 w-6 h-6 border-b border-r border-ember/30" />
      </div>
    </div>
  )
}

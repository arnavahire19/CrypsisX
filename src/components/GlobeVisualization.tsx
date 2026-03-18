import { useState, useEffect, useRef } from 'react'
import Globe from 'react-globe.gl'
import { useMediaQuery } from '../hooks/useMediaQuery'

// High-fidelity locations for attack simulation
const LOCATIONS = [
  { name: 'USA', lat: 37.0902, lng: -95.7129 },
  { name: 'Russia', lat: 61.5240, lng: 105.3188 },
  { name: 'China', lat: 35.8617, lng: 104.1954 },
  { name: 'Brazil', lat: -14.2350, lng: -51.9253 },
  { name: 'Australia', lat: -25.2744, lng: 133.7751 },
  { name: 'Germany', lat: 51.1657, lng: 10.4515 },
  { name: 'UK', lat: 55.3781, lng: -3.4360 },
  { name: 'India', lat: 20.5937, lng: 78.9629 },
  { name: 'Japan', lat: 36.2048, lng: 138.2529 },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198 },
  { name: 'UAE', lat: 23.4241, lng: 53.8478 }
]

const ATTACK_TYPES = [
  'Phishing Intercepted',
  'Deepfake Neutralized',
  'Impersonation Blocked',
  'DDoS Mitigation Active',
  'Protocol Breach Prevented'
]

interface ArcData {
  startLat: number
  startLng: number
  endLat: number
  endLng: number
  color: string[]
  id: string
}

interface LabelData {
  lat: number
  lng: number
  text: string
  id: string
}

export default function GlobeVisualization() {
  const globeRef = useRef<any>(null!)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const isMobile = useMediaQuery('(max-width: 767px)')
  const [countries, setCountries] = useState({ features: [] })
  const [arcsData, setArcsData] = useState<ArcData[]>([])
  const [labelsData, setLabelsData] = useState<LabelData[]>([])
  const [canvasWidth, setCanvasWidth] = useState(1200)
  const [isHovered, setIsHovered] = useState(false)
  const globeHeight = isMobile ? 280 : 400

  useEffect(() => {
    // High-precision GeoJSON for defined silhouettes
    fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(setCountries)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const start = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)]
      let end = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)]
      while (end === start) {
        end = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)]
      }
      
      const type = ATTACK_TYPES[Math.floor(Math.random() * ATTACK_TYPES.length)]
      const id = Math.random().toString(36).substring(7)

      const newArc: ArcData = {
        startLat: start.lat,
        startLng: start.lng,
        endLat: end.lat,
        endLng: end.lng,
        color: ['#f97316', '#ffffff', '#f97316'], // Glow trail effect
        id
      }

      setArcsData(prev => [...prev.slice(-6), newArc])

      // Event Impact & Label
      setTimeout(() => {
        const newLabel: LabelData = {
          lat: end.lat,
          lng: end.lng,
          text: type,
          id
        }
        setLabelsData(prev => [...prev.slice(-2), newLabel])
        
        setTimeout(() => {
          setLabelsData(prev => prev.filter(l => l.id !== id))
        }, 2500)
      }, 1200) // Timing refined for travel speed

      setTimeout(() => {
        setArcsData(prev => prev.filter(a => a.id !== id))
      }, 3000)

    }, 3500)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls()
      controls.autoRotate = true
      controls.autoRotateSpeed = 0.25
      controls.enableZoom = false
      controls.enablePan = false
      controls.enableRotate = false
      controls.enableDamping = true
      controls.dampingFactor = 0.05
      globeRef.current.pointOfView({ lat: 20, lng: 0, altitude: isMobile ? 2.35 : 2.2 })
      const scale = isMobile ? 0.72 : 0.8
      globeRef.current.scene().scale.set(scale, scale, scale)
    }
  }, [isMobile])

  useEffect(() => {
    const controls = globeRef.current?.controls?.()
    if (!controls) {
      return
    }

    controls.enableRotate = isHovered
  }, [isHovered])

  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    const observer = new ResizeObserver((entries) => {
      const nextWidth = Math.floor(entries[0]?.contentRect.width ?? 1200)
      if (nextWidth > 0) {
        setCanvasWidth(nextWidth)
      }
    })

    observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <div className="w-full">
      <div ref={containerRef} className="mx-auto max-w-[1200px]">
        <div
          className="relative w-full"
          style={{ height: globeHeight }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="w-full" style={{ height: globeHeight, pointerEvents: isHovered ? 'auto' : 'none' }}>
            <Globe
              ref={globeRef}
              backgroundColor="rgba(0,0,0,0)"

            // Continents: Stronger silhouettes
            polygonsData={countries.features}
            polygonCapColor={() => 'rgba(255, 255, 255, 0.05)'}
            polygonSideColor={() => 'rgba(0, 0, 0, 0.2)'}
            polygonStrokeColor={() => 'rgba(249, 115, 22, 0.15)'}
            polygonAltitude={0.012}

            // Atmosphere: High-depth glow
            atmosphereColor="#f97316"
            atmosphereAltitude={0.2}

            // Arcs: Smooth trails
            arcsData={arcsData}
            arcColor="color"
            arcDashLength={0.5}
            arcDashGap={2}
            arcDashAnimateTime={1200}
            arcStroke={0.4}
            arcAltitudeAutoScale={0.6}

            // Impact Rings
            ringsData={labelsData}
            ringColor={() => '#f97316'}
            ringMaxRadius={2.5}
            ringPropagationSpeed={3}
            ringRepeatPeriod={800}

            // Floating HUDs: Premium Clarity
            htmlElementsData={labelsData}
            htmlElement={(d: any) => {
              const el = document.createElement('div')
              el.innerHTML = `
                <div class="glass-panel px-4 py-2 border-white/20 bg-background-lighter/80 backdrop-blur-xl shadow-[0_0_30px_rgba(249,115,22,0.2)] animate-globe-popup">
                  <div class="flex items-center gap-3">
                    <div class="w-2 h-2 rounded-full bg-ember shadow-[0_0_10px_#f97316]"></div>
                    <span class="text-[11px] uppercase tracking-[0.2em] font-black text-white font-sans">${d.text}</span>
                  </div>
                  <div class="text-[8px] uppercase tracking-[0.3em] text-white/40 font-bold mt-1.5 border-t border-white/5 pt-1.5">Action_Executed_Live</div>
                </div>
              `
              return el
            }}

              width={canvasWidth}
              height={globeHeight}
            />
          </div>

          {/* Soft edge vignette */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_48%,rgba(8,8,8,0.18)_72%,rgba(8,8,8,0.48)_100%)]" />
        </div>
      </div>
    </div>
  )
}

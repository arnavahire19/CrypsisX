import Lenis from 'lenis'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from 'react'

type ScrollTarget = string | number | HTMLElement

type SmoothScrollContextValue = {
  scrollTo: (target: ScrollTarget, options?: { offset?: number; immediate?: boolean }) => void
  scrollToId: (id: string, options?: { offset?: number; immediate?: boolean }) => void
}

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(null)

function resolveTarget(target: ScrollTarget) {
  if (typeof target !== 'string') {
    return target
  }

  try {
    return document.querySelector<HTMLElement>(target) ?? target
  } catch {
    return target
  }
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  const scrollTo = useCallback(
    (target: ScrollTarget, options?: { offset?: number; immediate?: boolean }) => {
      lenisRef.current?.scrollTo(resolveTarget(target), {
        duration: 0.95,
        offset: options?.offset ?? -96,
        immediate: options?.immediate ?? false,
      })
    },
    [],
  )

  const scrollToId = useCallback(
    (id: string, options?: { offset?: number; immediate?: boolean }) => {
      scrollTo(`#${id}`, options)
    },
    [scrollTo],
  )

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.95,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.85,
      touchMultiplier: 1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    })

    lenisRef.current = lenis

    let rafId = 0

    const raf = (time: number) => {
      lenis.raf(time)
      rafId = window.requestAnimationFrame(raf)
    }

    const onAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      const anchor = target?.closest('a[href^="#"]') as HTMLAnchorElement | null
      const href = anchor?.getAttribute('href')

      if (!href || href === '#') {
        return
      }

      const section = document.querySelector<HTMLElement>(href)
      if (!section) {
        return
      }

      event.preventDefault()
      window.history.pushState(null, '', href)
      lenis.scrollTo(section, { duration: 0.95, offset: -96 })
    }

    rafId = window.requestAnimationFrame(raf)
    document.addEventListener('click', onAnchorClick)

    if (window.location.hash) {
      window.requestAnimationFrame(() => {
        const target = document.querySelector<HTMLElement>(window.location.hash)
        if (target) {
          lenis.scrollTo(target, { immediate: true, offset: -96 })
        }
      })
    }

    return () => {
      window.cancelAnimationFrame(rafId)
      document.removeEventListener('click', onAnchorClick)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  const value = useMemo(
    () => ({
      scrollTo,
      scrollToId,
    }),
    [scrollTo, scrollToId],
  )

  return <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>
}

export function useSmoothScroll() {
  const context = useContext(SmoothScrollContext)

  if (!context) {
    throw new Error('useSmoothScroll must be used within SmoothScrollProvider')
  }

  return context
}

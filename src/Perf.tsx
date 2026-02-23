import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Application, extend, useExtend, useTick } from '@pixi/react'
import { Container, Graphics as PixiGraphics } from 'pixi.js'

const COUNT = 100

extend({ Container, Graphics: PixiGraphics })

type ActiveTest = 1 | 2 | 3 | null

function Test1PixiRects() {
  useExtend({ Graphics: PixiGraphics })
  const [xs, setXs] = useState(() => Array(COUNT).fill(0).map((_, i) => (i % 10) * 80))
  const draw = useCallback((g: PixiGraphics) => {
    g.clear()
    g.rect(0, 0, 20, 20)
    g.fill({ color: 0xff0000 })
  }, [])

  const update = useCallback(() => {
    setXs((prev) => prev.map((x) => (x + 2) % 800))
  }, [])
  useTick(update)

  return (
    <pixiContainer>
      {xs.map((x, i) => (
        <pixiContainer key={i} x={x} y={Math.floor(i / 10) * 50 + 50}>
          <pixiGraphics draw={draw} />
        </pixiContainer>
      ))}
    </pixiContainer>
  )
}

function Test2PixiRefs() {
  useExtend({ Graphics: PixiGraphics })
  const refs = useRef<(Container | null)[]>([])
  const draw = useCallback((g: PixiGraphics) => {
    g.clear()
    g.rect(0, 0, 20, 20)
    g.fill({ color: 0x00ff00 })
  }, [])

  useTick(() => {
    refs.current.forEach((r) => {
      if (r) r.x = (r.x + 2) % 800
    })
  })

  return (
    <pixiContainer>
      {Array(COUNT).fill(0).map((_, i) => (
        <pixiContainer
          key={i}
          ref={(r) => { refs.current[i] = r as any }}
          x={(i % 10) * 80}
          y={Math.floor(i / 10) * 50 + 50}
        >
          <pixiGraphics draw={draw} />
        </pixiContainer>
      ))}
    </pixiContainer>
  )
}

function Test3DomDivs() {
  const [xs, setXs] = useState(() => Array(COUNT).fill(0).map((_, i) => (i % 10) * 80))

  useEffect(() => {
    let raf: number
    const tick = () => {
      setXs((prev) => prev.map((x) => (x + 2) % 800))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div style={{ position: 'relative', width: 800, height: 600, background: '#1a1a2e' }}>
      {xs.map((x, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: x,
            top: Math.floor(i / 10) * 50 + 50,
            width: 20,
            height: 20,
            background: '#ff00ff',
          }}
        />
      ))}
    </div>
  )
}

export const Perf: React.FC = () => {
  const [active, setActive] = useState<ActiveTest>(null)

  return (
    <div style={{ padding: 16, marginLeft: 170, fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button onClick={() => setActive(1)}>Test 1: Pixi + React useState</button>
        <button onClick={() => setActive(2)}>Test 2: Pixi ticker + refs</button>
        <button onClick={() => setActive(3)}>Test 3: DOM divs + useState</button>
        <button onClick={() => setActive(null)}>Stop</button>
      </div>
      <div style={{ width: 800, height: 600, border: '1px solid #333' }}>
        {active === 1 && (
          <Application background="#1a1a2e" width={800} height={600}>
            <Test1PixiRects />
          </Application>
        )}
        {active === 2 && (
          <Application background="#1a1a2e" width={800} height={600}>
            <Test2PixiRefs />
          </Application>
        )}
        {active === 3 && <Test3DomDivs />}
      </div>
    </div>
  )
}

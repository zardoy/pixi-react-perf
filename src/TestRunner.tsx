import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { Application, useApplication } from '@pixi/react'
import { VERSION } from 'pixi.js'
import { formatTestIdSentenceCase, type PixiTestDefinition } from '@/tests'
import { ErrorBoundary } from '@/ErrorBoundary'
import { useCanvasSize } from '@/useCanvasSize'

const HEADER_WIDE_MIN_PX = 560

function useMinWidth(minWidth: number): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(`(min-width: ${minWidth}px)`)
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    },
    () => window.matchMedia(`(min-width: ${minWidth}px)`).matches,
    () => true,
  )
}

const page: React.CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  background: '#0f0f14',
  color: '#ececf1',
  fontFamily: 'system-ui, -apple-system, Segoe UI, sans-serif',
}

const HEADER_HEIGHT = 60

const header: React.CSSProperties = {
  flexShrink: 0,
  display: 'flex',
  alignItems: 'flex-start',
  gap: 16,
  padding: '16px 20px',
  borderBottom: '1px solid #25252e',
  background: 'rgba(18, 18, 24, 0.98)',
  height: HEADER_HEIGHT,
}

const backBtn: React.CSSProperties = {
  marginTop: 2,
  padding: '8px 14px',
  borderRadius: 8,
  border: '1px solid #353542',
  background: '#1c1c26',
  color: '#e4e4ec',
  cursor: 'pointer',
  font: 'inherit',
  fontSize: 14,
}

const headerMain: React.CSSProperties = {
  flex: 1,
  minWidth: 0,
}

const testTitle: React.CSSProperties = {
  margin: '0 0 6px',
  fontSize: 20,
  fontWeight: 650,
}

const meta: React.CSSProperties = {
  fontSize: 13,
  color: '#8b8b9a',
  marginBottom: 0,
}

const desc: React.CSSProperties = {
  margin: '10px 0 0',
  fontSize: 14,
  color: '#b4b4c4',
  lineHeight: 1.5,
  maxWidth: 720,
}

const canvasWrap: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 20,
  minHeight: 0,
}

type Props = {
  test: PixiTestDefinition
  onBack: () => void
}

const SetupWrapper = ({ Setup }: { Setup: React.FC }) => {
  const { app } = useApplication()

  globalThis.app = app

  return <ErrorBoundary>
    <Setup />
  </ErrorBoundary>
}

export const TestRunner: React.FC<Props> = ({ test, onBack }) => {
  const { Setup } = test
  const headerWide = useMinWidth(HEADER_WIDE_MIN_PX)
  const heading = formatTestIdSentenceCase(test.id)
  const { height, pixelRatio, width } = useCanvasSize()
  const canvasWrapRef = useRef<HTMLDivElement>(null)
  const [setupKey, setSetupKey] = useState(0)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code !== 'KeyR') return
      if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return
      const t = e.target
      if (t instanceof HTMLElement && t.closest('input, textarea, select, [contenteditable="true"]')) return
      setSetupKey((k) => k + 1)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <div style={page}>
      <header style={header}>
        <button type="button" style={backBtn} onClick={onBack}>
          ← Back
        </button>
        <div style={headerMain}>
          <h1 style={testTitle}>{heading}</h1>
          <p style={meta}>
            {headerWide ? (
              <>
                Test Pixi {test.pixiVersion} · Current {VERSION}
              </>
            ) : (
              <>
                <span style={{ display: 'block' }}>Test Pixi {test.pixiVersion}</span>
                <span style={{ display: 'block' }}>Current {VERSION}</span>
              </>
            )}
          </p>
          {test.description ? <p style={desc}>{test.description}</p> : null}
        </div>
      </header>
      <div style={canvasWrap} ref={canvasWrapRef}>
        <Application background="#1a1a2e" width={width} height={height - HEADER_HEIGHT} resolution={pixelRatio} autoDensity autoStart antialias hello resizeTo={canvasWrapRef.current ?? undefined}>
          <SetupWrapper key={setupKey} Setup={Setup} />
        </Application>
      </div>
    </div>
  )
}

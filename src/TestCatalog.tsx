import React from 'react'
import { formatTestIdSentenceCase, getTestsByCategory, type PixiTestDefinition } from '@/tests'

const shell: React.CSSProperties = {
  minHeight: '100vh',
  boxSizing: 'border-box',
  padding: '32px 24px 48px',
  background: 'linear-gradient(165deg, #0c0c0f 0%, #12121a 45%, #0a0a0e 100%)',
  color: '#ececf1',
  fontFamily: 'system-ui, -apple-system, Segoe UI, sans-serif',
}

const title: React.CSSProperties = {
  fontSize: 28,
  fontWeight: 650,
  letterSpacing: '-0.02em',
  margin: '0 0 8px',
}

const subtitle: React.CSSProperties = {
  margin: '0 0 36px',
  fontSize: 15,
  color: '#8b8b9a',
  maxWidth: 520,
  lineHeight: 1.5,
}

const categoryLabel: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: '#6b6b7a',
  margin: '28px 0 12px',
}

const tileGrid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
  gap: 12,
  maxWidth: 900,
}

const tileBtn: React.CSSProperties = {
  textAlign: 'left',
  padding: '16px 18px',
  borderRadius: 12,
  border: '1px solid #2a2a34',
  background: 'rgba(26, 26, 34, 0.85)',
  color: '#f4f4f8',
  cursor: 'pointer',
  transition: 'border-color 0.15s, background 0.15s, transform 0.12s',
  font: 'inherit',
}

type Props = {
  onSelect: (test: PixiTestDefinition) => void
}

export const TestCatalog: React.FC<Props> = ({ onSelect }) => {
  const byCategory = getTestsByCategory()

  return (
    <div style={shell}>
      <h1 style={title}>Pixi tests</h1>
      <p style={subtitle}>
        Pick a scenario to open it in an isolated canvas. Tiles are grouped by category.
      </p>
      {[...byCategory.entries()].map(([category, tests]) => (
        <section key={category}>
          <h2 style={categoryLabel}>{formatCategory(category)}</h2>
          <div style={tileGrid}>
            {tests.map((test) => (
              <button
                key={test.id}
                type="button"
                style={tileBtn}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#4f46e5'
                  e.currentTarget.style.background = 'rgba(36, 36, 52, 0.95)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#2a2a34'
                  e.currentTarget.style.background = 'rgba(26, 26, 34, 0.85)'
                }}
                onClick={() => onSelect(test)}
              >
                <div style={{ fontWeight: 600, fontSize: 16 }}>{formatTestIdSentenceCase(test.id)}</div>
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function formatCategory(slug: string): string {
  return slug
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

import React, { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = { children: ReactNode; fallback?: ReactNode }

type State = { error: Error | null }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Test scene error:', error, info.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        this.props.fallback ?? (
          <div
            style={{
              padding: 16,
              borderRadius: 8,
              background: 'rgba(220, 38, 38, 0.12)',
              border: '1px solid rgba(220, 38, 38, 0.35)',
              color: '#fecaca',
              fontFamily: 'system-ui, sans-serif',
              fontSize: 14,
            }}
          >
            <strong style={{ display: 'block', marginBottom: 8 }}>Scene crashed</strong>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {this.state.error.message}
            </pre>
          </div>
        )
      )
    }
    return this.props.children
  }
}

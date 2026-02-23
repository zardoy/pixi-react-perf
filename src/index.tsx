/// <reference types="@rsbuild/core/types" />
import React from 'react'
import '@pixi/layout/react'

import { createRoot } from 'react-dom/client'
import { Perf } from './Perf'

export const App: React.FC = () => {
  return (
    <div>
      <Perf />
      {/* <PixiStage /> */}
      {/* <ParticleEffects /> */}
    </div>
  )
}

const container = document.getElementById('root')
if (!container) {
  throw new Error('Root element not found')
}

const root = createRoot(container)
root.render(React.createElement(App))

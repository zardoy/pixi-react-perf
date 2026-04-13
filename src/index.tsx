/// <reference types="@rsbuild/core/types" />
import React, { useCallback, useState } from 'react'
import '@pixi/layout/react'
import * as PIXI from 'pixi.js'

import { createRoot } from 'react-dom/client'
import { TestCatalog } from '@/TestCatalog'
import { TestRunner } from '@/TestRunner'
import type { PixiTestDefinition } from '@/tests'

globalThis.PIXI = PIXI

export const App: React.FC = () => {
  const [active, setActive] = useState<PixiTestDefinition | null>(null)

  const handleSelect = useCallback((test: PixiTestDefinition) => {
    setActive(test)
  }, [])

  const handleBack = useCallback(() => {
    setActive(null)
  }, [])

  if (active) {
    return <TestRunner test={active} onBack={handleBack} />
  }

  return <TestCatalog onSelect={handleSelect} />
}

const container = document.getElementById('root')
if (!container) {
  throw new Error('Root element not found')
}

const root = createRoot(container)
root.render(React.createElement(App))

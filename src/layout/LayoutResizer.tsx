import '@pixi/layout/react'
import '@pixi/layout'

import { useApplication } from '@pixi/react'
import React, { useEffect } from 'react'

interface LayoutResizerProps {
  children: React.ReactNode
}

export const LayoutResizer: React.FC<LayoutResizerProps> = ({ children }) => {
  const { app } = useApplication()

  useEffect(() => {
    if (!app.renderer) return

    const handleResize = () => {
      app.stage.layout = {
        width: app.screen.width,
        height: app.screen.height,
        justifyContent: 'center',
        alignItems: 'center',
      }

      // void app.renderer.layout.enableDebug(true)
    }

    app.renderer.on('resize', handleResize)

    handleResize()

    return () => {
      app.renderer.off('resize', handleResize)
    }
  }, [app.renderer])

  return children
}

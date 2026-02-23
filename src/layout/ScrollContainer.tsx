//@ts-nocheck
import { LayoutResizer } from '@/layout/LayoutResizer'
import { LayoutContainer } from '@pixi/layout/components'
import '@pixi/layout/react'
import { Application, useExtend } from '@pixi/react'
import { Container } from 'pixi.js'

const ScrollContainerDemo = () => {
    useExtend({LayoutContainer: LayoutContainer})

  return <pixiLayoutContainer layout={{
    width: 200,
    height: 300,
    backgroundColor: 'red',
    overflow: 'scroll',
    flexDirection: 'column',
  }}>
    <pixiLayoutContainer layout={{
      width: 100,
      height: 400,
      backgroundColor: 'blue',
      flexShrink: 0,
    }}>

    </pixiLayoutContainer><pixiLayoutContainer layout={{
      width: 100,
      height: 400,
      backgroundColor: 'green',
      flexShrink: 0,
    }}>

    </pixiLayoutContainer>
        </pixiLayoutContainer>
}

export const ScrollContainerApp = () => {
    return <Application background="#1a1a2e" width={800} height={600}>
    <LayoutResizer>
      <ScrollContainerDemo />
    </LayoutResizer>
  </Application>
}

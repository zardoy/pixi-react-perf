import React from 'react'
import { extend } from '@pixi/react'
import { Text } from 'pixi.js'
import type { PixiTestDefinition } from './shared/types'
import { Container } from '@/tests/shared/Container'

extend({ Text })

const Setup: React.FC = () => {
  return <pixiContainer layout={{ marginTop: -10, gap: 5, alignItems: 'center', justifyContent: 'flex-start' }}>
    <Container
      debug
      layout={{ width: 200, height: 30 }}
      width={100}
      height={20}
    >
      {null}
    </Container>
    <pixiContainer layout={{ width: 600 }}>
      <pixiText
        text='Lorem ipsum dolor sit amet, consectetur adipiscing elit; sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

        style={{
          // breakWords: true,
          wordWrap: true,
          wordWrapWidth: 600,
        }}

      />
    </pixiContainer>
  </pixiContainer>
}

export const pixiTextTest: PixiTestDefinition = {
  id: 'pixi-text',
  category: 'bugs',
  pixiVersion: '',
  Setup,
}

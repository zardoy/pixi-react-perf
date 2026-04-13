import type { FC } from 'react'

export type PixiTestDefinition = {
  id: string
  category: string
  pixiVersion: string
  description?: string
  Setup: FC
}

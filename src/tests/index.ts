import type { PixiTestDefinition } from './shared/types'
import { pixiTextTest } from './PixiText'

export type { PixiTestDefinition } from './shared/types'
export { pixiTextTest } from './PixiText'
export { formatTestIdSentenceCase } from './shared/formatTestId'

export const allTests: PixiTestDefinition[] = [pixiTextTest]

export function getTestsByCategory(): Map<string, PixiTestDefinition[]> {
  const map = new Map<string, PixiTestDefinition[]>()
  for (const test of allTests) {
    const list = map.get(test.category)
    if (list) {
      list.push(test)
    } else {
      map.set(test.category, [test])
    }
  }
  return new Map([...map.entries()].sort(([a], [b]) => a.localeCompare(b)))
}

export function getTestById(id: string): PixiTestDefinition | undefined {
  return allTests.find((t) => t.id === id)
}

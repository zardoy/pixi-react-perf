/** Sentence case label from a kebab/snake id, e.g. `pixi-text` → `Pixi text`. */
export function formatTestIdSentenceCase(id: string): string {
  const normalized = id
    .split(/[-_]+/)
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
    .trim()
  if (!normalized) {
    return id
  }
  return normalized.charAt(0).toUpperCase() + normalized.slice(1)
}

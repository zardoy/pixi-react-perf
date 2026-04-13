import { proxy, useSnapshot } from 'valtio'

export interface CanvasSize {
  width: number
  height: number
}

export interface CanvasSizeWithPixelRatio extends CanvasSize {
  pixelRatio: number
}

let pixelRatioOverride: number | undefined

export const setPixelRatioOverride = (pixelRatio: number) => {
  pixelRatioOverride = pixelRatio
}

// we can't use resize event due webkit bug as sometimes it can be called too early before window dimensions are set
// so we use requestAnimationFrame to check dimensions
// also by using raf we elimante too frequent resize updates issue

export const getPixelRatio = () => {
  if (pixelRatioOverride !== undefined) return pixelRatioOverride

  return Math.min(window.devicePixelRatio || 1, 3)
}

const canvasSizeProxy = proxy<CanvasSizeWithPixelRatio>({
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: getPixelRatio(),
})

let isRunning = false
let lastWidth = window.innerWidth
let lastHeight = window.innerHeight
let lastPixelRatio = getPixelRatio()

const checkDimensions = () => {
  const currentWidth = window.innerWidth
  const currentHeight = window.innerHeight
  const currentPixelRatio = getPixelRatio()

  if (
    currentWidth !== lastWidth ||
    currentHeight !== lastHeight ||
    currentPixelRatio !== lastPixelRatio
  ) {
    canvasSizeProxy.width = currentWidth
    canvasSizeProxy.height = currentHeight
    canvasSizeProxy.pixelRatio = currentPixelRatio

    lastWidth = currentWidth
    lastHeight = currentHeight
    lastPixelRatio = currentPixelRatio
  }

  // Continue the loop
  if (isRunning) {
    requestAnimationFrame(checkDimensions)
  }
}

// Start the dimensions check loop immediately
const startDimensionsCheck = () => {
  if (!isRunning) {
    isRunning = true
    requestAnimationFrame(checkDimensions)
  }
}

// Start immediately when module loads
startDimensionsCheck()

// Also restart if window becomes visible (handles tab switching)
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && !isRunning) {
      startDimensionsCheck()
    }
  })
}

export const getCanvasSize = () => {
  return canvasSizeProxy
}

export const useCanvasSize = (): CanvasSizeWithPixelRatio => {
  return useSnapshot(canvasSizeProxy)
}

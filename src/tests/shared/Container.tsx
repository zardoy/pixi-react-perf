import { PixiReactElementProps, useExtend } from '@pixi/react'
import { Container as PIXIContainer } from 'pixi.js'
import { Graphics } from 'pixi.js'
import { LayoutContainer } from '@pixi/layout/components'
import { useEffect, useMemo } from 'react'
import { useRef } from 'react'

export interface ContainerProps extends Omit<
  PixiReactElementProps<typeof PIXIContainer>,
  ''
> {
  children: React.ReactNode
  itemRef?: React.RefObject<PIXIContainer>
  label?: string
  centerX?: boolean
  centerY?: boolean
  x?: number
  y?: number
  width?: number
  height?: number
  debug?: boolean | number
  scale?: number
  useLayoutContainer?: boolean
}

/** Debug levels: 1=2px red border, 2=2px blue border, 3=blue border+blue bg, 4=blue border+green bg, 5=same as 4 but opaque */
const createDebugDraw = (width: number, height: number, debug: boolean | number | undefined) => (graphics: Graphics) => {
    graphics.clear()
    const level = debug === true ? 1 : (typeof debug === 'number' ? debug : 0)
    if (level >= 3) {
      graphics.rect(0, 0, width, height)
      const bgColor = level >= 4 ? 0x00FF00 : 0x0000FF
      const alpha = level >= 5 ? 1 : 0.2
      graphics.fill({ color: bgColor, alpha })
    }
    if (level >= 1) {
      const borderColor = level >= 2 ? 0x0000FF : 0xFF0000
      graphics.setStrokeStyle({ color: borderColor, width: 2 })
      graphics.rect(0, 0, width, height)
      graphics.stroke()
    }
  }

export const Container: React.FC<ContainerProps> = ({
    children,
    itemRef,
    centerX,
    centerY,
    width,
    height,
    debug,
    x: xOffset,
    y: yOffset,
    layout,
    useLayoutContainer = false,
    ...props
  }) => {
    useExtend({ Container: PIXIContainer, Graphics, LayoutContainer })

    const internalRef = useRef<PIXIContainer>(null)
    const containerRef = itemRef || internalRef

    const draw = useMemo(() => {
      return {
        debug: createDebugDraw(width!, height!, debug),
        interactiveBackground: (g: Graphics) => {
          g.clear()
          g.rect(0, 0, width!, height!)
          g.fill({ color: 0x000000, alpha: 0 })
        },
      }
    }, [width, height, debug])

    const ContainerComponent = useLayoutContainer ? 'pixiLayoutContainer' : 'pixiContainer' as any

    return (
      <ContainerComponent
        ref={(instance) => {
          if (instance && itemRef && 'current' in itemRef) {
            itemRef.current = instance
          }
          containerRef.current = instance
        }}
        width={width}
        height={height}
        layout={(layout && width && height) ? { width, height, ...typeof layout === 'object' ? layout : {} } : layout}
        {...props}
      >
        {children}
        {debug && <pixiGraphics draw={draw.debug} width={width!} height={height!} />}
      </ContainerComponent>
    )
  }

import React from 'react'
import { Application, useExtend } from '@pixi/react'
import { Container, Graphics } from 'pixi.js'
import { useEffect, useRef, useState } from 'react'

const Item = React.memo(({id, row}: {id: number, row: number}) => {
    useExtend({ Container, Graphics })

    useEffect(() => {
        console.log('effect', id, row)
    })

    return <pixiContainer x={id * 10} y={row * 10}>
        <pixiGraphics draw={g => {
            g.clear()
            g.rect(0, 0, 10, 10)
            g.fill({ color: 0x0000ff })
        }} />
    </pixiContainer>
}, (prev, next) => prev.id === next.id)

export const List = () => {
    const [count, setCount] = useState(0)
    const items = useRef<{id: number, row: number}[]>([{ id: 0, row: 0 }, { id: 1, row: 0 }])

    useEffect(() => {
        globalThis.testNext = () => {
            items.current[0].row++
            setCount(c => c + 1)
        }
    }, [])

    return <Application background="#1a1a2e" width={800} height={600}>
        {items.current.map((item) => (
            <Item key={item.id} id={item.id} row={item.row} />
        ))}
    </Application>
}

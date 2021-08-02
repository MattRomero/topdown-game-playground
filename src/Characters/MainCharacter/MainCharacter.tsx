import React, { useState, useEffect } from "react";
import './MainCharacter.scss';

const MainCharacter = () => {
    const [position,setPosition] = useState({ x: 0, y: 0 })
    const [keyDown, setKeyDown] = useState<string | null>(null)    
    const throttleRef = React.useRef<boolean>(false)
    
    const speed = 20;
    const pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--pixel-size'))
    const moveSpeed = pixelSize*speed

    const styles = {
        left: `${position.x}px`,
        top: `${position.y}px`,
    }

    useEffect(() => {
        if (!keyDown) return
        if (throttleRef.current) { return }
        else {
            throttleRef.current = true
            setTimeout(() => { setPosition(prev => ({...prev})); throttleRef.current = false }, 30) 
            setPosition(prev => { 
                let newY = -1, newX = -1;
                if (keyDown === 'ArrowUp') {
                    newY = prev.y-(moveSpeed)
                    if (newY < 0) newY = 550
                }
                else if (keyDown === 'ArrowDown') {
                    newY = prev.y+(moveSpeed)
                    if (newY > 550) newY = 0
                }
                else if (keyDown === 'ArrowLeft') {
                    newX = prev.x-(moveSpeed)
                    if (newX < 0) newX = 750
                }
                else if (keyDown === 'ArrowRight') {
                    newX = prev.x+(moveSpeed)
                    if (newX > 750) newX = 0
                }
                return { ...prev, ...(newY >= 0 ? { y: newY } : {}), ...(newX >= 0 ? { x: newX } : {}) }
            })
        }
    }, [position, moveSpeed, keyDown])

    document.addEventListener("keydown", (e) => {
        if (!keyDown !== null && (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
            setKeyDown(e.key)
        }
    })

    document.addEventListener("keyup", (e) => {
        if (e.key === keyDown) setKeyDown(null)
    })
    
    return (
        <div className="main-character" style={styles} />
    )
}

export default MainCharacter
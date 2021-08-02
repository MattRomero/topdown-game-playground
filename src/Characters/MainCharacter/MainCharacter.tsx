import React, { useState, useEffect } from "react";
import classNames from "classnames";

import './MainCharacter.scss';
import CharacterSprite from './character.png'; // Tell webpack this JS file uses this image


const MainCharacter = () => {
    const [position,setPosition] = useState({ x: 0, y: 0 })
    const [direction, setDirection] = useState('face-down')
    const [keyDown, setKeyDown] = useState<string | null>(null)    
    const throttleRef = React.useRef<boolean>(false)
    
    const speed = 10;
    const pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--pixel-size'))
    const moveSpeed = pixelSize*speed

    const styles = {
        left: `${position.x}px`,
        top: `${position.y}px`,
    }

    useEffect(() => {
        if (!keyDown) return
        else {
            let newDirection;
            if (keyDown === 'ArrowUp') newDirection = 'face-up'
            else if (keyDown === 'ArrowDown') newDirection = 'face-down'
            else if (keyDown === 'ArrowLeft') newDirection = 'face-left'
            else newDirection = 'face-right'
            
            if (direction === newDirection) return
            setDirection(newDirection)
        }
    }, [keyDown,setDirection,direction])

    useEffect(() => {
        if (!keyDown) return
        if (throttleRef.current) { return }
        else {
            const pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--pixel-size'))
            throttleRef.current = true
            setTimeout(() => { setPosition(prev => ({...prev})); throttleRef.current = false }, 30) 
            setPosition(prev => { 
                let newY = -1, newX = -1;
                if (keyDown === 'ArrowUp') {
                    newY = prev.y-(moveSpeed)
                    if (newY < 0) newY = 0
                }
                else if (keyDown === 'ArrowDown') {
                    newY = prev.y+(moveSpeed)
                    if (newY > 600-(32*pixelSize)) newY = 600-(32*pixelSize)
                }
                else if (keyDown === 'ArrowLeft') {
                    newX = prev.x-(moveSpeed)
                    if (newX < 0) newX = 0
                }
                else if (keyDown === 'ArrowRight') {
                    newX = prev.x+(moveSpeed)
                    if (newX > 800-(32*pixelSize)) newX = 800-(32*pixelSize)
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
    const classnamesCharacter = classNames(['main-character', 'pixel-art']);
    const classnamesSpreadSheet = classNames(['character-spreadsheet', direction]);

    return (
        <div className={classnamesCharacter} style={styles}>
            <img className={classnamesSpreadSheet} src={CharacterSprite}/>
        </div>
    )
}

export default MainCharacter
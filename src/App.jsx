import { useState, useEffect, useRef } from 'react'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'


export default function App() {
    const [dice, setDice] = useState(() => initialDice())
    const [rolls, setRolls] = useState(0)
    const [time, setTime] = useState(0)
    const [gameIsRunning, setGameIsRunning] = useState(false)
    const gameIsNew = dice.every(die => die.value === "")
    const gameWon = dice.every(die => die.isHeld) && dice.every(die => dice[0].value === die.value)

    useEffect(() => {
        if (gameWon) {
            setGameIsRunning(prev => !prev)
        }
    }, [gameWon])

    useEffect(() => {
        let timer

        if (gameIsRunning) {
            timer = setInterval(() => {
                setTime((prevTime) => prevTime + 1)
            }, 1000);
        }
        return () => {
            clearInterval(timer)
        }
    }, [gameIsRunning])
    
    function initialDice() {
        return new Array(10)
                .fill(0)
                .map(() => ({
                    value: "",
                    isHeld: false,
                    id: nanoid()
                }))
    }

    function hold(id) {
        if (!dice.every(die => die.value === "")) {
            setDice(prevDice => prevDice.map(die => {
                return die.id === id ? {...die, isHeld: !die.isHeld} : die
            })) 
        }
    }

    function rollNewDice() {
        setDice(prevDice => prevDice.map(die => {
            return {...die, value: Math.ceil(Math.random() * 6)}
        }))
        setRolls(prevRoll => prevRoll + 1)
        setGameIsRunning(true)
    }

    function rollUnheldDice() {
        setDice(prevDice => prevDice.map(die => {
            return die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)}
        }))
        setRolls(prevRoll => prevRoll + 1)
    }

    function newGame() {
        setDice(initialDice())
        setTime(0)
        setGameIsRunning(false)
    }

    const dieElements = dice.map(die => (
        <Die
            key={die.id} 
            value={die.value}
            isHeld={die.isHeld}
            id={die.id}
            hold={hold}
        />
    ))

    return (
        <main>
            {gameWon && <Confetti />}
            <h1 className="title">Tenzies Game</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="die-container">
                {dieElements}
            </div>
            {gameIsNew && <button className="roll-btn" onClick={rollNewDice}>Start</button>}
            {!gameIsNew && <button className="roll-btn"
                    onClick={gameWon ? newGame : rollUnheldDice}
            >
                {gameWon ? "New Game" : "Roll"}
            </button>}
            <div className="info-container">
                <span className="roll-counter">Number of rolls: {rolls}</span>
                <span className="timer">Time: {time}s</span>
            </div>
        </main>
    )
}
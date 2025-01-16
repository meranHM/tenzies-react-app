import { useState, useEffect, useRef } from 'react'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {
  const [dice, setDice] = useState(() => generateAllNewDice())
  const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)
  const newGameFocus = useRef(null)



  useEffect(() => {
    if (gameWon) {
      newGameFocus.current.focus()
    }
  }, [gameWon])

  
  function generateAllNewDice() {
    const diceArray = []
    for (let i = 0; i < 10; i++) {
      const randomNumber = Math.ceil(Math.random() * 6)
      diceArray.push({
        value: randomNumber,
        isHeld: false,
        id: nanoid()
      })
    }
    return diceArray
  }

  const diceElements = dice.map(die => (
    <Die 
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      id={die.id}
      hold={hold}
    />
  ))

  function rollDice() {
    setDice(prevDie => prevDie.map(die => {
      return die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)}
    }))
  }

  function hold(id) {
    setDice(prevDie => prevDie.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  function newGame() {
    setDice(generateAllNewDice())
  }

  return (
    <main>
      {gameWon && <Confetti />}
      <div className="sr-only" aria-live="polite">
        {gameWon && <p>Congratulations! You won! Press the "New Game" button to start again.</p>}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="die-container">
        {diceElements}
      </div>
      <button ref={newGameFocus}
              className="roll-btn"
              onClick={gameWon ? newGame : rollDice}
      >
       {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  )
}
import { useState } from 'react'
import './index.css'
import confetti from 'canvas-confetti'

import { Square } from './components/Square.jsx'
import { WINNER_COMBOS,TURNS } from './constans.js'
import { checkWinnerFrom,checkEndGame } from './logic/board.js'
import { WinnerModal } from './components/WinnerModal.jsx'












function App() {
  
  // leyendo de local store el tablero 
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  // leyendo de local store turnos 
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })



  const [winner, setWinner] = useState(null)


  
  const resetGame =() =>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

 

  const updateBoard = (index) => {

    // no actualizamos esta posición
    // si ya tiene algo
  
    if (board[index]  || winner) return
    // actualizar el tablero 
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    // cambiar el turno 
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X

    setTurn(newTurn)
    // guardar partida  local almacenamiento

    window.localStorage.setItem('board',JSON.stringify(newBoard))
    window.localStorage.setItem('turn',newTurn)


    // revisa si hay un ganador 
    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner){  // estados asingronos
      confetti()
      setWinner(newWinner)
    } else if(checkEndGame(newBoard)){
      setWinner(false)// empate
    }

    

  }

  return (
    <main>
      <h1 className="board">
        The Game Old Make For Vladimir Ceballos
        <button onClick={resetGame}> Reset del Juego </button>
      </h1>
    
      <section className="game">
        {
          board.map((square, index) => {
            return (
              <Square key={index} updateBoard={updateBoard} index={index}>
                {square}
              </Square>

            )
          })
        }

      </section>



      {TURNS.X == TURNS.X}



      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App

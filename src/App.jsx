import { useState } from 'react'
import './index.css'
import confetti from 'canvas-confetti'







const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? "is-selected" : ''}`
  const handleClick = () => {
    updateBoard(index)
  }
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}


const WINNER_COMBOS =[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [2,4,6],
  [0,4,8],
  
]

function App() {

  const TURNS = {
    X: 'X',
    O: '0'
  }


  const [board, setBoard] = useState(Array(9).fill(null)) // null es que no hay ganador  false es que hay empate 
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)


  const checkWinner = (boardToCheck)=>{
    for (const combo of WINNER_COMBOS) {
     const [a,b,c] = combo
        if( boardToCheck[a] && // 0 =>  X or O contenga 

          boardToCheck[a] === boardToCheck[b] &&
          boardToCheck[a] === boardToCheck[c]
        ){
          return boardToCheck[a] //0 =>  X or O contenga 
        }

    }
    return null

  }

  const resetGame =() =>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkEndGame = (newBoard) =>{

    return newBoard.every((Square) => Square != null)
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
    const newWinner = checkWinner(newBoard)
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
      {
      winner != null && (
        <section className="winner">
          
          <div className="text">
            <h2>
              {
                winner === false
                ? 'Empate':'Gano '
              }
            </h2>  
            <header className="win">
              {winner && <Square>{winner} </Square>}
            </header>

            <footer>
             <button onClick={resetGame}>
                 Empezar de nuevo 
              </button>  
            </footer>
          </div>
          
        </section>
      )
    }
    </main>
  )
}

export default App

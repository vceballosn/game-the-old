import { useState } from 'react'
import './index.css'






const Square = ({children,isSelected,updateBoard,index})=>{
  const className = `square ${isSelected ? "is-selected" : ''}`
  const handleClick =() =>{
      updateBoard(index)
}
  return(
    <div onClick={handleClick} className={className}>
           {children}     
    </div>
  )
}

function App() {

  const TURNS ={
    X: 'X',
    O: '0'
  }
 
 
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)

  const updateBoard = (index) => {

    // no actualizamos esta posición
    // si ya tiene algo
    if (board[index]) return
    
  const newBoard = [...board]
  newBoard[index]= turn
  setBoard(newBoard)
  const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X

    setTurn(newTurn)

  }

  return (
    <main>
      <h1 className="board">
        The Game Old Make For Vladimir Ceballos
      </h1>
      <section className="game">
        {
          board.map((_,index) => {
            return(
              <Square key={index} updateBoard={updateBoard} index={index}>
                {board[index]}
              </Square>  

            )
          })
         }

      </section>

    

       {TURNS.X==TURNS.X}
       
      
       
       <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>


    </main>
  )
}

export default App

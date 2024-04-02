
import { WINNER_COMBOS } from "../constans"

export const checkWinnerFrom = (boardToCheck)=>{
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


  export const checkEndGame = (newBoard) =>{

    return newBoard.every((Square) => Square != null)
  }

import React, { useState } from 'react';

function Square({val, onSquareCLick}){
  
  return <button className="square" onClick={onSquareCLick}>{val}</button>;
  
}

function Board() {

  const [squares, setSquares] = useState(Array(9).fill(null));
  const [XIsNext, setXIsNext] = useState(true);

  function handleClick(i){
    
    if(squares[i] || calcWinner(squares)){
      return;
    }
    const nextSquares = squares.slice();
    if(XIsNext){
      nextSquares[i] = 'X';
    }
    else{
      nextSquares[i] = 'O';
    }
    setSquares(nextSquares);
    setXIsNext(!XIsNext);
    }
    let status;
    const winner = calcWinner(squares);
    if(winner){
      status = "Winner: " + winner;
    }
    else{
      status = "Next: " + (XIsNext ? "X" : "O");
    }
  

  return (
    <>
      <div className="status">{status}</div>
      <div className='board-row'>
      <Square val={squares[0]} onSquareCLick={()=>handleClick(0)}/>
      <Square val={squares[1]} onSquareCLick={()=>handleClick(1)}/>
      <Square val={squares[2]} onSquareCLick={()=>handleClick(2)}/>
      </div>
      <div className='board-row'>
      <Square val={squares[3]} onSquareCLick={()=>handleClick(3)}/>
      <Square val={squares[4]} onSquareCLick={()=>handleClick(4)}/>
      <Square val={squares[5]} onSquareCLick={()=>handleClick(5)}/>
      </div>
      <div className='board-row'>
      <Square val={squares[6]} onSquareCLick={()=>handleClick(6)}/>
      <Square val={squares[7]} onSquareCLick={()=>handleClick(7)}/>
      <Square val={squares[8]} onSquareCLick={()=>handleClick(8)}/>
      </div>
  
    </>);

    function calcWinner(squares){
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];

      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
      }
      return null;
    }
}


export default function Game(){
    return (
      <>
      <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
      </div>
    </div>      
      </>
    )
}
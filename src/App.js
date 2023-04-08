import React, { useState } from 'react';

function Square({val, onSquareCLick}){
  
  return <button className="square" onClick={onSquareCLick}>{val}</button>;
  
}


export default function Board() {

  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i){
    const nextSquares = squares.slice();
    nextSquares[i] = 'X';
    setSquares(nextSquares);
  }

  return (
    <>
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
}

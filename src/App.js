import React, { useState } from 'react';

function Square({val}){
  
  return <button className="square" >{val}</button>;
  
}


export default function Board() {

  const [squares, setSquares] = useState(Array(9).fill(null));

  return (
  <>
  <div className='board-row'>
  <Square val={squares[0]}/>
  <Square val={squares[1]}/>
  <Square val={squares[2]}/>
  </div>
  <div className='board-row'>
  <Square val={squares[3]}/>
  <Square val={squares[4]}/>
  <Square val={squares[5]}/>
  </div>
  <div className='board-row'>
  <Square val={squares[6]}/>
  <Square val={squares[7]}/>
  <Square val={squares[8]}/>
  </div>
  
  </>);
}

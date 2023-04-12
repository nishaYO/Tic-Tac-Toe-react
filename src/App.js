import { useState } from 'react';

function Square({ value, onSquareClick }) {
  //creating square boxes of the board using button element
  //onSquareClick has handleClick function assigned which will update the square to either O or X
  //value has the square which is currently clicekd on assigned
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
function Board({ xIsNext, squares, onPlay }) {
  //handleCLick to execute when a square is clicked
  function handleClick(i) {
    //return if square reclicked or if someone already won
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    //create a new array everytime a square is clicked
    const nextSquares = squares.slice();
    //update the values of the new array with X and O alternatively.
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    //pass the new array to onPlay
    onPlay(nextSquares);
  }
  //winner will either be 'X'/'O' or null
  const winner = calculateWinner(squares);//calling calculateWinner with currentSquares as a parameter
  // currentSquares is the last squares array element of the History array
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }
  
  //JSX to create 9 squares in the boxes
  return (
    <>
      <div className="status">{status}</div>
      
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

//defining the main component
export default function Game() {
  //
  const [history, setHistory] = useState([Array(9).fill(null)]); //initialized as 1D array but adding arrays as elements later
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0; //assinging true or false based on the value of currentMove
  // '===' has greater precedance than '==' so it will be calculated first
  const currentSquares = history[currentMove]; //initialized as an array of nulls

  function handlePlay(nextSquares) {
    //updating history array
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    //fetching latest array from the history array
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    //the number of times this will run is the number of elements history has
    let description;
    if (move === currentMove) {
      description = 'You are at #' + move;
    }
    else if (move > 0) {
      description = <button onClick={() => jumpTo(move)}>{'Go to move #' + move}</button>;
    }
    else {
      description = <button onClick={() => jumpTo(move)}>{'Go to game start'}</button>;
    }
    return (
      <li key={move}>
        {description}
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        {/* moves variable is the list of all buttons */}
        <ol>{moves}</ol>
      </div>
    </div>
  );
}


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    //checking if any of the lines above are same value and not null
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
import { useState } from "react";
import "./Game.css";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]); // [[SOME STATE1], [SOMETSTATE2]...]
  const [currentMove, setCurrentMove] = useState(0); // 0,1...
  const [moveHistory, setMoveHistory] = useState([{}]);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares, value, row, col) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    const moveNumber = nextHistory.length - 1;
    setCurrentMove(moveNumber);

    const coordinates = { value: value, row: row, col: col };

    const nextMoveHistory = [
      ...moveHistory.slice(0, currentMove + 1),
      coordinates,
    ];

    setMoveHistory(nextMoveHistory);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    let coordinates = `Coordinates - ${moveHistory[move].value} (${moveHistory[move].row}, ${moveHistory[move].col})`;
    if (move > 0) {
      description = `Move # ${move}`;
    } else {
      description = "Game start";
      coordinates = "Reset the game";
    }
    // style={{ display: move > 0 ? "none" : "inline" }}
    return (
      <li key={move} className="history-item">
        <button className="history-button" onClick={() => jumpTo(move)}>
          {description}
        </button>
        <span className="history-span">{coordinates}</span>
      </li>
    );
  });

  return (
    <div className="game-container">
      <div className="game">
        <div className="game-board">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
          />
        </div>
        <div className="game-info">
          <ol className="moves-container">{moves}</ol>
        </div>
      </div>
    </div>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function createBoard() {
    const board = Array.from({ length: 3 }).map((_, row) => {
      return (
        <div className="board-row" key={row}>
          {createSquares(row)}
        </div>
      );
    });

    return <div className="board">{board}</div>;
  }

  function createSquares(row) {
    return Array.from({ length: 3 }).map((_, col) => {
      const index = row * 3 + col;
      return (
        <Square
          key={index}
          value={squares[index]}
          onSquareClick={() => handleClick(index, row, col)}
          isWinning={winner ? winner.lines.includes(index) : false}
        />
      );
    });
  }

  function handleClick(i, row, col) {
    if (winner || squares[i]) {
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares, nextSquares[i], row, col);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner.winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      {createBoard()}
    </>
  );
}

function Square({ value, onSquareClick, isWinning }) {
  return (
    <button
      className={`square ${isWinning ? "winning-square" : ""}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { lines: lines[i], winner: squares[a] };
    }
  }
  return null;
}

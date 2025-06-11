import { useState } from "react";
import '../src/Sudoku.css'

const initialBoard = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

const Sudoku = () => {
  const [board, setBoard] = useState(initialBoard);

  const handleCellChange = (rowIndex, colIndex, value) => {
    const val = parseInt(value);
    if (!isValidNumber(val)) {
      return;
    }

    if (!isValidNumberSelection(rowIndex, colIndex, val)) {
      return;
    }

    const newBoard = [...board];
    newBoard[rowIndex][colIndex] = value === "" ? 0 : val;
    setBoard(newBoard);
  };

  const isValidNumberSelection = (rowIndex, colIndex, inputValue) => {
    //unique value in row
    const rowValue = board[rowIndex];
    if (rowValue.includes(inputValue)) {
      return false;
    }

    //unique value in column
    for (let i = 0; i <= board.length - 1; i++) {
      if (board[i][colIndex] === inputValue) {
        return false;
      }
    }

    // Check 3x3 box
    let boxRow = Math.floor(rowIndex / 3) * 3;
    let boxCol = Math.floor(colIndex / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[boxRow + i][boxCol + j] === inputValue) return false;
      }
    }

    return true;
  };

  const isValidNumber = (value) => {
    if (value > 0 && value < 10) {
      return true;
    }
  };

  const isDisabled = (rowIndex, colIndex) => {
    if (initialBoard[rowIndex][colIndex] != 0) {
      return true;
    }
    return false;
  };

  return (
    <div className="App">
      <h1 className="game-title">Sudoku</h1>
      <div className="board">
        {board.map((row, rowIndex) => {
          return (
            <div className="row" key={rowIndex}>
              {row.map((col, colIndex) => {
                return (
                  <input
                    className="cell"
                    key={rowIndex + colIndex}
                    value={col === 0 ? "" : col}
                    onChange={(e) => {
                      handleCellChange(rowIndex, colIndex, e.target.value);
                    }}
                    disabled={isDisabled(rowIndex, colIndex)}
                    maxLength={1}
                    type="number"
                    min="1"
                    max="9"
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sudoku;

import { useState } from "react";
import classes from "./Board.module.css";
import Inputs from "./Inputs";
import WINNING_COMBINATIONS from "./winningCombinations";
import GameOverOverlay from "./GameOverOverlay";
import bot from "./Bots";

const initialBoard = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "x";
let winner = null;

function checkForWin(board) {
  for (let combo of WINNING_COMBINATIONS) {
    if (combo.every((item) => board.includes(item))) {
      return true;
    }
  }
  return false;
}

export default function Board() {
  const [playerX, setPlayerX] = useState("X");
  const [playerO, setPlayerO] = useState("O");
  // bot vs bot, bot vs human, harder bots...
  const [difficultyX, setDifficultyX] = useState("human");
  const [difficultyO, setDifficultyO] = useState("human");
  const [board, setBoard] = useState(initialBoard);

  function handleClick(index) {
    if (board[index] === "") {
      const newBoard = [...board];
      newBoard[index] = currentPlayer + index;
      setBoard(newBoard);
      if (checkForWin(newBoard)) {
        winner = currentPlayer === "x" ? playerX : playerO;
        currentPlayer = "x";
        return;
      }
      currentPlayer = currentPlayer === "x" ? "o" : "x";
      if (difficultyO !== "human") {
        winner = bot(
          difficultyO,
          newBoard,
          setBoard,
          currentPlayer,
          checkForWin
        );
        if (winner) {
          winner = currentPlayer === "x" ? playerX : playerO;
          currentPlayer = "x";
          return;
        }
        currentPlayer = currentPlayer === "x" ? "o" : "x";
      }
    }
  }

  return (
    <>
      <div className={classes.inputs}>
        <Inputs
          player={playerX}
          setPlayer={setPlayerX}
          setDifficulty={setDifficultyX}
        />
        <Inputs
          player={playerO}
          setPlayer={setPlayerO}
          setDifficulty={setDifficultyO}
        />
      </div>
      <div className={`${classes.container} ${classes[currentPlayer]}`}>
        {board.map((symbol, index) => (
          <div
            key={index}
            className={`${classes.square} ${classes[symbol[0]]}`}
            onClick={() => handleClick(index)}
          ></div>
        ))}
      </div>
      {(!board.includes("") || checkForWin(board)) && (
        <GameOverOverlay
          winner={winner}
          isDraw={!checkForWin(board)}
          resetGame={setBoard}
        />
      )}
    </>
  );
}

import { useState, useEffect } from "react";
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
  const [difficultyX, setDifficultyX] = useState("human");
  const [difficultyO, setDifficultyO] = useState("unbeatable");
  const [board, setBoard] = useState(initialBoard);

  useEffect(() => {
    if (
      (difficultyX !== "human" && difficultyO !== "human") ||
      (difficultyX !== "human" &&
        difficultyO === "human" &&
        currentPlayer === "x")
    ) {
      setTimeout(() => {
        triggerBotMove();
      }, 300);
    }
  }, [board, difficultyX, difficultyO]);

  function triggerBotMove() {
    // bot vs ... - to start the game if bot should go first
    const newBoard = [...board];
    const difficulty = currentPlayer === "x" ? difficultyX : difficultyO;
    // condition is needed, otherwise infinite overlay loop after game over
    if (!checkForWin(board) && board.includes("")) {
      winner = currentPlayer === "x" ? playerX : playerO;
      bot(difficulty, newBoard, setBoard, currentPlayer, checkForWin);
    } else {
      winner = currentPlayer === "x" ? playerX : playerO;
      currentPlayer = "x";
      return;
    }
    currentPlayer = currentPlayer === "x" ? "o" : "x";
  }

  function handleClick(index) {
    const newBoard = [...board];
    // human vs bot || human vs human
    if (
      (difficultyX === "human" || difficultyO === "human") &&
      board[index] === ""
    ) {
      newBoard[index] = currentPlayer + index;
      setBoard(newBoard);
      if (checkForWin(newBoard)) {
        winner = currentPlayer === "x" ? playerX : playerO;
        currentPlayer = "x";
        return;
      }
      currentPlayer = currentPlayer === "x" ? "o" : "x";

      if (difficultyO !== "human" || difficultyX !== "human") {
        const didBotWin = bot(
          difficultyO,
          newBoard,
          setBoard,
          currentPlayer,
          checkForWin
        );

        if (didBotWin) {
          winner = currentPlayer === "x" ? playerX : playerO;
          currentPlayer = "x";
          return;
        }
        currentPlayer = currentPlayer === "x" ? "o" : "x";
      }
    }
  }

  function handleReset() {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setDifficultyX("human");
    currentPlayer = "x";
  }

  return (
    <>
      <div className={classes.inputs}>
        <Inputs
          player={playerX}
          setPlayer={setPlayerX}
          difficulty={difficultyX}
          setDifficulty={setDifficultyX}
        />
        <Inputs
          player={playerO}
          setPlayer={setPlayerO}
          difficulty={difficultyO}
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
          isDraw={!board.includes("") && !checkForWin(board)}
          resetGame={handleReset}
        />
      )}
    </>
  );
}

export default function bot(difficulty, board, setBoard, player, checkForWin) {
  if (difficulty === "easy") {
    let randomNumber = Math.floor(Math.random() * 9);
    while (board[randomNumber] !== "" && board.includes("")) {
      randomNumber = Math.floor(Math.random() * 9);
    }
    const newBoard = [...board];
    newBoard[randomNumber] = player + randomNumber;
    setBoard(newBoard);
    if (checkForWin(newBoard)) {
      return player;
    }
  } else if (difficulty === "hard") {
    console.log("hard");
  }
}

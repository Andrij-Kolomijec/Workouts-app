import minimax from "./minimax";

export default function bot(difficulty, board, setBoard, player, checkForWin) {
  let randomNumber = minimax(
    board,
    0,
    true,
    player,
    checkForWin,
    difficulty === "easy" ? 3 : difficulty === "medium" ? 5 : 9
  ).index;
  const newBoard = [...board];
  newBoard[randomNumber] = player + randomNumber;
  setBoard(newBoard);
  return checkForWin(newBoard);
}

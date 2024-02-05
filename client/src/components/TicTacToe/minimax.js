export default function minimax(
  board,
  depth,
  maximizingPlayer,
  player,
  checkForWin,
  limit
) {
  // Base cases: check for terminal states (win, lose, draw)
  if (checkForWin(board) && maximizingPlayer) {
    return { score: -10 + depth }; // Human wins
  } else if (checkForWin(board) && !maximizingPlayer) {
    return { score: 10 - depth }; // Computer wins
  } else if (!board.includes("")) {
    return { score: 0 }; // Draw
  }

  // Limit the depth of the search
  if (depth >= limit) {
    return { score: 0 }; // Return a neutral score to limit the depth
  }

  // Recursive case: if it's the computer's turn
  if (maximizingPlayer) {
    let bestScore = -Infinity;
    let bestMove;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = player + i;
        let score = minimax(
          board,
          depth + 1,
          false,
          player === "x" ? "o" : "x",
          checkForWin,
          limit
        ).score;
        board[i] = "";
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    return { score: bestScore, index: bestMove };
  } else {
    // If it's the human's turn
    let bestScore = Infinity;
    let bestMove;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = player + i;
        let score = minimax(
          board,
          depth + 1,
          true,
          player === "x" ? "o" : "x",
          checkForWin,
          limit
        ).score;
        board[i] = "";
        if (score < bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    return { score: bestScore, index: bestMove };
  }
}

import classes from "./GameOverOverlay.module.css";
import PropTypes from "prop-types";

export default function GameOverOverlay({ winner, resetGame, isDraw }) {
  function handleClick() {
    resetGame(["", "", "", "", "", "", "", "", ""]);
  }

  return (
    <div className={`${classes.overlay} ${classes.show}`}>
      <h4>{isDraw ? "It is a draw!" : `${winner} wins!`}</h4>
      <button onClick={handleClick}>Reset</button>
    </div>
  );
}

GameOverOverlay.propTypes = {
  winner: PropTypes.string,
  resetGame: PropTypes.bool,
  isDraw: PropTypes.bool,
};

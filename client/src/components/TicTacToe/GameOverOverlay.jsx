import classes from "./GameOverOverlay.module.css";
import PropTypes from "prop-types";

export default function GameOverOverlay({ winner, isDraw, resetGame }) {
  console.log("ass");
  return (
    <div className={`${classes.overlay} ${classes.show}`}>
      <h4>{isDraw ? "It is a draw!" : `${winner} wins!`}</h4>
      <button onClick={resetGame}>Reset</button>
    </div>
  );
}

GameOverOverlay.propTypes = {
  winner: PropTypes.string,
  isDraw: PropTypes.bool,
  resetGame: PropTypes.func,
};

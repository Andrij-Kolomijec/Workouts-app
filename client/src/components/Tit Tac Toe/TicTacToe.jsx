import classes from "./TicTacToe.module.css";
import Board from "./Board";
import close from "/close-circle.svg";

export default function TicTacToe() {
  return (
    <>
      <div className={classes.TicTacToe}>
        <img
          className={classes.close}
          src={close}
          alt="Close Button"
          title="Close"
        />
        <h3>Meanwhile, play tic tac toe!</h3>
        <Board />
      </div>
    </>
  );
}

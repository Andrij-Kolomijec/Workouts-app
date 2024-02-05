import { useState, useEffect } from "react";
import classes from "./TicTacToe.module.css";
import PropTypes from "prop-types";
import Board from "./Board";
import close from "/close-circle.svg";

export default function TicTacToe({ isLoading }) {
  const [showComponent, setShowComponent] = useState(false);
  const [isOut, setIsOut] = useState(false);

  useEffect(() => {
    let timeoutId;
    if (isLoading) {
      timeoutId = setTimeout(() => {
        !showComponent ? setShowComponent(true) : setIsOut(true);
      }, 1000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isLoading, isOut]);

  function handleClose() {
    setIsOut(true);
    // setShowComponent(false);
  }

  return (
    <>
      {showComponent && (
        <div className={`${classes.TicTacToe} ${isOut && classes.out}`}>
          <img
            className={classes.close}
            src={close}
            alt="Close Button"
            title="Close"
            onClick={handleClose}
          />
          <h3>Meanwhile, play tic tac toe!</h3>
          <Board />
        </div>
      )}
    </>
  );
}

TicTacToe.propTypes = {
  isLoading: PropTypes.bool,
};

import { useState, useEffect } from "react";
import classes from "./TicTacToe.module.css";
import PropTypes from "prop-types";
import Board from "./Board";
import close from "/close-circle.svg";

export default function TicTacToe({ delay = 2000, isLoading, setShow = null }) {
  const [showComponent, setShowComponent] = useState(false);
  const [isOut, setIsOut] = useState(true);

  useEffect(() => {
    let timeoutId;
    if (isLoading) {
      timeoutId = setTimeout(() => {
        setShowComponent(true);
        setIsOut(false);
      }, delay);
    } else {
      timeoutId = setTimeout(() => {
        setShowComponent(false);
        setIsOut(true);
      }, 1500);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isLoading, delay]);

  function handleClose() {
    setIsOut(true);
    setTimeout(() => {
      setShowComponent(false);
      setShow(false);
    }, 500);
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
          {!setShow && <h3>Meanwhile, play tic tac toe!</h3>}
          <Board />
        </div>
      )}
    </>
  );
}

TicTacToe.propTypes = {
  delay: PropTypes.number,
  isLoading: PropTypes.bool,
  setShow: PropTypes.func,
};

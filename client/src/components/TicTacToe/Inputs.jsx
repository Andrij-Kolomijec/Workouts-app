import classes from "./Inputs.module.css";
import PropTypes from "prop-types";

export default function Inputs({
  player,
  setPlayer,
  difficulty,
  setDifficulty,
}) {
  function handleChangePlayerName(e) {
    setPlayer(e.target.value);
  }

  function handleChangeDifficulty(e) {
    setDifficulty(e.target.value);
  }

  return (
    <form className={classes.setDiffForm}>
      <input
        className={classes.playerName}
        type="text"
        placeholder={"Player name"}
        value={player}
        onChange={handleChangePlayerName}
      />
      <select
        className={`${classes.playerSelect} ${classes[player]}`}
        onChange={handleChangeDifficulty}
        value={difficulty}
      >
        <option value="human">human</option>
        <option value="easy">easy</option>
        <option value="medium">medium</option>
        <option value="unbeatable">unbeatable</option>
      </select>
    </form>
  );
}

Inputs.propTypes = {
  player: PropTypes.string,
  setPlayer: PropTypes.func,
  difficulty: PropTypes.string,
  setDifficulty: PropTypes.func,
};

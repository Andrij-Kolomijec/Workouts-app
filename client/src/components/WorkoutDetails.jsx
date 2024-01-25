import classes from "./WorkoutDetails.module.css";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";

export default function WorkoutDetails({ workout }) {
  const { dispatch } = useWorkoutsContext();

  async function handleClick() {
    const response = await fetch(import.meta.env.VITE_PORT + workout._id, {
      method: "DELETE",
    });
    const json = await response.json();
    if (response.ok) dispatch({ type: "DELETE_WORKOUT", payload: json });
  }

  return (
    <div className={classes.workout}>
      <h3>{workout.title}</h3>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        Delete
      </span>
    </div>
  );
}

WorkoutDetails.propTypes = {
  workout: PropTypes.object,
};

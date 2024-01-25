import classes from "./WorkoutDetails.module.css";
import { useWorkoutsContext } from "../hooks/useWorkoutsCOntext";
import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";
import bin from "/delete.svg";
import binEmpty from "/delete-empty.svg";
import { useState } from "react";

export default function WorkoutDetails({ workout }) {
  const [isHovered, setIsHovered] = useState(false);

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
      <h3 className={classes.title}>{workout.title}</h3>
      <p className={classes.sets}>
        <strong>Sets: </strong>
        {workout.sets}
      </p>
      <p className={classes.reps}>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p className={classes.load}>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p className={classes.time}>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      {workout.notes !== "" && (
        <p className={classes.notes}>
          <strong>Notes: </strong>
          {workout.notes}
        </p>
      )}
      <img
        src={isHovered ? binEmpty : bin}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      />
    </div>
  );
}

WorkoutDetails.propTypes = {
  workout: PropTypes.object,
};

import classes from "./WorkoutDetails.module.css";
import PropTypes from "prop-types";

export default function WorkoutDetails({ workout }) {
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
      <p>{workout.createdAt}</p>
    </div>
  );
}

WorkoutDetails.propTypes = {
  workout: PropTypes.object,
};

import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import classes from "./Home.module.css";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";

export default function Home() {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);
  console.log(workouts);
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(import.meta.env.VITE_PORT_WORKOUTS, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
        setIsLoading(false);
      }
    };
    if (user) fetchWorkouts();
  }, [dispatch, user]);

  return (
    <div className={classes.home}>
      {isLoading ? (
        <Spinner />
      ) : workouts.length > 0 ? (
        <div className={classes.workouts}>
          {workouts &&
            workouts.map((workout) => (
              <WorkoutDetails key={workout._id} workout={workout} />
            ))}
        </div>
      ) : (
        <h3>No workouts yet.</h3>
      )}
      <WorkoutForm />
    </div>
  );
}

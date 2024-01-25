import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import classes from "./WorkoutForm.module.css";

export default function WorkoutForm() {
  const { dispatch } = useWorkoutsContext();

  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    const workout = { title, reps, load };
    const response = await fetch(import.meta.env.VITE_PORT, {
      method: "POST",
      body: JSON.stringify(workout),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    } else {
      setError(null);
      setTitle("");
      setReps("");
      setLoad("");
      setEmptyFields([]);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
      console.log("New workout added.");
    }
  }

  return (
    <form className={classes.create} onSubmit={handleSubmit}>
      <h3>Add a new workout</h3>
      <label htmlFor="exercise-title">Exercise Title:</label>
      <input
        id="exercise-title"
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? classes.error : ""}
      />
      <label htmlFor="exercise-reps">Reps:</label>
      <input
        id="exercise-reps"
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes("reps") ? classes.error : ""}
      />
      <label htmlFor="exercise-load">Load (kg):</label>
      <input
        id="exercise-load"
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes("load") ? classes.error : ""}
      />
      <button>Add Workout</button>
      {error && <div className={classes.error}>{error}</div>}
    </form>
  );
}

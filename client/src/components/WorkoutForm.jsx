import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsCOntext";
import classes from "./WorkoutForm.module.css";

export default function WorkoutForm() {
  const { dispatch } = useWorkoutsContext();

  const [title, setTitle] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    const workout = { title, sets, reps, load, notes };
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
      setSets("");
      setReps("");
      setLoad("");
      setNotes("");
      setEmptyFields([]);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
      console.log("New workout added.");
    }
  }

  return (
    <form className={classes.create} onSubmit={handleSubmit}>
      <h3>Add a new workout</h3>
      <label htmlFor="exercise-title">Exercise:</label>
      <input
        id="exercise-title"
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? classes.error : ""}
      />
      <label htmlFor="exercise-sets">Sets:</label>
      <input
        id="exercise-sets"
        type="number"
        onChange={(e) => setSets(e.target.value)}
        value={sets}
        className={emptyFields.includes("sets") ? classes.error : ""}
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
      <label htmlFor="exercise-notes">Notes:</label>
      <textarea
        id="exercise-notes"
        type="text"
        onChange={(e) => setNotes(e.target.value)}
        value={notes}
        // className={emptyFields.includes("notes") ? classes.error : ""}
      />
      <button>Add Workout</button>
      {error && <div className={classes.error}>{error}</div>}
    </form>
  );
}

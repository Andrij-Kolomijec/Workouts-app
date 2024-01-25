import { createContext, useReducer } from "react";
import PropTypes from "prop-types";

export const WorkoutContext = createContext();

export function workoutsReducer(state, action) {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      };
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts],
      };
    default:
      return state;
  }
}

export function WorkoutContextProvider({ children }) {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
  });

  return (
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
}

WorkoutContextProvider.propTypes = {
  children: PropTypes.element,
};

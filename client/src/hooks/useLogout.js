import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";

export function useLogout() {
  // to log out (no need for server):
  // change global state and delete JWT from local storage

  const { dispatch } = useAuthContext();

  // so the workouts from previous users (global states)
  // do not flash before rendering the specific users workouts
  const { dispatch: workoutsDispatch } = useWorkoutsContext();

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    workoutsDispatch({ type: "SET_WORKOUTS", payload: null });
  };

  return { logout };
}

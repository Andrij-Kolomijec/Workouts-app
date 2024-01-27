import { useAuthContext } from "./useAuthContext";

export function useLogout() {
  // to log out (no need for server):
  // change global state and delete JWT from local storage

  const { dispatch } = useAuthContext();

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
}

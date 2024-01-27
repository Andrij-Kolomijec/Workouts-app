import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export function useSignup() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  async function signup(email, password) {
    setIsLoading(true);
    setError(null);

    const response = await fetch(import.meta.env.VITE_PORT_SIGNUP, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      // save the user (email, token - userController) to local storage
      localStorage.setItem("user", JSON.stringify(json));
      // update the authContext
      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
    }
  }

  return { signup, isLoading, error };
}

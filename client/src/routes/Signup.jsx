import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import Spinner from "../components/Spinner";
import TicTacToe from "../components/TicTacToe/TicTacToe";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, error } = useSignup();

  async function handleSubmit(e) {
    e.preventDefault();

    await signup(email, password);
  }

  return (
    <>
      <div className="filler left"></div>
      <form
        className={!isLoading ? "login-signup" : "loading-login-signup"}
        onSubmit={handleSubmit}
      >
        {!isLoading ? (
          <>
            <h2>Sign Up</h2>
            <label htmlFor="signupEmail">Email</label>
            <input
              id="signupEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="signupPassword">Password</label>
            <input
              id="loginPasignupPasswordssword"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button disabled={isLoading}>Sign Up</button>
          </>
        ) : (
          <>
            <h2 className="loader-text">Signing Up</h2>
            <Spinner />
            <p className="loader-text">
              Loading from a server may
              <br />
              take several minutes.
            </p>
          </>
        )}
        {error && <div className="error">{error}</div>}
      </form>
      <div className="filler">
        <TicTacToe isLoading={isLoading} />
      </div>
    </>
  );
}

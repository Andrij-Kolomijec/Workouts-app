import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import Spinner from "../components/Spinner";
import TicTacToe from "../components/TicTacToe/TicTacToe";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();

  async function handleSubmit(e) {
    e.preventDefault();
    await login(email, password);
  }

  async function handleGuestLogin(e) {
    e.preventDefault();
    await login("guest@test.org", import.meta.env.VITE_PORT_GUEST);
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
            <h2>Log In</h2>
            <label htmlFor="loginEmail">Email</label>
            <input
              id="loginEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="loginPassword">Password</label>
            <input
              id="loginPassword"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button disabled={isLoading}>Log In</button>
            <button disabled={isLoading} onClick={handleGuestLogin}>
              Log In as a Guest
            </button>
          </>
        ) : (
          <>
            <h2 className="loader-text">Logging In</h2>
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

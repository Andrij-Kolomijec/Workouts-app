import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, error } = useSignup();

  async function handleSubmit(e) {
    e.preventDefault();

    await signup(email, password);
  }

  return (
    <form className="login-signup" onSubmit={handleSubmit}>
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
        id="signupPassword"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button disabled={isLoading}>Sign Up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

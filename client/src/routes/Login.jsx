import { useState } from "react";
import classes from "./Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(email, password);
  };

  return (
    <form className={classes.login} onSubmit={handleSubmit}>
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
      <button>Log In</button>
    </form>
  );
}

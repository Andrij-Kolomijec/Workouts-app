import classes from "./Navbar.module.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header>
      <div className={classes.container}>
        <Link to="/">
          <h1>Workout App</h1>
        </Link>
        <nav>
          <div>
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

import classes from "./App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Navbar from "./components/Navbar";
import Login from "./routes/Login";
import Signup from "./routes/Signup";

function App() {
  return (
    <div className={classes.app}>
      <BrowserRouter>
        <Navbar />
        <div className={classes.pages}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

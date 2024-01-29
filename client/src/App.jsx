import classes from "./App.module.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./routes/Home";
import Navbar from "./components/Navbar";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Footer from "./components/Footer";
import ErrorPage from "./routes/ErrorPage";

function App() {
  const { user } = useAuthContext();
  return (
    <div className={classes.app}>
      <BrowserRouter>
        <Navbar />
        <div className={classes.pages}>
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;

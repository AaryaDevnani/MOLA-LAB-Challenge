import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import NavBar from "./components/NavBar";
import SignUp from "./components/signUp";
import Login from "./components/login";
import SetPassword from "./components/setPassword";
import Profile from "./components/profile";
import Admin from "./components/admin";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/setpassword" element={<SetPassword />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

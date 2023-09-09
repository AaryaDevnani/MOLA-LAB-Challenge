import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Nav from './components/NavBar'
function App() {
  return (
    <Router>
    <div className="App">
      <Nav/>
      <Routes>
      <Route exact path="/" element={<Home />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;

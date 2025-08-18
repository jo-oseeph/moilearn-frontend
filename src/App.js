import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { HomePage } from "./Pages/HomePage";
import Register from "./Pages/Register";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
    
      </Routes>
    </Router>
  );
}

export default App;

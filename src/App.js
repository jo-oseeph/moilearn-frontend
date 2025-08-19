import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { HomePage } from "./Pages/HomePage";
import Register from "./Pages/Register";
import Login from "./Pages/Login";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Add other routes as needed */}
    
      </Routes>
    </Router>
  );
}

export default App;

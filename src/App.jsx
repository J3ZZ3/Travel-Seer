import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import your pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Set the landing page as the default route */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

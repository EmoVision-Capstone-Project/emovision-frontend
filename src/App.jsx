import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile"; 
import Affirmation from "./pages/Affirmation";
import FaceMoodDetection from "./pages/FaceEmotionDetection";
import Journaling from "./pages/Journaling";
import BreathingExercise from "./pages/BreathingExercise"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/affirmation" element={<Affirmation />} /> 
        <Route path="/face-mood" element={<FaceMoodDetection />} />
        <Route path="/journaling" element={<Journaling />} />
        <Route path="/breathing" element={<BreathingExercise />} />
      </Routes>
    </Router>
  );
}

export default App;
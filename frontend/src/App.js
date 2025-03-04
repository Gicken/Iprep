import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RecoveryPage from "./pages/RecoveryPage";
import ResetPage from "./pages/ResetPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} /> 
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/recovery" element={<RecoveryPage />} /> 
        <Route path="/reset-password" element={<ResetPage />} /> 
      </Routes>
    </Router>
  );
}




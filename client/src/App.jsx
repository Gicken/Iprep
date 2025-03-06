import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/LoginPage";
import Home from "./pages/Home";
import StartInterview from "./pages/StartInterview";
import Dashboard from "./pages/Dashboard";
import RecoveryPage from "./pages/RecoveryPage";
import ResetPage from "./pages/ResetPage";
import RegistrationForm from "./components/RegistrationForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="start" element={<StartInterview />} />
          <Route path="home" element={<Home />} />
          <Route path="recovery" element={<RecoveryPage/>}/>
          <Route path="registration" element={<RegistrationForm/>} />
          <Route path="reset" element={<ResetPage/>} />
        </Route>
        
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
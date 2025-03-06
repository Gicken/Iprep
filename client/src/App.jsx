import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Login from "./pages/LoginPage";
import Home from "./pages/Home";
import StartInterview from "./pages/StartInterview";
import Dashboard from "./pages/Dashboard";
import RecoveryPage from "./pages/RecoveryPage";
import ResetPage from "./pages/ResetPage";
import RegistrationForm from "./components/RegistrationForm";
import ComingSoon from "./components/coming_soon";
import AuthLayout from "./layouts/AuthLayout";
import JobDescriptionApp from "./JobDescription/index";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="start" element={<StartInterview />} />
          <Route path="home" element={<Home />} />
          <Route path="comingsoon" element={<ComingSoon/>} /> 
          <Route path="recovery" element={<RecoveryPage/>}/>
          <Route path="registration" element={<RegistrationForm/>} />
          <Route path="reset" element={<ResetPage/>} />
          <Route path="job-description" element={<JobDescriptionApp/>} />
        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;
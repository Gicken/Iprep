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
import FAQs from "./pages/FAQs";
import HowItWorks from "./pages/HowItWorks";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  return (
    <Router>
      <Routes>
      {/* Normal Layout */}
      <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="comingsoon" element={<ComingSoon/>} /> 
          <Route path="recovery" element={<RecoveryPage/>}/>
          <Route path="registration" element={<RegistrationForm/>} />
          <Route path="reset" element={<ResetPage/>} />
          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="faqs" element={<FAQs />} />
          <Route path="login" element={<Login/>}/>
          
        </Route>
        

      {/* DASHBOARD LAYOUT */}
      <Route path="/" element={<DashboardLayout/>}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="start" element={<StartInterview />} />

        </Route>

      </Routes>     
    </Router>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import Login from './pages/LoginPage'
import Home from './pages/Home'
import StartInterview from './pages/StartInterview'
import Dashboard from './pages/Dashboard'
import RecoveryPage from './pages/RecoveryPage'
import ResetPage from './pages/ResetPage'
import RegistrationForm from './components/RegistrationForm'
import ComingSoon from './components/coming_soon'
import FAQs from './pages/FAQs'
import HowItWorks from './pages/HowItWorks'
import DashboardLayout from './layouts/DashboardLayout'
import PrivateRoute from './components/PrivateRoute'
import NotFoundPage from './components/NotFound'
import DashboardNotFoundPage from './components/DashboardNotFound'

function App () {
  const isAuthenticated = !!localStorage.getItem('token')
  console.log('Is user Authenticated? ', isAuthenticated)
  // console.log("Token: ", localStorage.getItem("token"));

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='home' element={<Home />} />
          <Route path='comingsoon' element={<ComingSoon />} />
          <Route path='recovery' element={<RecoveryPage />} />
          <Route path='registration' element={<RegistrationForm />} />
          <Route path='reset' element={<ResetPage />} />
          <Route path='how-it-works' element={<HowItWorks />} />
          <Route path='faqs' element={<FAQs />} />
          <Route path='login' element={<Login />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route path='/dashboard' element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='start' element={<StartInterview />} />
            {/* Dashboard-Specific 404 Page */}
            
          </Route>
        </Route>
        
      </Routes>
    </Router>
  )
}

export default App

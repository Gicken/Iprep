import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import PublicRoute from './routes/PublicRoute'
import HomePage from './pages/Home'
import HowItWorks from './pages/HowItWorks'
import FAQs from './pages/FAQs'
import NotFoundPage from './shared/components/NotFound'
import { RegisterPage, LoginPage } from './features/authentication'
import PrivateRoute from './routes/PrivateRoute'
import DashboardLayout from './layouts/DashboardLayout'
import { Dashboard } from './features/dashboard'
import { JobDescriptionPage } from './features/JobDescriptionFeature'
import { SpeechToTextPage } from './features/speechToText'


function App () {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route element={<MainLayout />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/how-it-works' element={<HowItWorks />} />
            <Route path='/registration' element={<RegisterPage />} />
            <Route path='/faqs' element={<FAQs />} />
          </Route>
          
        </Route>

        {/* Protected Routes */}
        <Route path='dashboard' element={
          <PrivateRoute >
            <DashboardLayout />
          </PrivateRoute>}>
          {/* <Route path='dashboard' element={<DashboardLayout />}> */}
            <Route index element={<Dashboard />} />
            <Route path="job-descriptions" element={<JobDescriptionPage />} />
            <Route path="speech-to-text" element={<SpeechToTextPage />} />
            {/* <Route path="jobs" element={<JobListing />} /> */}
          {/* </Route> */}
        </Route>

        {/* 404 Not Found */}
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}

export default App

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Layout from "./layouts/MainLayout/Layout";
// // import Login from "./pages/LoginPage";
// import Home from "./pages/Home";
// // import StartInterview from "./pages/StartInterview";
// // import Dashboard from "./pages/Dashboard";
// // import RecoveryPage from "./pages/RecoveryPage";
// // import ResetPage from "./pages/ResetPage";
// // import RegistrationForm from "./components/RegistrationForm";
// import ComingSoon from "./components/coming_soon";
// import FAQs from "./pages/FAQs";
// import HowItWorks from "./pages/HowItWorks";
// // import DashboardLayout from "./layouts/DashboardLayout";
// // import PrivateRoute from "./routes/PrivateRoute";
// import NotFoundPage from "./components/NotFound";
// // import CVManager from "./pages/CVManager";
// // import ProfilePage from "./pages/ProfilePage";
// import PublicRoute from "./routes/PublicRoute";
// import { MainLayout } from "./layouts/MainLayout";

// function App() {
//   return (
//     <Router>
//       <Routes>
//       <Route path="/" element={<Layout />}>
//         <Route path="/" element={<MainLayout/>} >
//         <Route index element={<Home/>}/>

//         </Route>
//       </Route>
//       {/* <Routes>
//         {/* Public Routes }
//         <Route element={<PublicRoute />}>
//           <Route path="/" element={<Layout />}>
//             <Route index element={<Home />} />
//             <Route path="home" element={<Home />} />
//             {/* <Route path="comingsoon" element={<ComingSoon />} />
//             <Route path="recovery" element={<RecoveryPage />} />
//             <Route path="registration" element={<RegistrationForm />} />
//             <Route path="reset" element={<ResetPage />} /> }
//             <Route path="how-it-works" element={<HowItWorks />} />
//             <Route path="faqs" element={<FAQs />} />
//             {/* <Route path="login" element={<Login />} /> }
//           </Route>
//         </Route> */}

//         {/* Protected Routes */}
//         {/* <Route element={<PrivateRoute />}>
//         <Route element={<Layout />}>
//           <Route path="dashboard" element={<DashboardLayout />}>
//             <Route index element={<Dashboard />} />
//             <Route path="start" element={<StartInterview />} />
//             <Route path="cv-manager" element={<CVManager />} />
//             <Route path="profile" element={<ProfilePage />} />
//           </Route>
//           </Route>
//         </Route> */}
//         <Route path="*" element={<NotFoundPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App

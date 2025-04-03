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
import { CVManager } from './features/cvManagement'
import { StartInterview } from './features/startInterview'
import { JobDescriptionPage, JobDetailsPage } from './features/JobDescriptionFeature'
import { InterviewQuestionPage, InterviewSummaryPage } from "./features/startQuestion"
import {ComingSoon} from './features/dashboard'
import { SpeechToTextPage } from './features/speechToText'


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute/>}>
          <Route path='/' element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path='home' element={<HomePage />} />
            {/* <Route path='recovery' element={<RecoveryPage />} /> */}
            <Route path='registration' element={<RegisterPage />} />
            {/* <Route path='reset' element={<ResetPage />} /> */}
            <Route path='how-it-works' element={<HowItWorks />} />
            <Route path='faqs' element={<FAQs />} />
            <Route path='login' element={<LoginPage />} />
          </Route>
          
        </Route>

        {/* Protected Routes */}
        <Route path='dashboard' element={
          <PrivateRoute >
            <DashboardLayout />
          </PrivateRoute>}>
          {/* <Route path='dashboard' element={<DashboardLayout />}> */}
            <Route index element={<Dashboard />} />
            <Route path="start" element={<StartInterview />} />
            <Route path="cv-manager" element={<CVManager />} />
            <Route path = "job-descriptions" element = {<JobDescriptionPage/>}/>
            <Route path = "job-details" element = {<JobDetailsPage/>}/>
            <Route path = "interviewQuestions" element = {<InterviewQuestionPage/>}/>
            <Route path = "interview-summary" element = {<InterviewSummaryPage/>}/>
            <Route path = "*" element = {<ComingSoon/>}/>
            {/* <Route path='*' element={<NotFoundPage />} /> */}
            {/* <Route path="profile" element={<ProfilePage />} /> */}
          </Route>

        {/* 404 Not Found */}
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App
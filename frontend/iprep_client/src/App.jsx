import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/login'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<h1 className="text-3xl text-center mt-20">Welcome to Dashboard</h1>} />
      </Routes>
    </Router>
  )
}

export default App

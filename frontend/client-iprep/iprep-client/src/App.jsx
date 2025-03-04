import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from './pages/login'
import Dashboard from "./pages/Dashboard";

function App() {
  const isAuthenticated = !!localStorage.getItem("token"); // Check if token exists

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard/>:<Navigate to="/" replace/>
            
            // (
            //   <h1 className="text-3xl text-center mt-20">Welcome to Dashboard</h1>
            // ) : (
            //   <Navigate to="/" replace />
            // )
          }/>
      </Routes>
    </Router>
  );
}

export default App;

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import './App.css'
// import Login from './pages/login'

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/dashboard" element={<h1 className="text-3xl text-center mt-20">Welcome to Dashboard</h1>} />
//       </Routes>
//     </Router>
//   )
// }

// export default App
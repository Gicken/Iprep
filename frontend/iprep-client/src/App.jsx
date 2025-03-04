import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from './pages/Layout'
import Home from "./pages/Home";
import StartInterview from "./pages/StartInterview";
import CVManager from "./pages/CVManager";


function App() {

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="start" element={<StartInterview />} />
          <Route path="login" element={<login />} />
          <Route path="cv-upload" element={<CVManager />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
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
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post("http://127.0.0.1:5000/auth/login", {
                email,
                password,
            });

            console.log("Response: ", response.data);

            const newToken = response.data.access_token;
            console.log("Token: ", newToken)
            localStorage.setItem("token", newToken);
            setIsAuthenticated(true);

            // let's decode the token to get user details
            const decodedUser = jwtDecode(newToken);
            console.log("Decoded User: ", decodedUser);

            // Store user details in localStorage
            const userDetails = decodedUser;
            console.log("Decoded User Details: ", userDetails)
            localStorage.setItem("FirstName: ", userDetails.firstName);
            localStorage.setItem("LastName: ", userDetails.lastName);
            localStorage.setItem("Email: ", userDetails.email);
            localStorage.setItem("Role: ", userDetails.role);
            localStorage.setItem("ID: ", userDetails.id);
            localStorage.setItem("user", JSON.stringify(decodedUser));

            navigate("/dashboard");
        } catch (error) {
            setError("Invalid email or password", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-6">
                    {isAuthenticated ? "Dashboard" : "Login"}
                </h2>

                {error && <p className="text-red-500 text-center">{error}</p>}

                {!isAuthenticated ? (
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700">Password</label>
                            <input
                                type="password"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                        >
                            Login
                        </button>
                    </form>
                ) : (
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                    >
                        Logout
                    </button>
                )}
            </div>
        </div>
    );
};

export default Login;


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';

// // create login function
// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setError("");

//         try {
//             const response = await axios.post("http://127.0.0.1:5000/auth/login",{
//                 email,
//                 password
//             });

//             console.log("Response: ", response);

//             const {token} = response.data;
//             console.log("Toke: ", token)
//             localStorage.setItem("token", token);
//             navigate("/dashboard");
//         } catch (error) {
//             setError("Invalid email or password", error)
//         }
//     };
//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//           <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//             <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
    
//             {error && <p className="text-red-500 text-center">{error}</p>}
    
//             <form onSubmit={handleLogin} className="space-y-4">
//               <div>
//                 <label className="block text-gray-700">Email</label>
//                 <input
//                   type="email"
//                   className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
    
//               <div>
//                 <label className="block text-gray-700">Password</label>
//                 <input
//                   type="password"
//                   className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>
    
//               <button
//                 type="submit"
//                 className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
//               >
//                 Login
//               </button>
//             </form>
//           </div>
//         </div>
//       );
//     };
    
// export default Login;
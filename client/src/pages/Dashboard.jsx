import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";


const Dashboard = () => {

    const { setTitle } = useOutletContext(); // Get `setTitle` from context

    useEffect(() => {
        setTitle("Dashboard"); // Update title when component mounts
    });

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* ... Your content cards ... */}
                <div className="bg-gray-800 rounded-md p-6">
                    <h2 className="text-xl font-semibold mb-4 border-y border-gray-600 py-2 px-4 rounded-lg flex items-center">
                        <span className="flex-1 text-center">Recent Practice Interviews</span> 
                    </h2>
                </div>
                <div className="bg-gray-800 rounded-md p-6">
                    <h2 className="text-xl text-center font-semibold mb-4 border-y border-gray-600 py-2 px-4 rounded-lg">
                        Performance Overview
                    </h2>
                </div>
                <div className="bg-gray-800 rounded-md p-6">
                    <h2 className="text-xl text-center font-semibold mb-4 border-y border-gray-600 py-2 px-4 rounded-lg">
                        Tips and Recommendations
                    </h2>
                </div>
                <div className="bg-gray-800 rounded-md p-6">
                    <h2 className="text-xl text-center font-semibold mb-4 border-y border-gray-600 py-2 px-4 rounded-lg">
                        Quick Start
                    </h2>
                    <Link to="/start" className="btn-primary align-items-center">
                        Start New Interview
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
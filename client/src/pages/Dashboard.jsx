import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const Dashboard = () => {
    const { setTitle } = useOutletContext();

    useEffect(() => {
        setTitle("Dashboard");
    }, [setTitle]);

    // Fake Data for Recent Practice Interviews
    const recentInterviews = [
        { id: 1, date: "2023-10-26", topic: "JavaScript Fundamentals", score: "85%" },
        { id: 2, date: "2023-10-24", topic: "React Hooks", score: "78%" },
        { id: 3, date: "2023-10-20", topic: "Data Structures", score: "92%" },
    ];

    // Fake Data for Performance Overview
    const performanceData = {
        averageScore: "85%",
        completedInterviews: 15,
        areasToImprove: ["Time Management", "Technical Depth"],
    };

    // Fake Data for Tips and Recommendations
    const tips = [
        "Practice speaking your answers aloud.",
        "Review common algorithms and data structures.",
        "Focus on explaining your thought process.",
    ];

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Recent Practice Interviews */}
                <div className="bg-gray-800 rounded-md p-6">
                    <h2 className="text-xl font-semibold mb-4 border-y border-gray-600 py-2 px-4 rounded-lg flex items-center">
                        <span className="flex-1 text-center">Recent Practice Interviews</span>
                    </h2>
                    <ul className="space-y-2">
                        {recentInterviews.map((interview) => (
                            <li key={interview.id} className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{interview.topic}</p>
                                    <p className="text-sm text-gray-400">{interview.date}</p>
                                </div>
                                <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">{interview.score}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Performance Overview */}
                <div className="bg-gray-800 rounded-md p-6">
                    <h2 className="text-xl text-center font-semibold mb-4 border-y border-gray-600 py-2 px-4 rounded-lg">
                        Performance Overview
                    </h2>
                    <div className="space-y-2">
                        <p>
                            <strong>Average Score:</strong> {performanceData.averageScore}
                        </p>
                        <p>
                            <strong>Completed Interviews:</strong> {performanceData.completedInterviews}
                        </p>
                        <p>
                            <strong>Areas to Improve:</strong>
                            <ul className="list-disc list-inside">
                                {performanceData.areasToImprove.map((area, index) => (
                                    <li key={index}>{area}</li>
                                ))}
                            </ul>
                        </p>
                    </div>
                </div>

                {/* Tips and Recommendations */}
                <div className="bg-gray-800 rounded-md p-6">
                    <h2 className="text-xl text-center font-semibold mb-4 border-y border-gray-600 py-2 px-4 rounded-lg">
                        Tips and Recommendations
                    </h2>
                    <ul className="list-disc list-inside space-y-2">
                        {tips.map((tip, index) => (
                            <li key={index}>{tip}</li>
                        ))}
                    </ul>
                </div>

                {/* Quick Start */}
                <div className="bg-gray-800 rounded-md p-6">
                    <h2 className="text-xl text-center font-semibold mb-4 border-y border-gray-600 py-2 px-4 rounded-lg">
                        Quick Start
                    </h2>
                    <Link to="/dashboard/start" className="btn-primary align-items-center">
                        Start New Interview
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
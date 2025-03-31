import React from 'react';

const PerformanceOverview = () => {
  // Fake Data for Performance Overview
  const performanceData = {
    averageScore: '85%',
    completedInterviews: 15,
    areasToImprove: ['Time Management', 'Technical Depth'],
  };

  return (
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
  );
};

export default PerformanceOverview;
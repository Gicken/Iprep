import React from 'react';

const TipsAndRecommendations = () => {
  // Fake Data for Tips and Recommendations
  const tips = [
    'Practice speaking your answers aloud.',
    'Review common algorithms and data structures.',
    'Focus on explaining your thought process.',
  ];

  return (
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
  );
};

export default TipsAndRecommendations;
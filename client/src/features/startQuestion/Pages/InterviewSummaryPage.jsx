import React from 'react';

const InterviewSummaryPage = ({ summaryData }) => {
  if (!summaryData) {
    return <p>Loading interview summary...</p>; // Or some other loading state
  }

  if (Object.keys(summaryData).length === 0) {
    return <p>No interview summary available.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Interview Summary</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(summaryData).map(([question, response]) => (
          <div key={question} className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-semibold mb-2">{question}</h2>
            <p className="text-gray-700">{response}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewSummaryPage;
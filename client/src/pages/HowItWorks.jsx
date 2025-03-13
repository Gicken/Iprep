import React from 'react';

const HowItWorks = () => {
  return (
    <div className="flex items-start justify-center flex-grow bg-[#1A1C1B] text-white">
        <div className="max-w-4xl p-8 flex flex-col h-full">
        <h1 className="text-4xl font-bold mb-6 border-y border-gray-600 py-2">How It Works</h1>
        <p className="text-lg mb-4">
          Our AI-powered interview tool helps you practice and improve your interview skills.
        </p>
        <ol className="list-decimal list-inside mb-6">
          <li><strong>Upload Your Resume:</strong> Upload your resume to get personalized interview questions.</li>
          <li><strong>Practice Interviews:</strong> Practice with AI-generated interview questions.</li>
          <li><strong>Get Feedback:</strong> Receive detailed feedback on your performance.</li>
          <li><strong>Improve Skills:</strong> Use the feedback to enhance your interview skills.</li>
        </ol>
        <p className="text-lg">
          Start practicing today and get ready for your next big interview!
        </p>
      </div>
    </div>
  );
};

export default HowItWorks;
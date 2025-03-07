import React from 'react';

const FAQs = () => {
  return (
    <div className="flex items-start justify-center flex-grow bg-[#1A1C1B] text-white">
        <div className="max-w-4xl p-8 flex flex-col h-full">
        <h1 className="text-4xl font-bold mb-6 border-y border-gray-600 py-2">Frequently Asked Questions</h1>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">What is this tool?</h2>
          <p className="text-lg">
            This tool is an AI-powered interview practice platform designed to help you prepare for job interviews.
          </p>
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">How do I get started?</h2>
          <p className="text-lg">
            Simply sign up, upload your resume, and start practicing with AI-generated questions.
          </p>
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">Is my data secure?</h2>
          <p className="text-lg">
            Yes, we take your data security very seriously. Your information is encrypted and protected.
          </p>
        </div>
        <p className="text-lg">
          If you have more questions, please contact our support team.
        </p>
      </div>
    </div>
  );
};

export default FAQs;
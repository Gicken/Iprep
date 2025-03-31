import React from 'react';

const RecentInterviews = () => {
  // Fake Data for Recent Practice Interviews
  const recentInterviews = [
    { id: 1, date: '2023-10-26', topic: 'JavaScript Fundamentals', score: '85%' },
    { id: 2, date: '2023-10-24', topic: 'React Hooks', score: '78%' },
    { id: 3, date: '2023-10-20', topic: 'Data Structures', score: '92%' },
  ];

  return (
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
  );
};

export default RecentInterviews;
import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import RecentInterviews from '../components/RecentInterviews';
import PerformanceOverview from '../components/PerformanceOverview';
import TipsAndRecommendations from '../components/TipsAndRecommendations';
import QuickStart from '../components/QuickStart';

const Dashboard = () => {
  const { setTitle } = useOutletContext();

  useEffect(() => {
    setTitle('Dashboard');
  }, [setTitle]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Recent Practice Interviews */}
      <RecentInterviews />

      {/* Performance Overview */}
      <PerformanceOverview />

      {/* Tips and Recommendations */}
      <TipsAndRecommendations />

      {/* Quick Start */}
      <QuickStart />
    </div>
  );
};

export default Dashboard;
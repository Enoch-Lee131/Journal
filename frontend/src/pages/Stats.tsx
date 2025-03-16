import React from "react";

interface StatsProps {
  user: any;
}

const Stats: React.FC<StatsProps> = ({ user }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Statistics</h2>
        <p className="mt-4">Coming soon...</p>
      </div>
    </div>
  );
};

export default Stats;

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome back!</h1>
        <p className="text-gray-600 mb-6">
          Manage your dog registrations and adoption activities from your dashboard.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/register-dog"
            className="bg-green-600 text-white p-6 rounded-lg hover:bg-green-700 transition-colors text-center"
          >
            <div className="text-3xl mb-2">📝</div>
            <h3 className="text-lg font-semibold mb-2">Register a Dog</h3>
            <p className="text-green-100">Help a stray dog find a home</p>
          </Link>

          <Link
            to="/search"
            className="bg-blue-600 text-white p-6 rounded-lg hover:bg-blue-700 transition-colors text-center"
          >
            <div className="text-3xl mb-2">🔍</div>
            <h3 className="text-lg font-semibold mb-2">Find Dogs</h3>
            <p className="text-blue-100">Search for dogs to adopt</p>
          </Link>
        </div>
      </div>

      {/* Placeholder for future features */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Your Activity</h2>
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-4">🚧</div>
          <p>Activity tracking coming soon!</p>
          <p className="text-sm mt-2">
            We're working on features to show your registered dogs and adoption interests.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
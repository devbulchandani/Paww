import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          🐾 Welcome to Paww
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Connecting stray dogs with loving homes. Register stray dogs you find or search for your perfect companion to adopt.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/search"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Find Dogs to Adopt
          </Link>
          
          {isAuthenticated ? (
            <Link
              to="/register-dog"
              className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Register a Stray Dog
            </Link>
          ) : (
            <Link
              to="/register"
              className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Join Paww
            </Link>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">Easy Search</h3>
          <p className="text-gray-600">
            Find dogs near you with advanced filters for age, gender, vaccination status, and location.
          </p>
        </div>

        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <div className="text-4xl mb-4">📱</div>
          <h3 className="text-xl font-semibold mb-2">Quick Registration</h3>
          <p className="text-gray-600">
            Register stray dogs you find with photos and location details to help them find homes.
          </p>
        </div>

        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <div className="text-4xl mb-4">🤝</div>
          <h3 className="text-xl font-semibold mb-2">Direct Connection</h3>
          <p className="text-gray-600">
            Connect directly with dog registrants via phone or WhatsApp for quick adoption processes.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-50 rounded-lg p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Making a Difference</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-blue-600">500+</div>
              <div className="text-gray-600">Dogs Registered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">200+</div>
              <div className="text-gray-600">Successful Adoptions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">1000+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* For Adopters */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">For Adopters</h3>
            <div className="space-y-4 text-left">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold">1</div>
                <div>
                  <h4 className="font-medium">Search Dogs</h4>
                  <p className="text-gray-600 text-sm">Browse available dogs with filters for location, age, and more.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold">2</div>
                <div>
                  <h4 className="font-medium">Contact Registrant</h4>
                  <p className="text-gray-600 text-sm">Get direct contact information to discuss adoption.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold">3</div>
                <div>
                  <h4 className="font-medium">Adopt & Care</h4>
                  <p className="text-gray-600 text-sm">Complete the adoption and provide a loving home.</p>
                </div>
              </div>
            </div>
          </div>

          {/* For Registrants */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-green-600">For Registrants</h3>
            <div className="space-y-4 text-left">
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold">1</div>
                <div>
                  <h4 className="font-medium">Find a Stray</h4>
                  <p className="text-gray-600 text-sm">Encounter a stray dog that needs help finding a home.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold">2</div>
                <div>
                  <h4 className="font-medium">Register Details</h4>
                  <p className="text-gray-600 text-sm">Upload photos and provide location and health information.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold">3</div>
                <div>
                  <h4 className="font-medium">Connect Adopters</h4>
                  <p className="text-gray-600 text-sm">Receive calls from interested adopters and facilitate adoption.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
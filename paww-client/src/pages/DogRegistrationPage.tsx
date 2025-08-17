import React from 'react';
import DogRegistrationForm from '../components/Dogs/DogRegistrationForm';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const DogRegistrationPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <DogRegistrationForm />
    </div>
  );
};

export default DogRegistrationPage;
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/Auth/LoginForm';

const LoginPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // Redirect to homepage if already logged in
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
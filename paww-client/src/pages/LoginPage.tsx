import React from 'react';
import LoginForm from '../components/Auth/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
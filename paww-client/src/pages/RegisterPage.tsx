import React from 'react';
import RegisterForm from '../components/Auth/RegisterForm';

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
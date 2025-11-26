// Forbidden.jsx
import React from 'react';
import { useNavigate } from 'react-router'; // React Router v6 ব্যবহার করলে

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-10 text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">403</h1>
        <h2 className="text-2xl font-semibold mb-6">Forbidden</h2>
        <p className="text-gray-600 mb-8">
          You don’t have permission to access this page.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Go to Home
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate('/dashboard')}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;

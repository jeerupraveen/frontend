import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    try {
      // Replace with your API endpoint for password reset
      const response = await axios.post('http://127.0.0.1:5000/authentication/forgot-password', { Email:email });
      console.log(response)
      if (response.status === 200) {
        setSuccess('Password reset instructions sent to your email!');
        // Store email in session storage
        sessionStorage.setItem('userEmail', email);
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center text-gray-900">Forgot Password?</h2>
        <p className="text-sm text-center text-gray-600">
          No worries, we’ll send you reset instructions.
        </p>
        <form className="mt-6" onSubmit={handleSubmit}>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="block w-full px-4 py-2 mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Reset Password
          </button>
        </form>
        <div className="flex content-center justify-center mt-4">
          <button className="text-sm text-center text-blue-600 hover:underline">
            Back to login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

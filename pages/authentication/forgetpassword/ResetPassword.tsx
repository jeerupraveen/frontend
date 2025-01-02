import React, { useState } from 'react';
import axios from 'axios';

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  
  const email = sessionStorage.getItem('userEmail'); // Get email from session storage
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      setSuccessMessage('');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/authentication/reset-password', { Email: email, NewPassword: password });
      setSuccessMessage(response.data.message);
      setErrorMessage('');
      // Clear sessionStorage after successful password reset
      sessionStorage.removeItem('userEmail');
    } catch (error:any) {
      if (error.response) {
        setErrorMessage(error.response.data.error);
        setSuccessMessage('');
      } else {
        setErrorMessage('Something went wrong, please try again.');
        setSuccessMessage('');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center text-gray-900">Set New Password</h2>
        <form className="mt-6" onSubmit={handleSubmit}>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="block w-full px-4 py-2 mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="confirm-password" className="block mt-4 text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            id="confirm-password"
            type="password"
            className="block w-full px-4 py-2 mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Reset Password
          </button>
        </form>
        <button className="block mt-4 text-sm text-center text-blue-600 hover:underline">
          Back to login
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;

import React, { useState } from 'react';
import axios from 'axios';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }

    try {
      // Here, replace with your authentication API
      const response = await axios.post(
        'http://127.0.0.1:5000/authentication/signin',
        { Email:email, Password:password }
      );

      // Handle successful login response
      console.log('Login successful:', response.data);
    } catch (error) {
      setError('Invalid email or password.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center text-gray-900">Welcome Back</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form className="mt-6" onSubmit={handleSubmit}>
          <label htmlFor="email" className="block mt-4 text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className="block w-full px-4 py-2 mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password" className="block mt-4 text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="block w-full px-4 py-2 mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex items-center justify-between mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-purple-600 border-gray-300 rounded"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <span className="ml-2 text-sm text-gray-600">Remember Me</span>
            </label>
            <button className="text-sm text-purple-600 hover:underline">
              Forgot password?
            </button>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-white bg-purple-600 rounded-md hover:bg-purple-700"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;

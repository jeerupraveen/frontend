import React, { useState } from 'react';
import axios from 'axios';

const SignUp: React.FC = () => {
  const [details, setDetails] = useState({
    Name: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
    PhoneNumber: '',
  });

  const [errors, setErrors] = useState({
    Name: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
    PhoneNumber: '',
    General: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {
      Name: '',
      Email: '',
      Password: '',
      ConfirmPassword: '',
      PhoneNumber: '',
      General: '',
    };

    if (!details.Name) newErrors.Name = 'Name is required.';
    if (!details.Email) newErrors.Email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(details.Email)) newErrors.Email = 'Email address is invalid.';
    if (!details.Password) newErrors.Password = 'Password is required.';
    if (!details.ConfirmPassword) newErrors.ConfirmPassword = 'Confirm Password is required.';
    else if (details.Password !== details.ConfirmPassword) newErrors.ConfirmPassword = 'Passwords do not match.';
    if (!details.PhoneNumber) newErrors.PhoneNumber = 'Phone number is required.';
    else if (!/^\d{10}$/.test(details.PhoneNumber)) newErrors.PhoneNumber = 'Phone number is invalid.';

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === '');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors((prevErrors) => ({ ...prevErrors, General: '' })); // Reset general error state before submitting

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/authentication/signup',
        {
          Name: details.Name,
          Email: details.Email,
          Password: details.Password,
          PhoneNumber: details.PhoneNumber,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log("rescbsdbsdbh",response);
      // Handle successful response
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        setErrors((prevErrors) => ({ ...prevErrors, General: 'An account with this email already exists.' }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, General: 'An error occurred. Please try again later.' }));
      }
      console.error(error);
      // Handle other errors
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow sm:max-w-xl">
        <div className="w-full">
          <h2 className="text-2xl font-bold text-center text-gray-900">Sign Up</h2>
          <p className="text-center text-sm text-gray-600">
            Enter your details below to create your account and get started.
          </p>
        </div>
        <div className="w-full flex content-center justify-center">
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block mt-4 text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                name="Name"
                type="text"
                className="block w-full px-4 py-2 mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter your Name"
                value={details.Name}
                onChange={handleChange}
              />
              {errors.Name && <p className="text-red-500 text-sm mt-2">{errors.Name}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="block mt-4 text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                id="phone"
                name="PhoneNumber"
                type="text"
                className="block w-full px-4 py-2 mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter your phone number"
                value={details.PhoneNumber}
                onChange={handleChange}
              />
              {errors.PhoneNumber && <p className="text-red-500 text-sm mt-2">{errors.PhoneNumber}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block mt-4 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="Email"
                type="email"
                className="block w-full px-4 py-2 mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter your email"
                value={details.Email}
                onChange={handleChange}
              />
              {errors.Email && <p className="text-red-500 text-sm mt-2">{errors.Email}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block mt-4 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="Password"
                type="password"
                className="block w-full px-4 py-2 mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter your password"
                value={details.Password}
                onChange={handleChange}
              />
              {errors.Password && <p className="text-red-500 text-sm mt-2">{errors.Password}</p>}
            </div>
            <div>
              <label htmlFor="confirmpassword" className="block mt-4 text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmpassword"
                name="ConfirmPassword"
                type="password"
                className="block w-full px-4 py-2 mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter your confirm password"
                value={details.ConfirmPassword}
                onChange={handleChange}
              />
              {errors.ConfirmPassword && <p className="text-red-500 text-sm mt-2">{errors.ConfirmPassword}</p>}
            </div>
            {errors.General && <p className="text-red-500 text-sm">{errors.General}</p>}
            <div className="flex flex-col sm:flex-row sm:space-x-4 mt-6">
              <button className="w-full py-2 px-4 text-black border border-black bg-white-100 hover:bg-gray-100 rounded-md sm:w-auto mt-4 mb-4">
                Cancel
              </button>
              <button type="submit" className="w-full py-2 px-4 text-white border border-black bg-purple-700 hover:bg-purple-600 rounded-md sm:w-auto mt-4 mb-4">
                Confirm
              </button>
            </div>
          </form>
        </div>
        <footer className="mt-4 text-center">
          <p>Already have an account? <button className="text-purple-600">Login</button></p>
        </footer>
      </div>
    </div>
  );
};

export default SignUp;

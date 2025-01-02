import React, { useState } from 'react';
import axios from 'axios';

const OTPValidation: React.FC = () => {
  const [otp, setOtp] = useState<string>(''); // OTP input state
  const [errorMessage, setErrorMessage] = useState<string>(''); // Error state
  const [successMessage, setSuccessMessage] = useState<string>(''); // Success state
  const email = sessionStorage.getItem('userEmail'); // Get email from session storage

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const otpArray = otp.split('');
    otpArray[index] = e.target.value;
    setOtp(otpArray.join(''));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Send OTP and email to backend for verification
      const response = await axios.post('http://127.0.0.1:5000/authentication/verify-otp', { Email: email, OTP: otp });
      setSuccessMessage(response.data.message);
      setErrorMessage('');
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
        <h2 className="text-2xl font-bold text-center text-gray-900">Password Reset Code</h2>
        <p className="text-sm text-center text-gray-600">
          We sent a code to your email: <strong>{email}</strong>. Please enter it below.
        </p>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-6 gap-2">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  className="w-full px-4 py-2 text-center border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={otp[i] || ''}
                  onChange={(e) => handleOtpChange(e, i)}
                />
              ))}
          </div>
          {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Continue
          </button>
        </form>
        <p className="text-center">
          Didn’t receive the email?
          <button className="text-lg text-center text-blue-600 hover:underline">
            Click here.
          </button>
        </p>
      </div>
    </div>
  );
};

export default OTPValidation;

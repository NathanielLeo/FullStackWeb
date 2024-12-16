import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { goToSignUp, goToForgotPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Hardcoded credentials for testing
    const hardcodedEmail = "long@gmail.com";
    const hardcodedPassword = "123456";

    if (email === hardcodedEmail && password === hardcodedPassword) {
      const token = "hardcodedToken123"; // Simulate a token

      if (rememberMe) {
        localStorage.setItem('authToken', token);
      } else {
        sessionStorage.setItem('authToken', token);
      }

      setError('');
      setSuccess('Đăng nhập thành công! Đang chuyển hướng...');

      // Delay navigation to allow the user to see the success message
      setTimeout(() => {
        // Chuyển hướng vào trang /admin sau khi đăng nhập thành công
        navigate('/admin');
      }, 2000); // 2 seconds delay

      return;
    }

    // Error if hardcoded credentials do not match
    setError('Email hoặc mật khẩu không đúng.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-900 rounded-lg shadow-xl p-8 space-y-6 animate__animated animate__fadeInUp">
        <div className="text-center space-y-2 mb-8 animate__animated animate__fadeIn animate__delay-1s">
          <div className="flex items-center justify-center mb-4">
            <div className="text-blue-500 text-3xl animate__animated animate__bounceIn">★</div>
            <div className="text-white text-2xl ml-2">Sitemark</div>
          </div>
          <h1 className="text-3xl font-bold text-white animate__animated animate__fadeIn animate__delay-1s">
            Sign in
          </h1>
        </div>

        {error && <div className="text-red-500 text-center">{error}</div>}
        {success && <div className="text-green-500 text-center">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-4 animate__animated animate__fadeIn animate__delay-2s">
          <div className="space-y-2">
            <label className="block text-sm text-gray-400">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-gray-400">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
            />
            <label className="ml-2 text-sm text-gray-400">Remember me</label>
          </div>

          <button
            type="submit"
            className="w-full bg-white text-gray-900 py-2 px-4 rounded-md font-medium hover:bg-gray-100 transition duration-200 animate__animated animate__fadeIn animate__delay-2s"
          >
            Sign in
          </button>
        </form>

        <div className="text-center mt-4">
          <button onClick={goToForgotPassword} className="text-blue-500">Forgot your password?</button>
        </div>

        <div className="text-center text-sm text-gray-400 mt-4">
          Don't have an account?{' '}
          <button onClick={goToSignUp} className="text-blue-500">Sign up</button>
        </div>
      </div>
    </div>
  );
};

export default Login;

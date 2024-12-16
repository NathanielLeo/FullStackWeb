import React, { useState } from 'react';
import axios from 'axios';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/user/forget', {
        email,
      });
      if (response.status === 200) {
        setMessage('Liên kết đặt lại mật khẩu đã được gửi đến email của bạn.');
      } else {
        setError('Yêu cầu không thành công.');
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi gửi yêu cầu.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-900 rounded-lg shadow-xl p-8 space-y-6 animate__animated animate__fadeInUp">
        <h1 className="text-3xl font-bold text-white mb-4 text-center">Quên mật khẩu</h1>

        {error && <div className="text-red-500 text-center">{error}</div>}
        {message && <div className="text-green-500 text-center">{message}</div>}

        <form onSubmit={handleForgetPassword} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm text-gray-400">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              placeholder="your@email.com"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white text-gray-900 py-2 px-4 rounded-md font-medium hover:bg-gray-100 transition duration-200"
          >
            Gửi yêu cầu
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;

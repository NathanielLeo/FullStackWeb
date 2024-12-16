import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ConfigCreate = () => {
  const [siteName, setSiteName] = useState('');
  const [email, setEmail] = useState('');
  const [phones, setPhones] = useState('');
  const [address, setAddress] = useState('');
  const [hotline, setHotline] = useState('');
  const [zalo, setZalo] = useState('');
  const [facebook, setFacebook] = useState('');
  const [status, setStatus] = useState('active'); // default to active
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newConfig = {
      site_name: siteName,
      email: email,
      phones: phones,
      address: address,
      hotline: hotline,
      zalo: zalo,
      facebook: facebook,
      status: status,
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/config/store', newConfig);

      if (response.status === 200 && response.data.status) {
        setSuccessMessage('Tạo config thành công!');
        setError('');
        navigate('/admin/config');  // Redirect back to config list after success
      } else {
        setError(response.data.message || 'Không thể tạo config.');
        setSuccessMessage('');
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi tạo config.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-3xl shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">Tạo Config Mới</h1>

        {/* Success message */}
        {successMessage && (
          <div className="bg-green-500 text-white p-4 rounded mb-4">{successMessage}</div>
        )}

        {/* Error message */}
        {error && (
          <div className="bg-red-500 text-white p-4 rounded mb-4">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="siteName" className="block text-gray-700">Tên Site</label>
            <input
              type="text"
              id="siteName"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mt-2"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mt-2"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phones" className="block text-gray-700">Số điện thoại</label>
            <input
              type="text"
              id="phones"
              value={phones}
              onChange={(e) => setPhones(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mt-2"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700">Địa chỉ</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mt-2"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="hotline" className="block text-gray-700">Hotline</label>
            <input
              type="text"
              id="hotline"
              value={hotline}
              onChange={(e) => setHotline(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mt-2"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="zalo" className="block text-gray-700">Zalo</label>
            <input
              type="text"
              id="zalo"
              value={zalo}
              onChange={(e) => setZalo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mt-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="facebook" className="block text-gray-700">Facebook</label>
            <input
              type="text"
              id="facebook"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mt-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="status" className="block text-gray-700">Trạng thái</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mt-2"
            >
              <option value="active">Hoạt động</option>
              <option value="inactive">Không hoạt động</option>
            </select>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300"
            >
              Tạo Config
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfigCreate;

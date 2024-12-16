import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ConfigUpdate = () => {
  const { id } = useParams();  // Get the config ID from the URL
  const [config, setConfig] = useState({
    site_name: '',
    email: '',
    phones: '',
    address: '',
    hotline: '',
    zalo: '',
    facebook: '',
    status: '',
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();  // For navigation

  // Fetch configuration details when the component mounts
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/config/show/${id}`);
        
        if (response.status === 200 && response.data.status) {
          setConfig(response.data.Config);  // Set the fetched config details
          setError(null);
        } else {
          setError('Không tìm thấy config này.');
        }
      } catch (err) {
        setError('Có lỗi xảy ra khi tải dữ liệu.');
      }
    };

    fetchConfig();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig((prevConfig) => ({
      ...prevConfig,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent page reload

    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/config/update/${id}`, config);
      
      if (response.status === 200 && response.data.status) {
        setSuccessMessage('Cập nhật config thành công.');
        setError(null);
        setTimeout(() => {
          navigate('/admin/config');  // Redirect to config list page after success
        }, 1500);
      } else {
        setError('Có lỗi xảy ra khi cập nhật config.');
        setSuccessMessage(null);
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi cập nhật config.');
      setSuccessMessage(null);
    }
  };

  if (error) {
    return <div className="bg-red-500 text-white p-4 rounded mb-4">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-3xl shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">Cập Nhật Config</h1>

        {/* Success message */}
        {successMessage && (
          <div className="bg-green-500 text-white p-4 rounded mb-4">
            {successMessage}
          </div>
        )}

        {/* Update Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Tên Site</label>
            <input
              type="text"
              name="site_name"
              value={config.site_name}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={config.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Số Điện Thoại</label>
            <input
              type="text"
              name="phones"
              value={config.phones}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Địa Chỉ</label>
            <input
              type="text"
              name="address"
              value={config.address}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Hotline</label>
            <input
              type="text"
              name="hotline"
              value={config.hotline}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Zalo</label>
            <input
              type="text"
              name="zalo"
              value={config.zalo}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Facebook</label>
            <input
              type="text"
              name="facebook"
              value={config.facebook}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Trạng Thái</label>
            <select
              name="status"
              value={config.status}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl p-2 w-full"
            >
              <option value="">Chọn trạng thái</option>
              <option value="active">Hoạt động</option>
              <option value="inactive">Không hoạt động</option>
            </select>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300"
            >
              Cập Nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfigUpdate;

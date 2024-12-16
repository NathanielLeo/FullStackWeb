import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ConfigDetail = () => {
  const { id } = useParams();  // Get the config ID from the URL
  const [config, setConfig] = useState(null);  // State to store the configuration details
  const [error, setError] = useState(null);  // State to store any errors
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
  }, [id]);  // Re-run the effect if the ID changes

  if (error) {
    return <div className="bg-red-500 text-white p-4 rounded">{error}</div>;
  }

  if (!config) {
    return <div>Đang tải dữ liệu...</div>;  // Show loading message while fetching data
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-3xl shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">Chi Tiết Config</h1>

        {/* Displaying Configuration Details */}
        <div className="mb-4">
          <strong className="text-lg">Tên Site:</strong> <span>{config.site_name}</span>
        </div>
        <div className="mb-4">
          <strong className="text-lg">Email:</strong> <span>{config.email}</span>
        </div>
        <div className="mb-4">
          <strong className="text-lg">Số điện thoại:</strong> <span>{config.phones}</span>
        </div>
        <div className="mb-4">
          <strong className="text-lg">Địa chỉ:</strong> <span>{config.address}</span>
        </div>
        <div className="mb-4">
          <strong className="text-lg">Hotline:</strong> <span>{config.hotline}</span>
        </div>
        <div className="mb-4">
          <strong className="text-lg">Zalo:</strong> <span>{config.zalo}</span>
        </div>
        <div className="mb-4">
          <strong className="text-lg">Facebook:</strong> <span>{config.facebook}</span>
        </div>
        <div className="mb-4">
          <strong className="text-lg">Trạng thái:</strong> <span>{config.status}</span>
        </div>

        {/* Back to List Button */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/admin/config')}  // Navigate back to config list
            className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300"
          >
            Quay lại danh sách Config
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfigDetail;

import React, { useEffect, useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import axios from 'axios';

const Config = () => {
  const [configs, setConfigs] = useState([]);
  const [filteredConfigs, setFilteredConfigs] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Hàm tìm kiếm
  const handleSearch = (query) => {
    const filtered = configs.filter((config) =>
      config.site_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredConfigs(filtered);
  };

  // Fetch dữ liệu Config từ API khi component render
  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/config');
        if (response.status === 200) {
          setConfigs(response.data.configs);
          setFilteredConfigs(response.data.configs);
          setError(null);
        } else {
          setError('Lỗi khi tải dữ liệu.');
        }
      } catch (error) {
        setError('Có lỗi xảy ra khi lấy dữ liệu Config.');
      }
    };

    fetchConfigs();
  }, []);
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa banner này?')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/banner/${id}`);
        setConfigs(configs.filter((banner) => banner.id !== id));
        setFilteredConfigs(filteredConfigs.filter((banner) => banner.id !== id));
        setSuccessMessage('Xóa banner thành công.');
        setError(null);
      } catch (err) {
        setError('Có lỗi xảy ra khi xóa banner.');
        setSuccessMessage('');
      }
    }
  }; 
  const handleUpdate = (id) => {
    navigate(`/admin/config/update/${id}`);
  };
  const handleShow = async (id) => {
    navigate(`/admin/config/show/${id}`);
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6">
        {/* Thông báo thành công */}
        {successMessage && (
          <div className="bg-green-500 text-white p-4 rounded mb-4">
            {successMessage}
          </div>
        )}

        {/* Thông báo lỗi */}
        {error && (
          <div className="bg-red-500 text-white p-4 rounded mb-4">
            {error}
          </div>
        )}

        <header className="bg-white p-4 rounded-3xl shadow mb-6 flex justify-between items-center">
        <div className="relative flex items-center w-1/4">
          <CiSearch className="absolute left-3 text-gray-500" size={24} />
          <input
            type="text"
            placeholder="Tìm kiếm config..."
            className="border border-gray-300 rounded-xl pl-10 pr-4 py-2 w-60"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <Link to="/admin/config/store" className="bg-green-500 text-white px-4 py-2 rounded">
          + Thêm
        </Link>
      </header>

        {/* Bảng quản lý Config */}
        <div className="bg-white p-4 rounded-3xl shadow mb-6">
          <h3 className="text-bold text-lg font-semibold mb-4">QUẢN LÝ CONFIG</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200 text-center">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Tên site</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Số điện thoại</th>
                <th className="p-2 border">Địa chỉ</th>
                <th className="p-2 border">Hotline</th>
                <th className="p-2 border">Zalo</th>
                <th className="p-2 border">Facebook</th>
                <th className="p-2 border">Trạng thái</th>
                <th className="p-2 border">Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {filteredConfigs.length > 0 ? (
                filteredConfigs.map((config, index) => (
                  <tr key={index} className="border-b text-center">
                    <td className="p-2 border">{config.id}</td>
                    <td className="p-2 border">{config.site_name}</td>
                    <td className="p-2 border">{config.email}</td>
                    <td className="p-2 border">{config.phones}</td>
                    <td className="p-2 border">{config.address}</td>
                    <td className="p-2 border">{config.hotline}</td>
                    <td className="p-2 border">{config.zalo}</td>
                    <td className="p-2 border">{config.facebook}</td>
                    <td className="p-2 border">{config.status}</td>
                    <td className="p-2 border">
                      <div className="flex items-center gap-2">
                          <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => handleUpdate(config.id)}>
                            Cập nhật
                          </button>
                          <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(config.id)}>
                            Xóa
                          </button>
                          <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => handleShow(config.id)}>
                            Xem
                          </button>
                        </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center p-4">Không có Config nào</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Config;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MenuCreate = () => {
  const [menuData, setMenuData] = useState({
    name: '',
    link: '',
    type: '',
    table_id: '',
    status: 1,
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenuData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/menu', menuData);

      if (response.status === 200) {
        setSuccessMessage('Menu đã được tạo thành công!');
        setError('');
        // Optionally redirect to the menu list page
        navigate('/admin/menu');
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi tạo menu.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6">
        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-500 text-white p-4 rounded mb-4">
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-500 text-white p-4 rounded mb-4">
            {error}
          </div>
        )}

        <header className="bg-white p-4 rounded-3xl shadow mb-6 flex justify-between items-center">
          <h3 className="text-xl font-semibold">Thêm Menu Mới</h3>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={() => navigate('/admin/menu')}
          >
            Quay lại
          </button>
        </header>

        <div className="bg-white p-6 rounded-3xl shadow mb-6">
          <h3 className="text-lg font-semibold mb-4">Thông tin Menu</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="font-semibold">Tên Menu</label>
              <input
                type="text"
                id="name"
                name="name"
                value={menuData.name}
                onChange={handleChange}
                className="border border-gray-300 rounded-xl p-2"
                placeholder="Nhập tên menu"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="link" className="font-semibold">Link</label>
              <input
                type="text"
                id="link"
                name="link"
                value={menuData.link}
                onChange={handleChange}
                className="border border-gray-300 rounded-xl p-2"
                placeholder="Nhập link"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="type" className="font-semibold">Loại</label>
              <input
                type="text"
                id="type"
                name="type"
                value={menuData.type}
                onChange={handleChange}
                className="border border-gray-300 rounded-xl p-2"
                placeholder="Nhập loại menu"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="table_id" className="font-semibold">Table ID</label>
              <input
                type="number"
                id="table_id"
                name="table_id"
                value={menuData.table_id}
                onChange={handleChange}
                className="border border-gray-300 rounded-xl p-2"
                placeholder="Nhập table ID"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="status" className="font-semibold">Trạng thái</label>
              <select
                id="status"
                name="status"
                value={menuData.status}
                onChange={handleChange}
                className="border border-gray-300 rounded-xl p-2"
              >
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
              Lưu Menu
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MenuCreate;

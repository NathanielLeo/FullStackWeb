import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MenuDetail = () => {
  const { id } = useParams(); // To get the menu ID from the URL
  const [menu, setMenu] = useState(null); // State to store the menu data
  const [error, setError] = useState(null); // State to handle errors
  const navigate = useNavigate();

  // Fetch menu data by ID when the component mounts
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/menu/show/${id}`);
        if (response.status === 200) {
          setMenu(response.data.menu); // Set menu data to state
        }
      } catch (error) {
        setError('Có lỗi xảy ra khi tải dữ liệu menu.');
      }
    };

    fetchMenu();
  }, [id]); // Re-run the effect if the ID changes

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="p-6">
          <div className="bg-red-500 text-white p-4 rounded mb-4">{error}</div>
        </div>
      </div>
    );
  }

  if (!menu) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="p-6">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6">
        <header className="bg-white p-4 rounded-3xl shadow mb-6 flex justify-between items-center">
          <h3 className="text-xl font-semibold">Chi tiết Menu</h3>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={() => navigate('/admin/menu')}
          >
            Quay lại
          </button>
        </header>

        <div className="bg-white p-6 rounded-3xl shadow mb-6">
          <h3 className="text-lg font-semibold mb-4">Thông tin Menu</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-semibold">ID:</span>
              <span>{menu.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Tên:</span>
              <span>{menu.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Link:</span>
              <span>{menu.link}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Loại:</span>
              <span>{menu.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Table ID:</span>
              <span>{menu.table_id}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Người tạo:</span>
              <span>{menu.created_by}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Người cập nhật:</span>
              <span>{menu.updated_by}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Ngày tạo:</span>
              <span>{menu.created_at}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Ngày cập nhật:</span>
              <span>{menu.updated_at}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Trạng thái:</span>
              <span>{menu.status === 1 ? 'Active' : 'Inactive'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDetail;

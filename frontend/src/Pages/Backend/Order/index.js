import React, { useEffect, useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import axios from 'axios';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Hàm tìm kiếm
  const handleSearch = (query) => {
    const filtered = orders.filter((order) =>
      order.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredOrders(filtered);
  };

  // Fetch dữ liệu Order từ API khi component render
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/order'); // Đảm bảo API endpoint chính xác
        if (response.status === 200) {
          setOrders(response.data.orders); // Thay đổi để lấy đúng dữ liệu
          setFilteredOrders(response.data.orders);
          setError(null);
        } else {
          setError('Lỗi khi tải dữ liệu.');
        }
      } catch (error) {
        setError('Có lỗi xảy ra khi lấy dữ liệu Order.');
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa order này?')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/order/destroy/${id}`);
        setOrders(orders.filter((order) => order.id !== id));
        setFilteredOrders(filteredOrders.filter((order) => order.id !== id));
        setSuccessMessage('Xóa order thành công.');
        setError(null);
      } catch (err) {
        setError('Có lỗi xảy ra khi xóa order.');
        setSuccessMessage('');
      }
    }
  };


  const handleShow = async (id) => {
    navigate(`/admin/order/show/${id}`);
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
            placeholder="Tìm kiếm order..."
            className="border border-gray-300 rounded-xl pl-10 pr-4 py-2 w-60"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <Link to="/admin/order/create" className="bg-green-500 text-white px-4 py-2 rounded">
          + Thêm
        </Link>
      </header>

        {/* Bảng quản lý Order */}
        <div className="bg-white p-4 rounded-3xl shadow mb-6">
          <h3 className="text-bold text-lg font-semibold mb-4">QUẢN LÝ ORDER</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200 text-center">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Tên</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Số điện thoại</th>
                <th className="p-2 border">Địa chỉ</th>
                <th className="p-2 border">Người tạo</th>
                <th className="p-2 border">Người cập nhật</th>
                <th className="p-2 border">Ngày tạo</th>
                <th className="p-2 border">Ngày cập nhật</th>
                <th className="p-2 border">Trạng thái</th>
                <th className="p-2 border">Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, index) => (
                  <tr key={index} className="border-b text-center">
                    <td className="p-2 border">{order.id}</td>
                    <td className="p-2 border">{order.name}</td>
                    <td className="p-2 border">{order.email}</td>
                    <td className="p-2 border">{order.phone}</td>
                    <td className="p-2 border">{order.address}</td>
                    <td className="p-2 border">{order.created_by}</td>
                    <td className="p-2 border">{order.updated_by}</td>
                    <td className="p-2 border">{order.created_at}</td>
                    <td className="p-2 border">{order.updated_at}</td>
                    <td className="p-2 border">{order.status}</td>
                    <div className="flex items-center gap-2">
                        <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(order.id)}>
                          Xóa
                        </button>
                        <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => handleShow(order.id)}>
                          Xem
                        </button>
                      </div>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center p-4">Không có Order nào</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Order;

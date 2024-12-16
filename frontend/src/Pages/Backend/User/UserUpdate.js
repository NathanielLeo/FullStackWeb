import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UserUpdate = () => {
  const { id } = useParams(); // Get user ID from URL parameters
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState(1); // Default to active (1)
  const [roles, setRoles] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Fetch user data from the API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/user/show/${id}`);
        if (response.status === 200) {
          setUser(response.data.user);
          setName(response.data.user.name);
          setEmail(response.data.user.email);
          setPhone(response.data.user.phone);
          setAddress(response.data.user.address);
          setRoles(response.data.user.roles);
          setStatus(response.data.user.status);
        } else {
          setError('Không tìm thấy người dùng.');
        }
      } catch (err) {
        setError('Có lỗi xảy ra khi tải thông tin người dùng.');
      }
    };

    fetchUserData();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = { name, email, phone, address, status, roles };

    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/user/update/${id}`, updatedUser);
      if (response.status === 200) {
        setSuccessMessage('Cập nhật thông tin người dùng thành công.');
        setError('');
        // Redirect after successful update
        setTimeout(() => navigate('/admin/user'), 2000);
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi cập nhật thông tin người dùng.');
      setSuccessMessage('');
    }
  };

  if (!user) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6">
        {/* Success message */}
        {successMessage && (
          <div className="bg-green-500 text-white p-4 rounded mb-4">
            {successMessage}
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="bg-red-500 text-white p-4 rounded mb-4">
            {error}
          </div>
        )}

        {/* User Update Form */}
        <div className="bg-white p-6 rounded-3xl shadow mb-6">
          <h3 className="text-xl font-semibold mb-4">Cập nhật Người Dùng</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 mb-2">Tên Người Dùng</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded-xl pl-4 pr-4 py-2 w-full"
                placeholder="Nhập tên người dùng"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-xl pl-4 pr-4 py-2 w-full"
                placeholder="Nhập email"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700 mb-2">Số Điện Thoại</label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border border-gray-300 rounded-xl pl-4 pr-4 py-2 w-full"
                placeholder="Nhập số điện thoại"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="address" className="block text-gray-700 mb-2">Địa Chỉ</label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border border-gray-300 rounded-xl pl-4 pr-4 py-2 w-full"
                placeholder="Nhập địa chỉ"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="status" className="block text-gray-700 mb-2">Trạng Thái</label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border border-gray-300 rounded-xl pl-4 pr-4 py-2 w-full"
              >
                <option value={1}>Hoạt động</option>
                <option value={0}>Không hoạt động</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="roles" className="block text-gray-700 mb-2">Vai Trò</label>
              <input
                type="text"
                id="roles"
                value={roles}
                onChange={(e) => setRoles(e.target.value)}
                className="border border-gray-300 rounded-xl pl-4 pr-4 py-2 w-full"
                placeholder="Nhập vai trò"
                required
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="submit"
                className="bg-green-500 text-white px-6 py-2 rounded-xl"
              >
                Cập Nhật
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/user')}
                className="bg-gray-500 text-white px-6 py-2 rounded-xl"
              >
                Quay Lại
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserUpdate;

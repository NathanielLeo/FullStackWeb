 import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import axios from 'axios';

const User = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Hàm tìm kiếm
  const handleSearch = (query) => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  // Fetch dữ liệu User từ API khi component render
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user');
        if (response.status === 200) {
          setUsers(response.data.users);
          setFilteredUsers(response.data.users);
          setError(null);
        } else {
          setError('Lỗi khi tải dữ liệu.');
        }
      } catch (error) {
        setError('Có lỗi xảy ra khi lấy dữ liệu người dùng.');
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa banner này?')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/banner/${id}`);
        setUsers(users.filter((banner) => banner.id !== id));
        setFilteredUsers(filteredUsers.filter((banner) => banner.id !== id));
        setSuccessMessage('Xóa banner thành công.');
        setError(null);
      } catch (err) {
        setError('Có lỗi xảy ra khi xóa banner.');
        setSuccessMessage('');
      }
    }
  };
  const handleUpdate = (id) => {
    navigate(`/admin/user/update/${id}`);
  };
  const handleShow = async (id) => {
    navigate(`/admin/user/show/${id}`);
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
            placeholder="Tìm kiếm user..."
            className="border border-gray-300 rounded-xl pl-10 pr-4 py-2 w-60"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <Link to="/admin/user/store" className="bg-green-500 text-white px-4 py-2 rounded">
          + Thêm
        </Link>
      </header>

        {/* Bảng quản lý User */}
        <div className="bg-white p-4 rounded-3xl shadow mb-6">
          <h3 className="text-bold text-lg font-semibold mb-4">QUẢN LÝ NGƯỜI DÙNG</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200 text-center">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Tên</th>
                <th className="p-2 border">Họ tên đầy đủ</th>
                <th className="p-2 border">Giới tính</th>
                <th className="p-2 border">Hình ảnh</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Số điện thoại</th>
                <th className="p-2 border">Địa chỉ</th>
                <th className="p-2 border">Vai trò</th>
                <th className="p-2 border">Người tạo</th>
                <th className="p-2 border">Người cập nhật</th>
                <th className="p-2 border">Ngày tạo</th>
                <th className="p-2 border">Ngày cập nhật</th>
                <th className="p-2 border">Trạng thái</th>
                <th className="p-2 border">Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b text-center">
                    <td className="p-2 border">{user.id}</td>
                    <td className="p-2 border">{user.name}</td>
                    <td className="p-2 border">{user.fullname}</td>
                    <td className="p-2 border">{user.gender}</td>
                    <td className="p-2 border">
                    <img src={`http://localhost:8000/images/user/${user.thumbnail}`} alt={user.name} className="h-16 w-full object-cover" />
                     </td>
                    <td className="p-2 border">{user.email}</td>
                    <td className="p-2 border">{user.phone}</td>
                    <td className="p-2 border">{user.address}</td>
                    <td className="p-2 border">{user.roles}</td>
                    <td className="p-2 border">{user.created_by}</td>
                    <td className="p-2 border">{user.updated_by}</td>
                    <td className="p-2 border">{user.created_at}</td>
                    <td className="p-2 border">{user.updated_at}</td>
                    <td className="p-2 border">{user.status}</td>
                    <td className="p-2 border">
                    <div className="flex items-center gap-2">
                        <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => handleUpdate(user.id)}>
                          Cập nhật
                        </button>
                        <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(user.id)}>
                          Xóa
                        </button>
                        <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => handleShow(user.id)}>
                          Xem
                        </button>
                      </div>
                  </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="13" className="text-center p-4">Không có người dùng nào</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default User;

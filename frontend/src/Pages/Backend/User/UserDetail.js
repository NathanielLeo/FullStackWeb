import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const UserDetail = () => {
  const { id } = useParams();  // Get user ID from URL params
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/user/show/${id}`);
        if (response.status === 200) {
          setUser(response.data.user);
        } else {
          setError('Lỗi khi tải thông tin người dùng.');
        }
      } catch (err) {
        setError('Có lỗi xảy ra khi lấy dữ liệu người dùng.');
      }
    };

    fetchUserDetails();
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="bg-red-500 text-white p-4 rounded mb-4">{error}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="bg-yellow-500 text-white p-4 rounded mb-4">Đang tải thông tin người dùng...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6">
        <div className="bg-white p-6 rounded-3xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Thông tin người dùng</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div><strong>ID:</strong> {user.id}</div>
            <div><strong>Tên:</strong> {user.name}</div>
            <div><strong>Họ tên đầy đủ:</strong> {user.fullname}</div>
            <div><strong>Giới tính:</strong> {user.gender}</div>
            <div><strong>Email:</strong> {user.email}</div>
            <div><strong>Số điện thoại:</strong> {user.phone}</div>
            <div><strong>Địa chỉ:</strong> {user.address}</div>
            <div><strong>Vai trò:</strong> {user.roles}</div>
            <div><strong>Trạng thái:</strong> {user.status === 1 ? 'Active' : 'Inactive'}</div>
            <div><strong>Ngày tạo:</strong> {user.created_at}</div>
            <div><strong>Ngày cập nhật:</strong> {user.updated_at}</div>
            <div><strong>Người tạo:</strong> {user.created_by}</div>
            <div><strong>Người cập nhật:</strong> {user.updated_by}</div>
            <div><strong>Hình ảnh:</strong> 
              <img src={`http://localhost:8000/images/user/${user.thumbnail}`} alt={user.name} className="h-20 w-20 object-cover rounded" />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <Link to={`/admin/user/update/${user.id}`} className="bg-blue-500 text-white px-4 py-2 rounded">
              Cập nhật
            </Link>
            <button
              onClick={() => navigate('/admin/user')}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Quay lại
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;

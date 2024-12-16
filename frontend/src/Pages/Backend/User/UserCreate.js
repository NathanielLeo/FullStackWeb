import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    fullname: '',
    email: '',
    password: '',
    gender: '',
    phone: '',
    address: '',
    roles: '',
    status: 1,
    thumbnail: null,
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input for image
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      thumbnail: e.target.files[0],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('name', formData.name);
    formDataToSubmit.append('fullname', formData.fullname);
    formDataToSubmit.append('email', formData.email);
    formDataToSubmit.append('password', formData.password);
    formDataToSubmit.append('gender', formData.gender);
    formDataToSubmit.append('phone', formData.phone);
    formDataToSubmit.append('address', formData.address);
    formDataToSubmit.append('roles', formData.roles);
    formDataToSubmit.append('status', formData.status);
    if (formData.thumbnail) {
      formDataToSubmit.append('thumbnail', formData.thumbnail);
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/user/store', formDataToSubmit);
      if (response.status === 200) {
        setSuccessMessage('Thêm người dùng thành công.');
        setError(null);
        setTimeout(() => {
          navigate('/admin/user'); // Redirect to user list after success
        }, 2000);
      } else {
        setError('Lỗi khi thêm người dùng.');
        setSuccessMessage('');
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi thêm người dùng.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-3xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Thêm người dùng mới</h2>

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

        {/* Form to create user */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Tên</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-xl p-2"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Họ tên đầy đủ</label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-xl p-2"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-xl p-2"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Mật khẩu</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-xl p-2"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Giới tính</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-xl p-2"
                required
              >
                <option value="">Chọn giới tính</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
            </div>
            <div>
              <label className="block mb-2">Số điện thoại</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-xl p-2"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Địa chỉ</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-xl p-2"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Vai trò</label>
              <input
                type="text"
                name="roles"
                value={formData.roles}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-xl p-2"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Trạng thái</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-xl p-2"
                required
              >
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
            </div>
            <div>
              <label className="block mb-2">Hình ảnh</label>
              <input
                type="file"
                name="thumbnail"
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded-xl p-2"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Thêm người dùng
            </button>
            <button
              onClick={() => navigate('/admin/user')}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Quay lại
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserCreate;

import React, { useEffect, useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import axios from 'axios';

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Hàm tìm kiếm
  const handleSearch = (query) => {
    const filtered = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredContacts(filtered);
  };

  // Fetch dữ liệu Contact từ API khi component render
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/contact');
        if (response.status === 200) {
          setContacts(response.data.contacts);
          setFilteredContacts(response.data.contacts);
          setError(null);
        } else {
          setError('Lỗi khi tải dữ liệu.');
        }
      } catch (error) {
        setError('Có lỗi xảy ra khi lấy dữ liệu Contact.');
      }
    };

    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa banner này?')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/banner/${id}`);
        setContacts(contacts.filter((banner) => banner.id !== id));
        setFilteredContacts(filteredContacts.filter((banner) => banner.id !== id));
        setSuccessMessage('Xóa banner thành công.');
        setError(null);
      } catch (err) {
        setError('Có lỗi xảy ra khi xóa banner.');
        setSuccessMessage('');
      }
    }
  };
  const handleUpdate = (id) => {
    navigate(`/admin/contact/update/${id}`);
  };
  const handleShow = async (id) => {
    navigate(`/admin/contact/show/${id}`);
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
            placeholder="Tìm kiếm contact..."
            className="border border-gray-300 rounded-xl pl-10 pr-4 py-2 w-60"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <Link to="/admin/contact/store" className="bg-green-500 text-white px-4 py-2 rounded">
          + Thêm
        </Link>
      </header>

        {/* Bảng quản lý Contact */}
        <div className="bg-white p-4 rounded-3xl shadow mb-6">
          <h3 className="text-bold text-lg font-semibold mb-4">QUẢN LÝ CONTACT</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200 text-center">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Tên</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Số điện thoại</th>
                <th className="p-2 border">Tiêu đề</th>
                <th className="p-2 border">Nội dung</th>
                <th className="p-2 border">Replay ID</th>
                <th className="p-2 border">Người tạo</th>
                <th className="p-2 border">Người cập nhật</th>
                <th className="p-2 border">Ngày tạo</th>
                <th className="p-2 border">Ngày cập nhật</th>
                <th className="p-2 border">Trạng thái</th>
                <th className="p-2 border">Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact, index) => (
                  <tr key={index} className="border-b text-center">
                    <td className="p-2 border">{contact.id}</td>
                    <td className="p-2 border">{contact.name}</td>
                    <td className="p-2 border">{contact.email}</td>
                    <td className="p-2 border">{contact.phone}</td>
                    <td className="p-2 border">{contact.title}</td>
                    <td className="p-2 border">{contact.content}</td>
                    <td className="p-2 border">{contact.replay_id}</td>
                    <td className="p-2 border">{contact.created_by}</td>
                    <td className="p-2 border">{contact.updated_by}</td>
                    <td className="p-2 border">{contact.created_at}</td>
                    <td className="p-2 border">{contact.updated_at}</td>
                    <td className="p-2 border">{contact.status}</td>
                    <td className="p-2 border">
                      <div className="flex items-center gap-2">
                          <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => handleUpdate(contact.id)}>
                            Cập nhật
                          </button>
                          <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(contact.id)}>
                            Xóa
                          </button>
                          <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => handleShow(contact.id)}>
                            Xem
                          </button>
                      </div>
                  </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="text-center p-4">Không có Contact nào</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Contact;

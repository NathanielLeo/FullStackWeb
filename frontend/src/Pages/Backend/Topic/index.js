import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import axios from 'axios';

const Topic = () => {
  const [topics, setTopics] = useState([]); // Đổi tên biến để phản ánh đúng
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Hàm tìm kiếm
  const handleSearch = (query) => {
    const filtered = topics.filter((topic) =>
      topic.name.toLowerCase().includes(query.toLowerCase()) // Thay đổi từ title thành name
    );
    setFilteredTopics(filtered);
  };

  // Fetch dữ liệu Topic từ API khi component render
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/topic'); // Cập nhật endpoint
        if (response.status === 200) {
          setTopics(response.data.topics); // Thay đổi để lấy đúng dữ liệu
          setFilteredTopics(response.data.topics); // Cập nhật lại dữ liệu
          setError(null);
        } else {
          setError('Lỗi khi tải dữ liệu.');
        }
      } catch (error) {
        setError('Có lỗi xảy ra khi lấy dữ liệu Topic.');
      }
    };

    fetchTopics();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa banner này?')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/banner/${id}`);
        setTopics(topics.filter((banner) => banner.id !== id));
        setFilteredTopics(filteredTopics.filter((banner) => banner.id !== id));
        setSuccessMessage('Xóa banner thành công.');
        setError(null);
      } catch (err) {
        setError('Có lỗi xảy ra khi xóa banner.');
        setSuccessMessage('');
      }
    }
  };
  const handleUpdate = (id) => {
    navigate(`/admin/topic/update/${id}`);
  };
  const handleShow = async (id) => {
    navigate(`/admin/topic/show/${id}`);
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
            placeholder="Tìm kiếm Topic..."
            className="border border-gray-300 rounded-xl pl-10 pr-4 py-2 w-60"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <Link to="/admin/topic/store" className="bg-green-500 text-white px-4 py-2 rounded">
          + Thêm
        </Link>
      </header>

        {/* Bảng quản lý Topic */}
        <div className="bg-white p-4 rounded-3xl shadow mb-6">
          <h3 className="text-bold text-lg font-semibold mb-4">QUẢN LÝ CHỦ ĐỀ</h3> {/* Đổi tiêu đề */}
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200 text-center">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Tên</th> {/* Thay đổi tiêu đề từ Tiêu đề thành Tên */}
                <th className="p-2 border">Slug</th> {/* Thêm cột slug */}
                <th className="p-2 border">Mô tả</th>
                <th className="p-2 border">Người tạo</th>
                <th className="p-2 border">Người cập nhật</th>
                <th className="p-2 border">Ngày tạo</th>
                <th className="p-2 border">Ngày cập nhật</th>
                <th className="p-2 border">Trạng thái</th>
                <th className="p-2 border">Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {filteredTopics.length > 0 ? (
                filteredTopics.map((topic, index) => (
                  <tr key={index} className="border-b text-center">
                    <td className="p-2 border">{topic.id}</td>
                    <td className="p-2 border">{topic.name}</td>
                    <td className="p-2 border">{topic.slug}</td> {/* Hiển thị slug */}
                    <td className="p-2 border">{topic.description}</td>
                    <td className="p-2 border">{topic.created_by}</td>
                    <td className="p-2 border">{topic.updated_by}</td>
                    <td className="p-2 border">{topic.created_at}</td>
                    <td className="p-2 border">{topic.updated_at}</td>
                    <td className="p-2 border">{topic.status}</td>
                    <td className="p-2 border">
                    <div className="flex items-center gap-2">
                        <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => handleUpdate(topic.id)}>
                          Cập nhật
                        </button>
                        <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(topic.id)}>
                          Xóa
                        </button>
                        <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => handleShow(topic.id)}>
                          Xem
                        </button>
                      </div>
                  </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center p-4">Không có chủ đề nào</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Topic;

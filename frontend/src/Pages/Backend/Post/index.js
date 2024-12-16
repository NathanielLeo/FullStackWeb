import React, { useEffect, useState } from 'react';
import { Link ,useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import axios from 'axios';

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Hàm tìm kiếm
  const handleSearch = (query) => {
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  // Fetch dữ liệu Post từ API khi component render
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/post'); // Đảm bảo API endpoint chính xác
        if (response.status === 200) {
          setPosts(response.data.posts); // Thay đổi để lấy đúng dữ liệu
          setFilteredPosts(response.data.posts);
          setError(null);
        } else {
          setError('Lỗi khi tải dữ liệu.');
        }
      } catch (error) {
        setError('Có lỗi xảy ra khi lấy dữ liệu Post.');
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa banner này?')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/banner/${id}`);
        setPosts(posts.filter((banner) => banner.id !== id));
        setFilteredPosts(filteredPosts.filter((banner) => banner.id !== id));
        setSuccessMessage('Xóa banner thành công.');
        setError(null);
      } catch (err) {
        setError('Có lỗi xảy ra khi xóa banner.');
        setSuccessMessage('');
      }
    }
  };
  const handleUpdate = (id) => {
    navigate(`/admin/post/update/${id}`);
  };
  const handleShow = async (id) => {
    navigate(`/admin/post/show/${id}`);
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
            placeholder="Tìm kiếm post..."
            className="border border-gray-300 rounded-xl pl-10 pr-4 py-2 w-60"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <Link to="/admin/post/store" className="bg-green-500 text-white px-4 py-2 rounded">
          + Thêm
        </Link>
      </header>

        {/* Bảng quản lý Post */}
        <div className="bg-white p-4 rounded-3xl shadow mb-6">
          <h3 className="text-bold text-lg font-semibold mb-4">QUẢN LÝ POST</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200 text-center">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Tiêu đề</th>
                <th className="p-2 border">Topic ID</th>
                <th className="p-2 border">Nội dung</th>
                <th className="p-2 border">Mô tả</th>
                <th className="p-2 border">Thumbnail</th>
                <th className="p-2 border">Loại</th>
                <th className="p-2 border">Người tạo</th>
                <th className="p-2 border">Người cập nhật</th>
                <th className="p-2 border">Ngày tạo</th>
                <th className="p-2 border">Ngày cập nhật</th>
                <th className="p-2 border">Trạng thái</th>
                <th className="p-2 border">Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post, index) => (
                  <tr key={index} className="border-b text-center">
                    <td className="p-2 border">{post.id}</td>
                    <td className="p-2 border">{post.title}</td>
                    <td className="p-2 border">{post.topic_id}</td>
                    <td className="p-2 border">{post.content}</td>
                    <td className="p-2 border">{post.description}</td>
                    <td className="p-2 border">
                    <img src={`http://localhost:8000/images/post/${post.thumbnail}`} alt={post.name} className="h-16 w-full object-cover" />
                     </td>
                    <td className="p-2 border">{post.type}</td>
                    <td className="p-2 border">{post.created_by}</td>
                    <td className="p-2 border">{post.updated_by}</td>
                    <td className="p-2 border">{post.created_at}</td>
                    <td className="p-2 border">{post.updated_at}</td>
                    <td className="p-2 border">{post.status}</td>
                    <td className="p-2 border">
                    <div className="flex items-center gap-2">
                        <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => handleUpdate(post.id)}>
                          Cập nhật
                        </button>
                        <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(post.id)}>
                          Xóa
                        </button>
                        <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => handleShow(post.id)}>
                          Xem
                        </button>
                      </div>
                  </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="text-center p-4">Không có Post nào</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Post;

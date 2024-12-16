import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PostUpdate = () => {
  const { id } = useParams(); // To get the post id from the URL
  const [postData, setPostData] = useState({
    title: '',
    topic_id: '',
    content: '',
    description: '',
    thumbnail: '',
    type: '',
    status: 1,
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Fetch the existing post data to populate the form
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/post/show/${id}`);
        if (response.status === 200) {
          setPostData(response.data.post);
          setError(null);
        } else {
          setError('Lỗi khi tải dữ liệu bài viết.');
        }
      } catch (err) {
        setError('Có lỗi xảy ra khi lấy dữ liệu bài viết.');
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/post/update/${id}`,
        postData
      );
      if (response.status === 200) {
        setSuccessMessage('Cập nhật bài viết thành công!');
        setError(null);
        navigate('/admin/post'); // Redirect to the post list page after successful update
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi cập nhật bài viết.');
      setSuccessMessage('');
    }
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
          <h3 className="text-xl font-semibold">Cập nhật Bài Viết</h3>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={() => navigate('/admin/post')}
          >
            Quay lại
          </button>
        </header>

        <div className="bg-white p-6 rounded-3xl shadow mb-6">
          <h3 className="text-lg font-semibold mb-4">Thông Tin Bài Viết</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="title" className="font-semibold">Tiêu Đề</label>
              <input
                type="text"
                id="title"
                name="title"
                value={postData.title}
                onChange={handleChange}
                className="border border-gray-300 rounded-xl p-2"
                placeholder="Nhập tiêu đề bài viết"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="topic_id" className="font-semibold">Topic ID</label>
              <input
                type="text"
                id="topic_id"
                name="topic_id"
                value={postData.topic_id}
                onChange={handleChange}
                className="border border-gray-300 rounded-xl p-2"
                placeholder="Nhập Topic ID"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="content" className="font-semibold">Nội Dung</label>
              <textarea
                id="content"
                name="content"
                value={postData.content}
                onChange={handleChange}
                className="border border-gray-300 rounded-xl p-2"
                placeholder="Nhập nội dung bài viết"
                rows="5"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="description" className="font-semibold">Mô Tả</label>
              <textarea
                id="description"
                name="description"
                value={postData.description}
                onChange={handleChange}
                className="border border-gray-300 rounded-xl p-2"
                placeholder="Nhập mô tả bài viết"
                rows="3"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="thumbnail" className="font-semibold">Thumbnail</label>
              <input
                type="file"
                id="thumbnail"
                name="thumbnail"
                onChange={handleChange}
                className="border border-gray-300 rounded-xl p-2"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="type" className="font-semibold">Loại</label>
              <input
                type="text"
                id="type"
                name="type"
                value={postData.type}
                onChange={handleChange}
                className="border border-gray-300 rounded-xl p-2"
                placeholder="Nhập loại bài viết"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="status" className="font-semibold">Trạng Thái</label>
              <select
                id="status"
                name="status"
                value={postData.status}
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
              Cập nhật Bài Viết
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostUpdate;

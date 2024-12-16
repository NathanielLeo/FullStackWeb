import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PostCreate = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [status, setStatus] = useState(1); // default 'Active'
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Handle form input changes
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleStatusChange = (e) => setStatus(Number(e.target.value));
  const handleThumbnailChange = (e) => setThumbnail(e.target.files[0]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!title || !content || !description) {
      setError('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('description', description);
    formData.append('status', status);
    if (thumbnail) {
      formData.append('thumbnail', thumbnail);
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      });

      if (response.status === 200) {
        setSuccessMessage('Bài viết đã được tạo thành công!');
        setError('');
        setTitle('');
        setContent('');
        setDescription('');
        setThumbnail(null);
        setStatus(1);
        setTimeout(() => {
          navigate('/admin/post'); // Redirect to post list after successful creation
        }, 1500);
      } else {
        setError('Có lỗi xảy ra khi tạo bài viết.');
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi tạo bài viết.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6">
        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-500 text-white p-4 rounded mb-4">
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-500 text-white p-4 rounded mb-4">
            {error}
          </div>
        )}

        <header className="bg-white p-4 rounded-3xl shadow mb-6">
          <h3 className="text-xl font-semibold">Tạo Mới Bài Viết</h3>
        </header>

        <div className="bg-white p-6 rounded-3xl shadow mb-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-semibold">Tiêu Đề</label>
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                className="border border-gray-300 rounded-xl px-4 py-2 w-full"
                placeholder="Nhập tiêu đề bài viết"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold">Nội Dung</label>
              <textarea
                value={content}
                onChange={handleContentChange}
                className="border border-gray-300 rounded-xl px-4 py-2 w-full"
                placeholder="Nhập nội dung bài viết"
                rows="5"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold">Mô Tả</label>
              <textarea
                value={description}
                onChange={handleDescriptionChange}
                className="border border-gray-300 rounded-xl px-4 py-2 w-full"
                placeholder="Nhập mô tả bài viết"
                rows="3"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold">Trạng Thái</label>
              <select
                value={status}
                onChange={handleStatusChange}
                className="border border-gray-300 rounded-xl px-4 py-2 w-full"
              >
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold">Thumbnail</label>
              <input
                type="file"
                onChange={handleThumbnailChange}
                className="border border-gray-300 rounded-xl px-4 py-2 w-full"
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-green-500 text-white px-6 py-2 rounded-xl"
              >
                Tạo Mới
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/post')}
                className="bg-gray-500 text-white px-6 py-2 rounded-xl"
              >
                Quay lại
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostCreate;

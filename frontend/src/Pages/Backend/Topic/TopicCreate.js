import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TopicCreate = () => {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(1); // Default to active (1)
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const topicData = { name, slug, description, status };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/topic', topicData);
      if (response.status === 201) {
        setSuccessMessage('Chủ đề đã được tạo thành công.');
        setError('');
        // Redirect to the topics list page after successful creation
        setTimeout(() => navigate('/admin/topic'), 2000);
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi tạo chủ đề.');
      setSuccessMessage('');
    }
  };

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

        {/* Topic Creation Form */}
        <div className="bg-white p-6 rounded-3xl shadow mb-6">
          <h3 className="text-xl font-semibold mb-4">Thêm Chủ Đề Mới</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 mb-2">Tên Chủ Đề</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded-xl pl-4 pr-4 py-2 w-full"
                placeholder="Nhập tên chủ đề"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="slug" className="block text-gray-700 mb-2">Slug</label>
              <input
                type="text"
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="border border-gray-300 rounded-xl pl-4 pr-4 py-2 w-full"
                placeholder="Nhập slug chủ đề"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 mb-2">Mô Tả</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-300 rounded-xl pl-4 pr-4 py-2 w-full"
                placeholder="Nhập mô tả chủ đề"
                rows="4"
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

            <div className="flex justify-end gap-4">
              <button
                type="submit"
                className="bg-green-500 text-white px-6 py-2 rounded-xl"
              >
                Lưu Chủ Đề
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/topic')}
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

export default TopicCreate;

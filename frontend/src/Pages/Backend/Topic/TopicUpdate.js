import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const TopicUpdate = () => {
  const { id } = useParams(); // Get the topic ID from the URL
  const [topic, setTopic] = useState(null);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(1);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Fetch the topic data to edit
  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/topic/show/${id}`);
        if (response.status === 200) {
          const data = response.data.topic;
          setTopic(data);
          setName(data.name);
          setSlug(data.slug);
          setDescription(data.description);
          setStatus(data.status);
          setError(null);
        } else {
          setError('Không tìm thấy chủ đề.');
        }
      } catch (error) {
        setError('Có lỗi xảy ra khi lấy dữ liệu chủ đề.');
      }
    };

    fetchTopic();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!name || !description) {
      setError('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/topic/update/${id}`, {
        name,
        slug,
        description,
        status,
      });

      if (response.status === 200) {
        setSuccessMessage('Chủ đề đã được cập nhật thành công!');
        setError('');
        setTimeout(() => {
          navigate('/admin/topic'); // Redirect to topic list after successful update
        }, 1500);
      } else {
        setError('Có lỗi xảy ra khi cập nhật chủ đề.');
      }
    } catch (error) {
      setError('Có lỗi xảy ra khi cập nhật chủ đề.');
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
          <h3 className="text-xl font-semibold">Cập Nhật Chủ Đề</h3>
        </header>

        {/* Topic Edit Form */}
        <div className="bg-white p-6 rounded-3xl shadow mb-6">
          {topic ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-semibold">Tên Chủ Đề</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-300 rounded-xl px-4 py-2 w-full"
                  placeholder="Nhập tên chủ đề"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">Slug</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="border border-gray-300 rounded-xl px-4 py-2 w-full"
                  placeholder="Nhập slug"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">Mô Tả</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border border-gray-300 rounded-xl px-4 py-2 w-full"
                  placeholder="Nhập mô tả chủ đề"
                  rows="5"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">Trạng Thái</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(Number(e.target.value))}
                  className="border border-gray-300 rounded-xl px-4 py-2 w-full"
                >
                  <option value={1}>Active</option>
                  <option value={0}>Inactive</option>
                </select>
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-6 py-2 rounded-xl"
                >
                  Cập Nhật
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/admin/topic')}
                  className="bg-gray-500 text-white px-6 py-2 rounded-xl"
                >
                  Quay lại
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center">Đang tải dữ liệu...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopicUpdate;

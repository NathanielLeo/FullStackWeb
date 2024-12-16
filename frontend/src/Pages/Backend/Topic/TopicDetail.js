import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const TopicDetail = () => {
  const { id } = useParams(); // Get the topic ID from the URL
  const [topic, setTopic] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch topic data based on ID when component mounts
  useEffect(() => {
    const fetchTopicDetail = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/topic/show/${id}`);
        if (response.status === 200) {
          setTopic(response.data.topic); // Set topic data
          setError(null);
        } else {
          setError('Không tìm thấy chủ đề.');
        }
      } catch (error) {
        setError('Có lỗi xảy ra khi lấy dữ liệu chủ đề.');
      }
    };

    fetchTopicDetail();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6">
        {/* Error Message */}
        {error && (
          <div className="bg-red-500 text-white p-4 rounded mb-4">
            {error}
          </div>
        )}

        {/* Topic Details */}
        {topic ? (
          <div className="bg-white p-6 rounded-3xl shadow mb-6">
            <h3 className="text-xl font-semibold mb-4">Chi Tiết Chủ Đề</h3>
            <div className="mb-4">
              <strong>Tên Chủ Đề: </strong>
              <span>{topic.name}</span>
            </div>
            <div className="mb-4">
              <strong>Slug: </strong>
              <span>{topic.slug}</span>
            </div>
            <div className="mb-4">
              <strong>Mô Tả: </strong>
              <p>{topic.description}</p>
            </div>
            <div className="mb-4">
              <strong>Trạng Thái: </strong>
              <span>{topic.status === 1 ? 'Active' : 'Inactive'}</span>
            </div>
            <div className="mb-4">
              <strong>Người Tạo: </strong>
              <span>{topic.created_by}</span>
            </div>
            <div className="mb-4">
              <strong>Người Cập Nhật: </strong>
              <span>{topic.updated_by}</span>
            </div>
            <div className="mb-4">
              <strong>Ngày Tạo: </strong>
              <span>{topic.created_at}</span>
            </div>
            <div className="mb-4">
              <strong>Ngày Cập Nhật: </strong>
              <span>{topic.updated_at}</span>
            </div>

            {/* Back Button */}
            <button
              onClick={() => navigate('/admin/topic')}
              className="bg-gray-500 text-white px-6 py-2 rounded-xl"
            >
              Quay lại
            </button>
          </div>
        ) : (
          <div className="text-center">Đang tải dữ liệu...</div>
        )}
      </div>
    </div>
  );
};

export default TopicDetail;

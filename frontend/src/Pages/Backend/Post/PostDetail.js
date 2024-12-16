import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PostDetail = () => {
  const { id } = useParams(); // To get the post id from the URL
  const [postData, setPostData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch the post data when the component mounts
  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/post/show/${id}`);
        if (response.status === 200) {
          setPostData(response.data.post); // Store the fetched post data
          setError(null);
        } else {
          setError('Lỗi khi tải dữ liệu bài viết.');
        }
      } catch (err) {
        setError('Có lỗi xảy ra khi lấy dữ liệu bài viết.');
      }
    };

    fetchPostDetails();
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

        {/* Post Details */}
        {postData ? (
          <>
            <header className="bg-white p-4 rounded-3xl shadow mb-6 flex justify-between items-center">
              <h3 className="text-xl font-semibold">Chi Tiết Bài Viết</h3>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => navigate('/admin/post')}
              >
                Quay lại
              </button>
            </header>

            <div className="bg-white p-6 rounded-3xl shadow mb-6">
              <div className="space-y-4">
                <div className="flex flex-col">
                  <label className="font-semibold">Tiêu Đề</label>
                  <p>{postData.title}</p>
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold">Topic ID</label>
                  <p>{postData.topic_id}</p>
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold">Nội Dung</label>
                  <p>{postData.content}</p>
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold">Mô Tả</label>
                  <p>{postData.description}</p>
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold">Thumbnail</label>
                  {postData.thumbnail && (
                    <img
                      src={`http://localhost:8000/images/post/${postData.thumbnail}`}
                      alt="Thumbnail"
                      className="w-48 h-48 object-cover"
                    />
                  )}
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold">Loại</label>
                  <p>{postData.type}</p>
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold">Người tạo</label>
                  <p>{postData.created_by}</p>
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold">Người cập nhật</label>
                  <p>{postData.updated_by}</p>
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold">Ngày tạo</label>
                  <p>{new Date(postData.created_at).toLocaleString()}</p>
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold">Ngày cập nhật</label>
                  <p>{new Date(postData.updated_at).toLocaleString()}</p>
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold">Trạng Thái</label>
                  <p>{postData.status === 1 ? 'Active' : 'Inactive'}</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white p-4 rounded-3xl shadow mb-6">
            <p className="text-center">Đang tải dữ liệu...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetail;

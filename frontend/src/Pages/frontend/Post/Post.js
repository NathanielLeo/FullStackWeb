import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CiSearch } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // Shuffle function to randomize posts
  const shufflePosts = (posts) => {
    return posts.sort(() => Math.random() - 0.5);
  };

  const handleSearch = (query) => {
    const filtered = posts.filter((post) =>
      post.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/post');
        const shuffledPosts = shufflePosts(response.data.posts);
        setPosts(shuffledPosts);
        setFilteredPosts(shuffledPosts);
        setLoading(false);
      } catch (err) {
        setError('Có lỗi xảy ra khi lấy danh sách sản phẩm.');
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);
  const handlePostClick = (postId) => {
      navigate(`/post/${postId}`);
    };

    const handleClick = () => {
    navigate('/post'); // Thay đổi URL nếu cần
  };
  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 bg-gray-100 min-h-screen">
      {/* Search Bar */}
      {/* <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-md">
          <CiSearch className="absolute left-3 top-3 text-gray-500" size={24} />
          <input
            type="text"
            placeholder="Tìm kiếm bài viết..."
            className="border border-gray-300 rounded-full pl-10 pr-4 py-2 w-full"
            onChange={(e) => handleSearch(e.target.value)}  
          />
        </div>
      </div> */}
    <div className="p-6">
      <h2 className="text-4xl font-bold text-center mb-6">Bài viết</h2>
      {error && (
        <div className="bg-red-500 text-white p-4 rounded mb-4 text-center">
          {error}
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-10">
        {filteredPosts.length > 0 && (
          <>
            {/* Bài viết lớn bên trái */}
            <div className="sm:col-span-6 lg:col-span-8 bg-white rounded-lg shadow-md overflow-hidden">
              <a href="st">
                <div
                  className="h-96 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${
                      filteredPosts[0].thumbnail
                        ? `http://localhost:8000/images/post/${filteredPosts[0].thumbnail}`
                        : 'https://tailwindcss.com/img/card-left.jpg'
                    })`,
                  }}
                  title={filteredPosts[0].title}
                />
              </a>
              <div className="p-5">
                <a
                  href="st"
                  className="text-gray-900 font-bold text-2xl mb-2 hover:text-indigo-600 transition duration-500 ease-in-out block"
                >
                  {filteredPosts[0].title}
                </a>
                <p className="text-gray-700 text-xs mb-2">
                  {filteredPosts[0].context}
                </p>
                <p className="text-gray-700 text-xl mb-2">
                  {filteredPosts[0].description}
                </p>
                <p className="text-gray-600 text-xs">
                  {new Date(filteredPosts[0].updated_by).toLocaleDateString(
                    'vi-VN',
                    {
                      month: 'long',
                      day: 'numeric',
                    }
                  )}
                </p>
                <div className="mt-4 text-center">
                  <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-full">
                    Đọc thêm
                  </button>
                </div>
              </div>
            </div>

            {/* Danh sách bài viết nhỏ hơn bên phải */}
            <div className="sm:col-span-6 lg:col-span-4 grid gap-2">
              <h2 className="text-xl font-bold text-left">Bài viết mới nhất</h2>
              {filteredPosts.slice(1, 5).map((post) => (
                <div key={post.id} className="flex bg-white rounded-lg shadow-md overflow-hidden h-36">
                  {/* Hình ảnh bên trái */}
                  <div
                    className="w-1/3 h-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${
                        post.thumbnail
                          ? `http://localhost:8000/images/post/${post.thumbnail}`
                          : 'https://tailwindcss.com/img/card-left.jpg'
                      })`,
                    }}
                    title={post.title}
                  onClick={() => handlePostClick(post.id)}
                  />
                  {/* Nội dung bên phải */}
                  <div className="w-2/3 p-2 flex flex-col justify-between">
                    <a
                      href="st"
                      className="text-gray-900 font-bold text-lg hover:text-indigo-600 transition duration-500 ease-in-out block"
                    >
                      {post.title}
                    </a>
                    <p className="text-gray-700 text-xs mb-1 line-clamp-2">
                      {post.description}
                    </p>
                    <p className="text-gray-600 text-xs">
                      {new Date(post.updated_by).toLocaleDateString('vi-VN', {
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>

      {/* Xem Tất Cả */}
      <div className="mt-10 text-center">
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full"
        onClick={handleClick}>
          Xem Tất Cả Bài Viết
        </button>
      </div>
    </div>
  );
};

export default Post;

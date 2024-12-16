import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CiSearch } from 'react-icons/ci';
import { FaPlay } from "react-icons/fa";
import Pagination from './Pagination';

const videoList = [
    {
        title: "Triệu lời xúc động trên sổ tang điện tử",
        description: "Triệu lời xúc động trên sổ tang điện tử",
        thumbnail: "https://vnmedia.vn/file/8a10a0d36ccebc89016ce0c6fa3e1b83/072024/1_20240726093139.jpg?width=500&height=-&type=resize",
        url: "https://vnmedia.vn/file/video/8a10a0d36ccebc89016ce0c6fa3e1b83/072024/20240726092822Trieuloixucdongtrensotangdientu-ChuyentrangVideo-Baotintuc.mp4"
    },
    {
        title: "Tắt sóng 2G, VinaPhone hỗ trợ khách hàng nâng cấp điện thoại",
        description: "VinaPhone hỗ trợ khách hàng chuyển sang mạng 4G.",
        thumbnail: "https://vnmedia.vn/file/8a10a0d36ccebc89016ce0c6fa3e1b83/052024/4_20240508164023.png?width=500&height=-&type=resize",
        url: "https://vnmedia.vn/file/video/8a10a0d36ccebc89016ce0c6fa3e1b83/052024/20240508164520trailermi.mp4"
    },
    {
        title: "Tài tử đình đám Brad Pitt trở lại trong bom tấn hành động F1",
        description: "Brad Pitt quay trở lại với phim hành động mới.",
        thumbnail: "https://vnmedia.vn/file/8a10a0d36ccebc89016ce0c6fa3e1b83/062024/1106_-_ha_giang_20240611101116.jpg?width=500&height=-&type=resize",
        url: "https://vnmedia.vn/file/video/8a10a0d36ccebc89016ce0c6fa3e1b83/062024/20240611094243Video-Facebook.mp4"
    },
    // Thêm các video khác ở đây
];

const PostPage = () => {
  const [posts, setPostPages] = useState([]);
  const [filteredPostPages, setFilteredPostPages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentVideo, setCurrentVideo] = useState(videoList[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5; // Số bài viết trên mỗi trang

    const handleVideoChange = (video) => {
        setCurrentVideo(video);
    };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    // Chuyển trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const shufflePostPages = (posts) => {
    return posts.sort(() => Math.random() - 0.5);
  };

  const handleSearch = (query) => {
    const filtered = posts.filter((post) =>
      post.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPostPages(filtered);
  };

  useEffect(() => {
    const fetchPostPages = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/post');
        const shuffledPostPages = shufflePostPages(response.data.posts);
        setPostPages(shuffledPostPages);
        setFilteredPostPages(shuffledPostPages);
        setLoading(false);
      } catch (err) {
        setError('Có lỗi xảy ra khi lấy danh sách sản phẩm.');
        setLoading(false);
      }
    };
    fetchPostPages();
  }, []);

  return (
    <div className="max-w-screen-2xl mx-auto p-5 sm:p-10 md:p-16 bg-gray-100 min-h-screen">
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
        {filteredPostPages.length > 0 && (
          <>
            {/* Bài viết lớn bên trái */}
            <div className="sm:col-span-6 lg:col-span-8 bg-white rounded-lg shadow-md overflow-hidden">
              <a href="st">
                <div
                  className="h-96 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${
                      filteredPostPages[0].thumbnail
                        ? `http://localhost:8000/images/post/${filteredPostPages[0].thumbnail}`
                        : 'https://tailwindcss.com/img/card-left.jpg'
                    })`,
                  }}
                  title={filteredPostPages[0].title}
                />
              </a>
              <div className="p-5">
                <a
                  href="st"
                  className="text-gray-900 font-bold text-2xl mb-2 hover:text-indigo-600 transition duration-500 ease-in-out block"
                >
                  {filteredPostPages[0].title}
                </a>
                <p className="text-gray-700 text-xs mb-2">
                  {filteredPostPages[0].context}
                </p>
                <p className="text-gray-700 text-xl mb-2">
                  {filteredPostPages[0].description}
                </p>
                <p className="text-gray-600 text-xs">
                  {new Date(filteredPostPages[0].updated_by).toLocaleDateString(
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
              {filteredPostPages.slice(1, 5).map((post) => (
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
      
    <div className="max-w-screen-2xl mx-auto p-5 sm:p-10 md:p-16 bg-gray-100 min-h-screen">
      <div className="flex">
            {/* Phần hiển thị video chính */}
            <div className="flex-2 p-4 bg-green-900 rounded-lg w-2/3 max-w-l">
                <h2 className="text-white mb-4">Video</h2>
                <video
                    src={currentVideo.url}
                    controls
                    autoPlay
                    className="w-full rounded-lg"
                />
            </div>

            {/* Danh sách các video */}
            <div className="flex-1 p-4 bg-green-900 text-white w-1/3 ml-4 rounded-lg max-h-96 overflow-y-auto">
                {/* Tiêu đề của video hiện tại */}
                <div className="bg-green-500 p-4 rounded-lg mb-4">
                    <h4 className="text-lg font-bold flex items-center"><FaPlay />{currentVideo.title}</h4>
                    <p className="text-sm">{currentVideo.description}</p>
                </div>

                {/* Danh sách video bên dưới */}
                <ul className="space-y-4">
                    {videoList.map((video, index) => (
                        <li key={index}>
                            <button
                                onClick={() => handleVideoChange(video)}
                                className="flex items-center w-full p-2 text-left bg-transparent hover:bg-green-800 rounded-lg focus:outline-none"
                            >
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-16 h-16 rounded-md mr-4 object-cover"
                                />
                                <span className="text-sm line-clamp-2">{video.title}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      

        <div className="w-4/5 mx-auto mt-8">
      <h2 className="text-xl font-bold text-blue-800 border-b-4 border-blue-800 inline-block mb-4">Tiêu điểm</h2>
      <div className="space-y-4">
        {currentPosts.map(post => (
          <div key={post.id} className="flex border-b pb-4">
            <img
          src={
            post.thumbnail
              ? `http://localhost:8000/images/post/${post.thumbnail}`
              : 'https://tailwindcss.com/img/card-left.jpg'
          }
          alt={post.title}
          className="w-32 h-32 object-cover mr-4 rounded-lg"
        />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
              <p className="text-xs text-gray-500">{post.updated_at}</p>
              <p className="text-sm text-gray-700">{post.description}</p>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
    </div>
    </div> 
  );
};

export default PostPage;

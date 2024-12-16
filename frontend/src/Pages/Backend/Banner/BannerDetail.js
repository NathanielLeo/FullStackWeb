import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BannerDetail = () => {
  const { id } = useParams();  // Lấy ID từ URL
  const [banner, setBanner] = useState(null);
  const [error, setError] = useState(null);

  // Fetch banner details from API
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/banner/show/${id}`);
        if (response.status === 200 && response.data.status) {
          setBanner(response.data.banner);
          setError(null);
        } else {
          throw new Error('Không thể hiển thị thông tin banner.');
        }
      } catch (err) {
        setError('Có lỗi xảy ra khi hiển thị thông tin banner.');
      }
    };

    fetchBanner();
  }, [id]);

  if (error) {
    return <div className="bg-red-500 text-white p-4 rounded">{error}</div>;
  }

  if (!banner) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-2xl flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-2xl max-w-md w-full">
        <h1 className="text-3xl font-semibold mb-4 text-center text-blue-600">Chi tiết Banner</h1>
        {/* Hiển thị hình ảnh banner */}
        <div className="mt-4">
          <img 
            src={banner.image_url} // Lấy URL của ảnh banner
            alt={banner.name} 
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
        {/* Hiển thị thông tin banner */}
        <p><strong>ID:</strong> {banner.id}</p>
        <p><strong>Tên Banner:</strong> {banner.name}</p>
        <p><strong>Liên Kết:</strong> {banner.link || 'Chưa có liên kết'}</p>
        <p><strong>Mô Tả:</strong> {banner.description || 'Chưa có mô tả'}</p>
      </div>
    </div>
  );
};

export default BannerDetail;

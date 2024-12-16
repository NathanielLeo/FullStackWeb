// src/components/BrandDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BrandDetail = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Gọi API để lấy danh sách thương hiệu
    const fetchBrands = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/brand');
        if (response.data.status) {
          setBrands(response.data.brands);
        } else {
          setError('Không thể tải danh sách thương hiệu');
        }
      } catch (err) {
        setError('Lỗi khi kết nối API');
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-900">Thương Hiệu</h2>

        {loading ? (
          <p className="text-center">Đang tải...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="flex justify-center gap-10">
            {brands.map(brand => (
              <img
                key={brand.id}
                src={brand.image_url} // URL ảnh từ API
                alt={brand.name}
                className="w-full h-48 object-contain" // Đảm bảo ảnh giữ nguyên tỷ lệ
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BrandDetail;
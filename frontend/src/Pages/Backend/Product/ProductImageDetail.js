import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductImageDetail = () => {
  const { id } = useParams();  // Lấy ID từ URL
  const [productImage, setProductImage] = useState(null);
  const [error, setError] = useState(null);
  const [isShaking, setIsShaking] = useState(false);

  // Fetch product image details from API
  useEffect(() => {
    const fetchProductImage = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/productimage/show/${id}`);
        console.log(response.data); // Kiểm tra dữ liệu trả về từ API
        if (response.status === 200 && response.data.status) {
          setProductImage(response.data.product_image); // Chỉnh sửa ở đây
          setError(null);
        } else {
          throw new Error('Không thể hiển thị thông tin hình ảnh sản phẩm.');
        }
      } catch (err) {
        setError('Có lỗi xảy ra khi hiển thị thông tin hình ảnh sản phẩm.');
      }
    };

    fetchProductImage();
  }, [id]);

  const handleClick = () => {
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false); // Đặt lại trạng thái lắc sau 500ms
    }, 500);
  };

  if (error) {
    return <div className="bg-red-500 text-white p-4 rounded">{error}</div>;
  }

  if (!productImage) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-2xl flex items-center justify-center">
      <div
        className={`bg-white p-4 rounded-lg shadow-2xl max-w-md w-full ${isShaking ? 'animate-shake' : ''}`}
        onClick={handleClick}
      >
        <h1 className="text-3xl font-semibold mb-4 text-center text-red-600">Chi tiết hình ảnh sản phẩm</h1>
        {/* Hiển thị hình ảnh sản phẩm */}
        {productImage.thumbnail && (
          <div className="mt-4">
            <img
              src={productImage.thumbnail} // Lấy thumbnail từ product_image
              alt={`Hình ảnh sản phẩm ID: ${productImage.id}`}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        )}
        {/* Hiển thị thông tin hình ảnh sản phẩm */}
        <p><strong>Mã hình ảnh:</strong> {productImage.id}</p>
        <p><strong>Mã sản phẩm:</strong> {productImage.product_id}</p>
      </div>
    </div>
  );
};

export default ProductImageDetail;

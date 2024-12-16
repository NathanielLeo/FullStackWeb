import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();  // Lấy ID từ URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [isShaking, setIsShaking] = useState(false); 

  // Fetch product details from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/product/show/${id}`);
        if (response.status === 200 && response.data.status) {
          setProduct(response.data.product);
          setError(null);
        } else {
          throw new Error('Không thể hiển thị thông tin sản phẩm.');
        }
      } catch (err) {
        setError('Có lỗi xảy ra khi hiển thị thông tin sản phẩm.');
      }
    };

    fetchProduct();
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

  if (!product) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-2xl flex items-center justify-center">
      <div 
        className={`bg-white p-4 rounded-lg shadow-2xl max-w-md w-full ${isShaking ? 'animate-shake' : ''}`} 
        onClick={handleClick}>
        <h1 className="text-3xl font-semibold mb-4 text-center text-red-600">Chi tiết sản phẩm</h1>
        {/* Hiển thị hình ảnh sản phẩm */}
        {product.images && product.images.length > 0 && (
          <div className="mt-4">
            <img 
              src={product.images[0].thumbnail} // Lấy thumbnail của hình ảnh đầu tiên
              alt={product.name} 
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        )}
        {/* Hiển thị thông tin sản phẩm */}
        <p><strong>Mã sản phẩm:</strong> {product.id}</p>
        <p><strong>Tên sản phẩm:</strong> {product.name}</p>
        <p><strong>	Mã danh mục:</strong> {product.category_id}</p>
        <p><strong>Mã thương hiệu:</strong> {product.brand_id}</p>
        <p><strong>Giá bán:</strong> {product.price}</p>
        <p><strong>Mô tả sản phẩm:</strong> {product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetail;

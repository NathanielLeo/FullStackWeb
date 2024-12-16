import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductSaleDetail = () => {
  const { id } = useParams();  // Lấy ID từ URL
  const [productsale, setProductSale] = useState(null);
  const [error, setError] = useState(null);
  const [isShaking, setIsShaking] = useState(false);

  // Fetch productsale details from API
  useEffect(() => {
    const fetchProductSale = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/productsale/show/${id}`);
        if (response.status === 200 && response.data.status) {
          setProductSale(response.data.productsale);
          setError(null);
        } else {
          throw new Error('Không thể hiển thị thông tin sản phẩm.');
        }
      } catch (err) {
        setError('Có lỗi xảy ra khi hiển thị thông tin sản phẩm.');
      }
    };

    fetchProductSale();
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

  if (!productsale) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-2xl flex items-center justify-center">
      <div 
        className={`bg-white p-4 rounded-lg shadow-2xl max-w-md w-full ${isShaking ? 'animate-shake' : ''}`} 
        onClick={handleClick} // Thêm sự kiện onClick
      >
        <h1 className="text-3xl font-semibold mb-4 text-center text-red-600">Chi tiết sản phẩm sale</h1>
        {/* Hiển thị hình ảnh sản phẩm */}
        {productsale.images && productsale.images.length > 0 && (
          <div className="mt-4">
            <img 
              src={productsale.images[0].thumbnail} // Lấy thumbnail của hình ảnh đầu tiên
              alt={productsale.name} 
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        )}
        <p><strong>	Mã giảm giá:</strong> {productsale.id}</p>
        <p><strong>	Mã sản phẩm:</strong> {productsale.product_id}</p>
        <p><strong>Giá giảm:</strong> {productsale.price_sale}</p>
        <p><strong>Ngày bắt đầu:</strong> {productsale.date_begin}</p>
        <p><strong>Ngày kết thúc:</strong> {productsale.date_end}</p>
      </div>
    </div>
  );
};

export default ProductSaleDetail;

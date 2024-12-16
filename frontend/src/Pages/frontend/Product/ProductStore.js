import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductStore = () => {
  const [productstores, setProductStores] = useState([]);
  const [filteredProductStores, setFilteredProductStores] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductStore = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/productstore');
        setProductStores(response.data.productstores);
        setFilteredProductStores(response.data.productstores);
        setLoading(false);
      } catch (err) {
        setError('Có lỗi xảy ra khi lấy danh sách sản phẩm.');
        setLoading(false);
      }
    };
    fetchProductStore();
  }, []);
  const handleProductClick = (productId) => {
      navigate(`/productstore/${productId}`);
    };
  const handleClick = () => {
    navigate('/product'); // Thay đổi URL nếu cần
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6">
        {/* Tiêu đề trang */}
        <h1 className="text-5xl font-bold text-center mb-6">Sản phẩm bán chạy</h1>

        {/* Thông báo lỗi */}
        {error && (
          <div className="bg-red-500 text-white p-4 rounded mb-4 text-center">
            {error}
          </div>
        )}

        {/* Danh sách sản phẩm */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProductStores.length > 0 ? (
            filteredProductStores.slice(0, 4).map((product) => (
              <div 
                key={product.id} 
                className="bg-white p-6 rounded-xl shadow-lg relative"
                onClick={() => handleProductClick(product.id)}
              >
                {/* Hình ảnh sản phẩm */}
                <div className="text-center mb-4">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0].thumbnail}
                      alt={product.name}
                      className=" object-cover rounded-lg"
                    />
                  ) : (
                    <span>Không có hình ảnh</span>
                  )}
                </div>

                {/* Badge giảm giá */}
                {product.specialDeal && (
                  <div className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                    Giá thương lượng
                  </div>
                )}

                {/* Tên sản phẩm */}
                <h2 className="text-lg font-semibold text-center">{product.name}</h2>

                {/* Thông tin tính năng sản phẩm */}
                <div className="mt-2 text-sm text-gray-600 text-center">
                  {product.features ? (
                    <>
                      <p>Số ghế: {product.features.seats || 'N/A'}</p>
                      <p>Nhiên liệu: {product.features.fuel || 'N/A'}</p>
                      <p>Số km: {product.features.mileage || 'N/A'}</p>
                    </>
                  ) : (
                    <p>Không có tính năng</p>
                  )}
                </div>

                {/* Giá sản phẩm */}
                <div className="mt-4 text-center text-xl font-semibold text-gray-800">
                  {product.price} tr <span className="text-sm font-normal">/ VNĐ</span>
                </div>

                {/* Nút đặt hàng */}
                <div className="mt-4 text-center">
                  <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-full">
                    Đặt hàng ngay
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center col-span-full">Không có sản phẩm nào</div>
          )}
        </div>

        {/* Nút xem tất cả sản phẩm */}
        <div className="mt-8 text-center">
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full"
          onClick={handleClick}>
            Tất cả 
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductStore;

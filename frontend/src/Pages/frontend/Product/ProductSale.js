import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserProductSale = () => {
  const [productsales, setProductSales] = useState([]);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch product sales from API
    const fetchProductSales = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/productsale');
        setProductSales(response.data.productsales);
      } catch (err) {
        setError('Có lỗi xảy ra khi lấy danh sách sản phẩm sale.');
      }
    };

    fetchProductSales();
  }, []);

  useEffect(() => {
    // Function to update countdown timers
    const updateTimeLeft = () => {
      const newTimeLeft = productsales.map(productsale => {
        const saleEndTime = new Date(productsale.date_end);
        const now = new Date();
        const difference = saleEndTime - now;

        if (difference > 0) {
          const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((difference / (1000 * 60)) % 60);
          const seconds = Math.floor((difference / 1000) % 60);

          return {
            hours: String(hours).padStart(2, '0'),
            minutes: String(minutes).padStart(2, '0'),
            seconds: String(seconds).padStart(2, '0'),
          };
        } else {
          return null; // Sale has ended
        }
      });

      setTimeLeft(newTimeLeft);
    };

    updateTimeLeft(); // Initial calculation
    const intervalId = setInterval(updateTimeLeft, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [productsales]);
  const handleProductClick = (productId) => {
    navigate(`/productsale/${productId}`);
  };
  const handleClick = () => {
    navigate('/product'); 
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6">
        {/* FLASH SALE Header */}
        <div className="flex items-center justify-center mb-6">
          <h1 className="text-4xl font-bold text-orange-600 flex items-center">
            <span className="mr-2">FLASH SALE</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8 text-orange-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </h1>
        </div>

        {error && (
          <div className="bg-red-500 text-white p-4 rounded mb-4">
            {error}
          </div>
        )}

        {/* Product sale list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productsales.length > 0 ? (
            productsales.slice(0, 4).map((productsale, index) => (
              <div 
                key={productsale.id} 
                className="bg-white p-6 rounded-xl shadow-lg relative"
                onClick={() => handleProductClick(productsale.id)}
              >
                {/* Product image */}
                <div className="text-center mb-4">
                  {productsale.images && productsale.images.length > 0 ? (
                    <img
                      src={productsale.images[0].thumbnail}
                      alt={productsale.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <span>Không có hình ảnh</span>
                  )}
                </div>

                {/* Product ID */}
                <div className="text-center mb-4">
                  <p className="text-lg font-semibold text-gray-700">Mã sản phẩm: {productsale.product_id}</p>
                </div>

                {/* Sale price */}
                <div className="mt-2 text-center">
                  <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-sm">
                    Giá sale: {productsale.price_sale} VNĐ
                  </span>
                </div>

                {/* Countdown Timer */}
                {timeLeft[index] ? (
                  <div className="mt-4 flex items-center justify-center">
                    <div className="text-black bg-gray-900 text-white font-bold px-2 py-1">
                      {timeLeft[index].hours}
                    </div>
                    <span className="mx-1">:</span>
                    <div className="text-black bg-gray-900 text-white font-bold px-2 py-1">
                      {timeLeft[index].minutes}
                    </div>
                    <span className="mx-1">:</span>
                    <div className="text-black bg-gray-900 text-white font-bold px-2 py-1">
                      {timeLeft[index].seconds}
                    </div>
                  </div>
                ) : (
                  <div className="text-center mt-4 text-red-600 font-bold">Flash Sale đã kết thúc</div>
                )}

                {/* Button to see more */}
                <div className="mt-4 text-center">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center col-span-full">Không có sản phẩm sale nào</div>
          )}
        </div>

        {/* See all sales button */}
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

export default UserProductSale;

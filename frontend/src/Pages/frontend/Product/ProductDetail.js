import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductDetail = ({ product }) => (
  <div className="product-detail-container max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg">
    <div className="flex">
      {/* Product image */}
                <div className="text-center mb-4">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0].thumbnail}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <span>Không có hình ảnh</span>
                  )}
                </div>
      {/* Product Details Section */}
      <div className="w-1/2 p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          {product.name}
        </h2>
        <p className="text-red-500 text-2xl font-bold mb-4">
          {product.price} đ
        </p>

        <div className="mb-4">
          <span className="text-yellow-400">★★★★☆</span>
          <span className="text-gray-600 ml-2">
            {product.reviews || 112} Đánh giá
          </span>
          <span className="text-gray-600 ml-4">
            {product.likes || 887} Số lượng thích
          </span>
        </div>

        <div className="mb-4">
          <p className="font-semibold text-gray-700">Màu</p>
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 bg-black rounded-full border"></span>
            <span className="w-6 h-6 bg-beige rounded-full border"></span>
          </div>
        </div>

        <div className="mb-4">
          <p className="font-semibold text-gray-700">Kích thước</p>
          <div className="flex space-x-4 mt-2">
            {[35, 36, 37, 38, 39].map((size) => (
              <button
                key={size}
                className="w-10 h-10 border rounded-md hover:bg-red-100 focus:outline-none focus:border-red-500"
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <a
            href="#"
            className="text-red-500 font-semibold underline"
          >
            Hướng Dẫn Tính Size
          </a>
        </div>

        <div className="flex space-x-2 mb-4">
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
            Mua ngay
          </button>
          <button className="bg-white border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-gray-100">
            Thêm vào giỏ hàng
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center text-gray-700 mt-6">
          <div>
            <span>🛠️</span>
            <p>Bảo hành keo vĩnh viễn</p>
          </div>
          <div>
            <span>🚚</span>
            <p>Miễn phí vận chuyển toàn quốc</p>
          </div>
          <div>
            <span>🔄</span>
            <p>Đổi trả dễ dàng</p>
          </div>
          <div>
            <span>📞</span>
            <p>Hotline 1900.633.349</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {     
    const fetchProduct = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/product/');
        setProducts(response.data.products);
        setSelectedProduct(response.data.products[1]); // Lấy sản phẩm đầu tiên làm ví dụ
      } catch (err) {
        console.error("Có lỗi xảy ra khi lấy danh sách sản phẩm:", err);
      }
    };
    fetchProduct();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-6">Chi Tiết Sản Phẩm</h1>
      {selectedProduct && <ProductDetail product={selectedProduct} />}
    </div>
  );
};

export default ProductPage;

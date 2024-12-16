import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CiSearch } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import CartList from '../Cart/Cart';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState(() => {
    // Lấy giỏ hàng từ localStorage nếu có
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (query) => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/product');
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
        setLoading(false);
      } catch (err) {
        setError('Có lỗi xảy ra khi lấy danh sách sản phẩm.');
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);

  useEffect(() => {
    // Lưu giỏ hàng vào localStorage khi thay đổi
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    setIsCartOpen(true);
  };

  const handleProductClick = (productId) => {
    // Điều hướng đến trang chi tiết sản phẩm
    navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6">
        {error && (
          <div className="bg-red-500 text-white p-4 rounded mb-4">
            {error}
          </div>
        )}
        
        <div className="p-6">
          <h1 className="text-5xl font-bold text-center mb-6">Sản phẩm mới</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.slice(0, 4).map((product) => (
              <div 
                key={product.id} 
                className="bg-white p-6 rounded-xl shadow-lg relative"
              >
                <div className="text-center mb-4" onClick={() => handleProductClick(product.id)}>
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

                <h2 className="text-lg font-semibold text-center">{product.name}</h2>
                <div className="mt-4 text-center text-xl font-semibold text-gray-800">
                  {product.price} đ
                </div>

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600"
                  >
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
            
        <CartList isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cartItems} setCartItems={setCartItems} />
      </div>
    </div>
  );
};

export default Product;

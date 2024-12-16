import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();  // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [isShaking, setIsShaking] = useState(false); // State to manage shaking animation

  // Fetch product details from API when component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/product/show/${id}`);
        if (response.status === 200 && response.data.status) {
          setProduct(response.data.product);
          setError(null);
        } else {
          throw new Error('Unable to fetch product data.');
        }
      } catch (err) {
        setError('An error occurred while fetching product information.');
      }
    };

    fetchProduct();
  }, [id]);

  const handleClick = () => {
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false); // Reset shake state after 500ms
    }, 500);
  };

  if (error) {
    return <div className="bg-red-500 text-white p-4 rounded">{error}</div>;
  }

  if (!product) {
    return <div className="text-center p-4">Loading data...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div 
        className={`bg-white p-6 rounded-3xl shadow-lg max-w-4xl w-full ${isShaking ? 'animate-shake' : ''}`} 
        onClick={handleClick}>
        
        {/* Title */}
        <h1 className="text-3xl font-semibold mb-6 text-center text-blue-600">Chi Tiết Sản Phẩm</h1>
        
        {/* Product Image */}
        {product.images && product.images.length > 0 && (
          <div className="mb-6 text-center">
            <img 
              src={product.images[0].thumbnail} // Thumbnail image of the first image in the array
              alt={product.name}
              className="w-72 h-72 object-cover rounded-lg mx-auto"
            />
          </div>
        )}

        {/* Product Information */}
        <div className="space-y-4">
          <p><strong>Mã sản phẩm:</strong> {product.id}</p>
          <p><strong>Tên sản phẩm:</strong> {product.name}</p>
          <p><strong>Mã danh mục:</strong> {product.category_id}</p>
          <p><strong>Mã thương hiệu:</strong> {product.brand_id}</p>
          <p><strong>Giá bán:</strong> {product.price} VND</p>
          <p><strong>Mô tả sản phẩm:</strong> {product.description}</p>
        </div>

        {/* Back to List Button */}
        <div className="text-center mt-6">
          <button 
            onClick={() => window.history.back()} 
            className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300">
            Quay lại danh sách sản phẩm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

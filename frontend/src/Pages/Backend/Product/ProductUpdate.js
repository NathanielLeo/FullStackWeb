import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductUpdate = () => {
  const { id } = useParams();  // Lấy ID từ URL
  const [product, setProduct] = useState({
    name: '',
    category_id: '',
    brand_id: '',
    price: '',
    status: 1,
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Fetch product details to edit
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log(product)
        const response = await axios.get(`http://127.0.0.1:8000/api/product/show/${id}`);
        if (response.status === 200 && response.data.status) {
          setProduct(response.data.product);
          setError(null);
        } else {
          throw new Error('Không thể tải dữ liệu sản phẩm.');
        }
      } catch (err) {
        setError('Có lỗi xảy ra khi tải dữ liệu sản phẩm.');
      }
    };

    fetchProduct();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  // Handle form submission to update product
const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Lọc chỉ các trường cần thiết để cập nhật
  const updatedProduct = {
    name: product.name,
    category_id: product.category_id,
    brand_id: product.brand_id,
    price: product.price,
    status: product.status,
  };
console.log(updatedProduct);
  try {
    const response = await axios.put(`http://127.0.0.1:8000/api/product/update/${id}`, updatedProduct);
    if (response.status === 200 && response.data.status) {
      setSuccessMessage('Cập nhật sản phẩm thành công.');
      setError(null);
      // Điều hướng về trang quản lý sản phẩm sau khi cập nhật
      setTimeout(() => {
        navigate('/admin/product');
      }, 1500);
    } else {
      throw new Error('Không thể cập nhật sản phẩm.');
    }
  } catch (err) {
    setError('Có lỗi xảy ra khi cập nhật sản phẩm.');
  }
};


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-xl font-semibold mb-4">Cập nhật sản phẩm</h1>

        {error && <div className="bg-red-500 text-white p-4 rounded mb-4">{error}</div>}
        {successMessage && <div className="bg-green-500 text-white p-4 rounded mb-4">{successMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Tên sản phẩm</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg w-full p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Category ID</label>
            <input
              type="number"
              name="category_id"
              value={product.category_id}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg w-full p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Brand ID</label>
            <input
              type="number"
              name="brand_id"
              value={product.brand_id}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg w-full p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Giá</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg w-full p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Trạng thái</label>
            <select
              name="status"
              value={product.status}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg w-full p-2"
              required
            >
              <option value={1}>Kích hoạt</option>
              <option value={0}>Vô hiệu</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Lưu thay đổi
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductUpdate;

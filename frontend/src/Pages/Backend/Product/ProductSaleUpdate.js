import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductSaleUpdate = () => {
  const { id } = useParams();  // Lấy ID từ URL
  const [productsale, setProductSale] = useState({
    product_id: '',  // Changed to match the backend structure
    price_sale: '',
    date_begin: '',
    date_end: '',
    status: 1,
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Lấy chi tiết sản phẩm để chỉnh sửa
  useEffect(() => {
    const fetchProductSale = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/productsale/show/${id}`);
        if (response.status === 200 && response.data.status) {
          setProductSale(response.data.productsale); 
          setError(null);
        } else {
          throw new Error('Không thể tải dữ liệu sản phẩm khuyến mãi.');
        }
      } catch (err) {
        setError('Có lỗi xảy ra khi tải dữ liệu sản phẩm khuyến mãi.');
      }
    };

    fetchProductSale();
  }, [id]);

  // Xử lý thay đổi input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductSale((prevProductSale) => ({ ...prevProductSale, [name]: value }));
  };

  // Xử lý form submit để cập nhật sản phẩm
    const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProductSale = {
        product_id: productsale.product_id,
        price_sale: productsale.price_sale,
        date_begin: productsale.date_begin,
        date_end: productsale.date_end,
        status: productsale.status,
    };
 console.log(updatedProductSale);
    try {
       
        const response = await axios.put(`http://127.0.0.1:8000/api/productsale/update/${id}`, updatedProductSale);
        if (response.status === 200 && response.data.status) {
        setSuccessMessage('Cập nhật sản phẩm khuyến mãi thành công.');
        setError(null);
        setTimeout(() => {
            navigate('/admin/productsale');
        }, 1500);
        } else {
        throw new Error('Không thể cập nhật sản phẩm khuyến mãi.');
        }
    } catch (err) {
        setError('Có lỗi xảy ra khi cập nhật sản phẩm khuyến mãi.');
    }
    };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-xl font-semibold mb-4">Cập nhật sản phẩm khuyến mãi</h1>

        {error && <div className="bg-red-500 text-white p-4 rounded mb-4">{error}</div>}
        {successMessage && <div className="bg-green-500 text-white p-4 rounded mb-4">{successMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Sản phẩm</label>
            <input
              type="text"
              name="product_id" // Ensure this maps to product_id correctly
              value={productsale.product_id} 
              onChange={handleChange}
              className="border border-gray-300 rounded-lg w-full p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Giá khuyến mãi</label>
            <input
              type="number"
              name="price_sale" // Sale price
              value={productsale.price_sale} 
              onChange={handleChange}
              className="border border-gray-300 rounded-lg w-full p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Ngày bắt đầu</label>
            <input
              type="datetime-local"
              name="date_begin" // Start date
              value={productsale.date_begin}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg w-full p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Ngày kết thúc</label>
            <input
              type="datetime-local"
              name="date_end" // End date
              value={productsale.date_end}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg w-full p-2"
              required
            />
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

export default ProductSaleUpdate;

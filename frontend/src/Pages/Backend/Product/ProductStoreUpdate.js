import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductStoreUpdate = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [productstore, setProductStore] = useState({
    product_id: '',
    type: '',
    price: '',
    qty: '',
    status: 1,
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Lấy chi tiết sản phẩm để chỉnh sửa
  useEffect(() => {
    const fetchProductStore = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/productstore/show/${id}`);
        if (response.status === 200 && response.data.status) {
          setProductStore(response.data.productstore);
          setError(null);
        } else {
          throw new Error('Không thể tải dữ liệu sản phẩm.');
        }
      } catch (err) {
        setError('Có lỗi xảy ra khi tải dữ liệu sản phẩm.');
      }
    };

    fetchProductStore();
  }, [id]);

  // Xử lý thay đổi input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductStore((prevProductStore) => ({ ...prevProductStore, [name]: value }));
  };

  // Xử lý form submit để cập nhật sản phẩm
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProductStore = {
      product_id: productstore.product_id,
      type: productstore.type,
      price: productstore.price,
      qty: productstore.qty,
      status: productstore.status,
    };

    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/productstore/update/${id}`, updatedProductStore);
      if (response.status === 200 && response.data.status) {
        setSuccessMessage('Cập nhật sản phẩm thành công.');
        setError(null);
        setTimeout(() => {
          navigate('/admin/productstore');
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
            <label className="block text-gray-700">Sản phẩm</label>
            <input
              type="text"
              name="product_id"
              value={productstore.product_id}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg w-full p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Loại</label>
            <input
              type="text"
              name="type"
              value={productstore.type}
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
              value={productstore.price}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg w-full p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Số lượng</label>
            <input
              type="number"
              name="qty"
              value={productstore.qty}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg w-full p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Trạng thái</label>
            <select
              name="status"
              value={productstore.status}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg w-full p-2"
              required
            >
              <option value={1}>Hoạt động</option>
              <option value={0}>Ngừng hoạt động</option>
            </select>
          </div>

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Lưu thay đổi
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductStoreUpdate;

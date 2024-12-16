import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import ProductStoreService from '../../../services/ProductStoreService';
import axios from 'axios';

const ProductStore = () => {
  const [productstores, setProductStores] = useState([]);
  const [filteredProductStores, setFilteredProductStores] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = (query) => {
    const filtered = productstores.filter((productstore) =>
      productstore.type.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProductStores(filtered);
  };

  const handleEdit = (id) => {
    navigate(`/admin/productstore/update/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa product này?')) {
      try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/productstore/destroy/${id}`);
        if (response.status === 200 && response.data.status) {
          setProductStores(productstores.filter((product) => product.id !== id));
          setFilteredProductStores(filteredProductStores.filter((product) => product.id !== id));
          setSuccessMessage('Xóa product thành công.');
          setError(null);
        } else {
          throw new Error(response.data.message || 'Xóa không thành công.');
        }
      } catch (err) {
        setError('Có lỗi xảy ra khi xóa product.');
        setSuccessMessage('');
      }
    }
  };

  const handleShow = (id) => {
    navigate(`/admin/productstore/show/${id}`);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/productstore');
        if (response.status === 200 && response.data.status) {
          setProductStores(response.data.productstores);
          setFilteredProductStores(response.data.productstores);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error fetching products');
      }
    })();
  }, []);


  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6">
        {successMessage && (
          <div className="bg-green-500 text-white p-4 rounded mb-4">
            {successMessage}
          </div>
        )}
        {error && (
          <div className="bg-red-500 text-white p-4 rounded mb-4">
            {error}
          </div>
        )}

        <header className="bg-white p-4 rounded-3xl shadow mb-6">
          <div className="flex justify-between items-center">
            <div className="relative flex items-center w-1/4">
              <CiSearch className="absolute left-3 text-gray-500" size={24} />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="border border-gray-300 rounded-xl pl-10 pr-4 py-2 w-60"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => navigate('/admin/productstore/create')}>
              + Thêm
            </button>
          </div>
        </header>

        <div className="bg-white p-4 rounded-3xl shadow mb-6">
          <h3 className="text-bold text-lg font-semibold mb-4">PRODUCT STORE</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Product ID</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Hình ảnh</th>
                <th className="p-2 border">Qty</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {filteredProductStores.length > 0 ? (
                filteredProductStores.map((productstore) => (
                  <tr key={productstore.id} className="border-b">
                    <td className="p-2 border text-center">{productstore.id}</td>
                    <td className="p-2 border">{productstore.product_id}</td>
                    <td className="p-2 border">{productstore.type}</td>
                    <td className="p-2 border">{productstore.price}</td>
                    <td className="p-2 border text-center">
                      {productstore.images.length > 0 ? (
                        <img
                          src={productstore.images[0].thumbnail}
                          alt="product thumbnail"
                          className="w-16 h-16 object-cover"
                        />
                      ) : (
                        'Không có hình ảnh'
                      )}
                    </td>
                    <td className="p-2 border">{productstore.qty}</td>
                    <td className="p-2 border">{productstore.status}</td>
                    <td className="p-2 border">
                      <div className="flex items-center gap-2">
                        <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => handleEdit(productstore.id)}>
                          Sửa
                        </button>
                        <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(productstore.id)}>
                          Xóa
                        </button>
                        <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => handleShow(productstore.id)}>
                          Xem
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center p-4">Không có sản phẩm nào</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductStore;

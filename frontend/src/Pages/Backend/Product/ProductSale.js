import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import ProductSaleService from '../../../services/ProductSaleService';
import axios from 'axios';

const ProductSale = () => {
  const [productsales, setProductSales] = useState([]);
  const [filteredProductSales, setFilteredProductSales] = useState([]);
  const [successMessage, setSuccessMessage] = useState(''); // Trạng thái quản lý thông báo
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Search function
  const handleSearch = (query) => {
    const filtered = productsales.filter((productsale) =>
      productsale.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProductSales(filtered);
  };

  // Edit productsale function
  const handleEdit = (id) => {
    navigate(`/admin/productsale/update/${id}`);
  };

  // Delete productsale function
  const handleDelete = async (id) => {
      if (window.confirm('Bạn có chắc chắn muốn xóa productsale này?')) {
          try {
              const response = await axios.delete(`http://127.0.0.1:8000/api/productsale/destroy/${id}`);
              
              if (response.status === 200 && response.data.status) {
                  setProductSales(productsales.filter((productsale) => productsale.id !== id));
                  setFilteredProductSales(filteredProductSales.filter((productsale) => productsale.id !== id));
                  setSuccessMessage('Xóa productsale thành công.');
                  setError(null);
              } else {
                  throw new Error(response.data.message || 'Xóa không thành công.');
              }
          } catch (err) {
              setError('Có lỗi xảy ra khi xóa productsale.');
              setSuccessMessage('');
          }
      }
  };
  const handleShow = async (id) => {
    navigate(`/admin/productsale/show/${id}`);
  };

  // Fetching productsale data from the API when component renders
  useEffect(() => {
    (async () => {
      try {
        const result = await ProductSaleService.index('productsale');
        setProductSales(result.productsales);
        setFilteredProductSales(result.productsales);
      } catch (error) {
        console.error('Error fetching productsales:', error);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6">
        {/* Success message */}
        {successMessage && (
          <div className="bg-green-500 text-white p-4 rounded mb-4">
            {successMessage}
          </div>
        )}

        <header className="bg-white p-4 rounded-3xl shadow mb-6">
          <div className="flex justify-between items-center">
            {/* Search bar with icon */}
            <div className="relative flex items-center w-1/4">
              <CiSearch className="absolute left-3 text-gray-500" size={24} />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="border border-gray-300 rounded-xl pl-10 pr-4 py-2 w-60"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            {/* Add button */}
            <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => navigate('/admin/productsale/create')}>
              + Thêm
            </button>
          </div>
        </header>

        {/* Product management table */}
        <div className="bg-white p-4 rounded-3xl shadow mb-6">
          <h3 className="text-bold text-lg font-semibold mb-4">QUẢN LÝ PRODUCTS SALE</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Product_id</th>
                <th className="p-2 border">Price_sale</th>
                <th className="p-2 border">Hình ảnh</th>
                <th className="p-2 border">Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {filteredProductSales && filteredProductSales.length > 0 ? (
                filteredProductSales.map((productsale, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2 border text-center">{productsale.id}</td>
                    <td className="p-2 border">{productsale.product_id}</td>
                    <td className="p-2 border">{productsale.price_sale}</td>
                     <td className="p-2 border text-center">
                      {productsale.images.length > 0 ? (
                        <img
                          src={productsale.images[0].thumbnail}
                          alt={productsale.name}
                          className="w-16 h-16 object-cover"
                        />
                      ) : (
                        'Không có hình ảnh'
                      )}
                    </td>
                    <td className="p-2 border">
                      <div className="flex items-center gap-2">
                        <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => handleEdit(productsale.id)}>
                          Sửa
                        </button>
                        <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(productsale.id)}>
                          Xóa
                        </button>
                        <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => handleShow (productsale.id)}>
                          Xem
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-4">Không có sản phẩm nào</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductSale;

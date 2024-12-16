import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import ProductService from '../../../services/ProductService';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [successMessage, setSuccessMessage] = useState(''); // Trạng thái quản lý thông báo
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Search function
  const handleSearch = (query) => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Edit product function
  const handleUpdate = (id) => {
    navigate(`/admin/product/update/${id}`);
  };

  // Delete product function
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa product này?')) {
      try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/product/destroy/${id}`);
        if (response.status === 200 && response.data.status) {
          setProducts(products.filter((product) => product.id !== id));
          setFilteredProducts(filteredProducts.filter((product) => product.id !== id));
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

  const handleShow = async (id) => {
    navigate(`/admin/product/show/${id}`);
  };

  // Fetching product data from the API when component renders
  useEffect(() => {
    (async () => {
      try {
        const result = await ProductService.index('product');
        setProducts(result.products);
        setFilteredProducts(result.products);
      } catch (error) {
        console.error('Error fetching products:', error);
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
            <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => navigate('/admin/product/create')}>
              + Thêm
            </button>
          </div>
        </header>

        {/* Product management table */}
        <div className="bg-white p-4 rounded-3xl shadow mb-6">
          <h3 className="text-bold text-lg font-semibold mb-4">QUẢN LÝ PRODUCTS</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Hình ảnh</th>
                <th className="p-2 border">Tên sản phẩm</th>
                <th className="p-2 border">Category_id</th>
                <th className="p-2 border">Brand_id</th>
                <th className="p-2 border">Giá</th>
                <th className="p-2 border">Mô tả</th>
                <th className="p-2 border">Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2 border text-center">{product.id}</td>
                    
                    {/* Hiển thị hình ảnh sản phẩm */}
                    <td className="p-2 border text-center">
                      {product.images.length > 0 ? (
                        <img
                          src={product.images[0].thumbnail}
                          alt={product.name}
                          className="w-16 h-16 object-cover"
                        />
                      ) : (
                        'Không có hình ảnh'
                      )}
                    </td>

                    <td className="p-2 border">{product.name}</td>
                    <td className="p-2 border">{product.category_id}</td>
                    <td className="p-2 border">{product.brand_id}</td>
                    <td className="p-2 border">{product.price}</td>
                    <td className="w-1/4 p-2 border">{product.description}</td>
                    <td className="p-2 border">
                      <div className="flex items-center gap-2">
                        <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => handleUpdate(product.id)}>
                          Cập nhật
                        </button>
                        <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(product.id)}>
                          Xóa
                        </button>
                        <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => handleShow(product.id)}>
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

export default ProductList;

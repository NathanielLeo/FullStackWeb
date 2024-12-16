import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import axios from 'axios';
import BrandService from '../../../services/BrandService';

const BrandList = () => {
  const [brands, setBrands] = useState([]);
  const [filteredbrands, setFilteredBrands] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Hàm tìm kiếm
  const handleSearch = (query) => {
    const filtered = brands.filter((brand) =>
      brand.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBrands(filtered);
  };

  // Hàm chỉnh sửa brand
  const handleShow = (id) => {
    navigate(`/admin/brand/show/${id}`);
  };

  // Hàm xóa brand
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa brand này?')) {
      try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/brand/destroy/${id}`);
        
        if (response.status === 200 && response.data.status) {
          setBrands(brands.filter((brand) => brand.id !== id));
          setFilteredBrands(filteredbrands.filter((brand) => brand.id !== id));
          setSuccessMessage('Xóa brand thành công.');
          setError(null);
        } else {
          throw new Error(response.data.message || 'Xóa không thành công.');
        }
      } catch (err) {
        setError('Có lỗi xảy ra khi xóa brand.');
        setSuccessMessage('');
      }
    }
  };

  // Fetch dữ liệu brand từ API khi component render
  useEffect(() => {
    const fetchbrands = async () => {
      try {
        const result = await BrandService.index('brand');
        if (result.status && Array.isArray(result.brands)) {
          // Đảm bảo rằng result.brands là một mảng
          setBrands(result.brands);
          setFilteredBrands(result.brands);
          setError(null);
        } else {
          setError(result.message || 'Lỗi khi tải dữ liệu.');
        }
      } catch (error) {
        setError('Có lỗi xảy ra khi lấy dữ liệu brand.');
      }
    };

    fetchbrands();
  }, []);

  const handleUpdate = (id) => {
    navigate(`/admin/brand/update/${id}`);
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6">
        {/* Thông báo thành công */}
        {successMessage && (
          <div className="bg-green-500 text-white p-4 rounded mb-4">
            {successMessage}
          </div>
        )}

        {/* Thông báo lỗi */}
        {error && (
          <div className="bg-red-500 text-white p-4 rounded mb-4">
            {error}
          </div>
        )}

        <header className="bg-white p-4 rounded-3xl shadow mb-6">
          <div className="flex justify-between items-center">
            {/* Search bar with icon */}
            <div className="relative flex items-center w-1/4">
              <CiSearch className="absolute left-3 text-gray-500" size={24} />
              <input
                type="text"
                placeholder="Tìm kiếm brand..."
                className="border border-gray-300 rounded-xl pl-10 pr-4 py-2 w-60"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            {/* Nút thêm */}
            <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => navigate('/admin/brand/store')}>
              + Thêm
            </button>
          </div>
        </header>

        {/* Bảng quản lý brand */}
        <div className="bg-white p-4 rounded-3xl shadow mb-6">
          <h3 className="text-bold text-lg font-semibold mb-4">QUẢN LÝ BRAND</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200 text-center">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Tên</th>
                <th className="p-2 border">Slug</th>
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Mô tả</th>
                <th className="p-2 border">Chức năng</th>
              </tr>
            </thead>
            <tbody>
            {filteredbrands && setFilteredBrands.length > 0 ? (
                filteredbrands.map((brand, index) => (
                <tr key={index} className="border-b ">
                    <td className="p-2 border text-center">{brand.id}</td>
                    <td className="p-2 border text-center">{brand.name}</td>
                    <td className="p-2 border text-center">{brand.slug}</td>
                    <td className="p-2 border text-center">
                    <img src={`http://localhost:8000/images/brand/${brand.image}`} alt={brand.name} className="w-48 h-48 object-cover mx-auto" />
                     </td>
                    <td className="p-2 border text-center">{brand.description}</td>
                    <td className="p-2 border ">
                    <div className="flex items-center gap-2">
                      <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => handleUpdate(brand.id)}>
                          Cập nhật
                        </button>
                        <button className="bg-blue-500 text-white px-2 py-1 rounded " onClick={() => handleShow(brand.id)}>
                        Xem
                        </button>
                        <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(brand.id)}>
                        Xóa
                        </button>
                    </div>
                    </td>
                </tr>
                ))
            ) : (
                <tr>
                <td colSpan="11" className="text-center p-4">Không có brand nào</td>
                </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BrandList;

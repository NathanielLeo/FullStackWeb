import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import axios from 'axios';
import CategoryService from '../../../services/CategoryService';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Hàm tìm kiếm
  const handleSearch = (query) => {
    const filtered = categories.filter((Category) =>
      Category.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  // Hàm chỉnh sửa Category


  // Hàm xóa Category
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa Category này?')) {
      try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/category/destroy/${id}`);
        
        if (response.status === 200 && response.data.status) {
          setCategories(categories.filter((Category) => Category.id !== id));
          setFilteredCategories(filteredCategories.filter((Category) => Category.id !== id));
          setSuccessMessage('Xóa Category thành công.');
          setError(null);
        } else {
          throw new Error(response.data.message || 'Xóa không thành công.');
        }
      } catch (err) {
        setError('Có lỗi xảy ra khi xóa Category.');
        setSuccessMessage('');
      }
    }
  };

  // Fetch dữ liệu Category từ API khi component render
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await CategoryService.index('category');
        if (result.status) {
          setCategories(result.categories);
          setFilteredCategories(result.categories);
          setError(null);
        } else {
          setError(result.message || 'Lỗi khi tải dữ liệu.');
        }
      } catch (error) {
        setError('Có lỗi xảy ra khi lấy dữ liệu Category.');
      }
    };

    fetchCategories();
  }, []);
  const handleUpdate = (id) => {
    navigate(`/admin/category/update/${id}`);
  };
  const handleShow = async (id) => {
    navigate(`/admin/category/show/${id}`);
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
                placeholder="Tìm kiếm Category..."
                className="border border-gray-300 rounded-xl pl-10 pr-4 py-2 w-60"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            {/* Nút thêm */}
            <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => navigate('/admin/category/store')}>
              + Thêm
            </button>
          </div>
        </header>

        {/* Bảng quản lý Category */}
        <div className="bg-white p-4 rounded-3xl shadow mb-6">
          <h3 className="text-bold text-lg font-semibold mb-4">QUẢN LÝ CATEGORY</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200 text-center">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Tên</th>
                <th className="p-2 border">Slug</th>
                <th className="p-2 border">parent_id</th>
                <th className="p-2 border">sort_order</th>
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Mô tả</th>
                {/* <th className="p-2 border">Created By</th>
                <th className="p-2 border">Updated By</th>
                <th className="p-2 border">Status</th> */}
                <th className="p-2 border">Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((Category, index) => (
                  <tr key={index} className="border-b text-center">
                    <td className="p-2 border text-center">{Category.id}</td>
                    <td className="p-2 border">{Category.name}</td>
                    <td className="p-2 border">{Category.slug}</td>
                    <td className="p-2 border">{Category.parent_id}</td>
                    <td className="p-2 border">{Category.sort_order}</td>
                    <td className="p-2 border">
                    <img src={`http://localhost:8000/images/category/${Category.image}`} alt={Category.name} className="h-24 w-full object-cover" />
                     </td>
                    <td className="p-2 border">{Category.description}</td>
                    {/* <td className="p-2 border">{Category.created_by}</td>
                    <td className="p-2 border">{Category.updated_by}</td>
                    <td className="p-2 border">{Category.status}</td> */}
                    <td className="p-2 border">
                      <div className="flex items-center gap-2">
                        <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => handleUpdate(Category.id)}>
                          Cập nhật
                        </button>
                        <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => handleShow(Category.id)}>
                          Xem
                        </button>
                        <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(Category.id)}>
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="text-center p-4">Không có Category nào</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;

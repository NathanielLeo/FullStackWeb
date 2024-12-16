import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CategoryService from '../../../services/CategoryService';

const AddCategory = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [categoryData, setCategoryData] = useState({
    name: '',
    slug: '',
    description: '',
    image: null,
    status: '1',
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({
      ...categoryData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setCategoryData({
      ...categoryData,
      image: e.target.files[0],
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  for (const key in categoryData) {
    formData.append(key, categoryData[key]);
  }

  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const response = await axios.post('http://127.0.0.1:8000/api/category/store', formData, config);

    // Kiểm tra phản hồi từ API
    if (response.status === 200 && response.data.status) {
      setSuccessMessage('Thêm Category thành công.');
      setError(null);
      navigate('/admin/category');
    } else {
      throw new Error(response.data.message || 'Thêm không thành công.');
    }
  } catch (err) {
    if (err.response) {
      setError(err.response.data.message || 'Có lỗi xảy ra khi thêm category.');
    } else {
      setError('Có lỗi xảy ra. Không thể kết nối đến server.');
    }
    setSuccessMessage(''); // Reset lại thông báo thành công nếu có lỗi
  }
};

  return (
    <div className="content-wrapper">
      <section className="content-header mb-4">
        <div className="container-fluid">
          <div className="flex justify-between mb-2">
            <h1 className="text-2xl font-bold text-gray-800">Thêm Category</h1>
            <button
              className="btn btn-info bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded"
              onClick={() => navigate('/admin/category')}
            >
              <i className="fas fa-arrow-left"></i> Về Danh Sách
            </button>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="card border border-gray-300 shadow-lg">
          <div className="card-body">
            {error && <div className="mb-4 text-red-500">{error}</div>}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="mb-3">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tên Category</label>
                    <input
                      name="name"
                      type="text"
                      className="form-control mt-1 block w-full p-2 border border-gray-300 rounded"
                      value={categoryData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="slug" className="block text-sm font-medium text-gray-700">Slug</label>
                    <input
                      name="slug"
                      type="text"
                      className="form-control mt-1 block w-full p-2 border border-gray-300 rounded"
                      value={categoryData.slug}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="parent_id" className="block text-sm font-medium text-gray-700">Parent_id</label>
                    <input
                      name="parent_id"
                      type="text"
                      className="form-control mt-1 block w-full p-2 border border-gray-300 rounded"
                      value={categoryData.parent_id}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Mô Tả</label>
                    <textarea
                      name="description"
                      rows="4"
                      id="description"
                      className="form-control mt-1 block w-full p-2 border border-gray-300 rounded"
                      value={categoryData.description}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>

                <div>
                  <div className="mb-3">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Hình Ảnh</label>
                    <input
                      name="image"
                      id="image"
                      type="file"
                      className="form-control mt-1 block w-full p-2 border border-gray-300 rounded"
                      onChange={handleFileChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Trạng Thái</label>
                    <select
                      name="status"
                      id="status"
                      className="form-control mt-1 block w-full p-2 border border-gray-300 rounded"
                      value={categoryData.status}
                      onChange={handleInputChange}
                    >
                      <option value="1">Xuất Bản</option>
                      <option value="2">Không Xuất Bản</option>
                    </select>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-success bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded">
                <i className="fas fa-save"></i> Lưu [Thêm]
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddCategory;
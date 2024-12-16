import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BannerCreate = () => {
  const navigate = useNavigate();
  const [bannerData, setBannerData] = useState({
    name: '',
    link: '',
    description: '',
    image: null,
    status: '1',
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBannerData({
      ...bannerData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setBannerData({
      ...bannerData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in bannerData) {
      formData.append(key, bannerData[key]);
    }

    // Log nội dung formData để kiểm tra
    console.log([...formData]);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      // Gửi dữ liệu tới API Laravel
      const response = await axios.post('http://127.0.0.1:8000/api/banner/store', formData, config);
      console.log('Phản hồi từ server:', response.data); // Log phản hồi từ server
      navigate('/admin/banner');
    } catch (err) {
      if (err.response) {
        console.error('Lỗi từ server:', err.response.data); // Log lỗi chi tiết từ server
        setError(err.response.data.error || 'Có lỗi xảy ra khi thêm banner.');
      } else {
        setError('Có lỗi xảy ra. Không thể kết nối đến server.');
      }
    }
  };

  return (
    <div className="content-wrapper">
      <section className="content-header mb-4">
        <div className="container-fluid">
          <div className="flex justify-between mb-2">
            <h1 className="text-2xl font-bold text-gray-800">Thêm Banner</h1>
            <button
              className="btn btn-info bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded"
              onClick={() => navigate('/admin/banner')}
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
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tên Banner</label>
                    <input
                      name="name"
                      type="text"
                      className="form-control mt-1 block w-full p-2 border border-gray-300 rounded"
                      value={bannerData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="link" className="block text-sm font-medium text-gray-700">Liên Kết</label>
                    <textarea
                      name="link"
                      rows="4"
                      id="link"
                      className="form-control mt-1 block w-full p-2 border border-gray-300 rounded"
                      value={bannerData.link}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Mô Tả</label>
                    <textarea
                      name="description"
                      rows="4"
                      id="description"
                      className="form-control mt-1 block w-full p-2 border border-gray-300 rounded"
                      value={bannerData.description}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>

                <div>
                  <div className="mb-3">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Hình</label>
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
                      value={bannerData.status}
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

export default BannerCreate;

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import axios from 'axios';

const BannerList = () => {
  const [banners, setBanners] = useState([]);
  const [filteredBanners, setFilteredBanners] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/banner/');
      setBanners(response.data.banners);
      setFilteredBanners(response.data.banners);
    } catch (error) {
      setError('Có lỗi xảy ra khi lấy dữ liệu.');
    }
  };

  const handleSearch = (query) => {
    const filtered = banners.filter((banner) =>
      banner.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBanners(filtered);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa banner này?')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/banner/destroy${id}`);
        setBanners(banners.filter((banner) => banner.id !== id));
        setFilteredBanners(filteredBanners.filter((banner) => banner.id !== id));
        setSuccessMessage('Xóa banner thành công.');
        setError(null);
      } catch (err) {
        setError('Có lỗi xảy ra khi xóa banner.');
        setSuccessMessage('');
      }
    }
  };
  const handleUpdate = (id) => {
    navigate(`/admin/banner/update/${id}`);
  };
  const handleShow = async (id) => {
    navigate(`/admin/banner/show/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Success message */}
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

      <header className="bg-white p-4 rounded-3xl shadow mb-6 flex justify-between items-center">
        <div className="relative flex items-center w-1/4">
          <CiSearch className="absolute left-3 text-gray-500" size={24} />
          <input
            type="text"
            placeholder="Tìm kiếm banner..."
            className="border border-gray-300 rounded-xl pl-10 pr-4 py-2 w-60"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <Link to="/admin/banner/create" className="bg-green-500 text-white px-4 py-2 rounded">
          + Thêm
        </Link>
      </header>

      <div className="bg-white p-4 rounded-3xl shadow mb-6">
        <h3 className="text-bold text-lg font-semibold mb-4">QUẢN LÝ BANNER</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Hình</th>
              <th className="p-2 border">Tên Banner</th>
              <th className="p-2 border">Liên Kết</th>
              <th className="p-2 border">Mô Tả</th>
              <th className="p-2 border">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {filteredBanners.length > 0 ? (
              filteredBanners.map((banner, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2 border text-center">{banner.id}</td>
                  <td className="p-2 border text-center">
                    <img src={banner.image_url} alt={banner.name} className="w-full h-32 object-cover" />
                  </td>
                  <td className="p-2 border">{banner.name}</td>
                  <td className="p-2 border">{banner.link || 'Chưa có liên kết'}</td>
                  <td className="p-2 border">{banner.description || 'Mô tả chưa có'}</td>
                  <td className="p-2 border">
                    <div className="flex items-center gap-2">
                        <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => handleUpdate(banner.id)}>
                          Cập nhật
                        </button>
                        <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(banner.id)}>
                          Xóa
                        </button>
                        <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => handleShow(banner.id)}>
                          Xem
                        </button>
                      </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">Không có banner nào</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BannerList;

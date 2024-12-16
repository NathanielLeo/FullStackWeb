import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import axios from 'axios';

const ProductImage = () => {
  const [productImages, setProductImages] = useState([]); // Khởi tạo mảng rỗng
  const [filteredProductImages, setFilteredProductImages] = useState([]); // Khởi tạo mảng rỗng
  const [successMessage, setSuccessMessage] = useState(''); 
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Search function
  const handleSearch = (query) => {
    const filtered = productImages.filter((image) =>
      image.product_id.toString().includes(query)
    );
    setFilteredProductImages(filtered);
  };

  // Edit image function
  const handleEdit = (id) => {
    navigate(`/admin/productimage/edit/${id}`);
  };

  // Delete image function
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa hình ảnh này?')) {
      try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/productimage/destroy/${id}`);
        
        if (response.status === 200 && response.data.status) {
          setProductImages(productImages.filter((image) => image.id !== id));
          setFilteredProductImages(filteredProductImages.filter((image) => image.id !== id));
          setSuccessMessage('Xóa hình ảnh thành công.');
          setError(null);
        } else {
          throw new Error(response.data.message || 'Xóa không thành công.');
        }
      } catch (err) {
        setError('Có lỗi xảy ra khi xóa hình ảnh.');
        setSuccessMessage('');
      }
    }
  };

  const handleShow = async (id) => {
    navigate(`/admin/productimage/show/${id}`);
  };

  // Fetching product images data from the API when component renders
    useEffect(() => {
        (async () => {
            try {
            const result = await axios.get('http://127.0.0.1:8000/api/productimage');
            // Sửa key từ `productImages` thành `product_images` theo đúng response của API
            const fetchedImages = result.data.product_images || []; // Đảm bảo luôn là mảng
            setProductImages(fetchedImages);
            setFilteredProductImages(fetchedImages);
            } catch (error) {
            console.error('Error fetching product images:', error);
            setError('Có lỗi xảy ra khi lấy dữ liệu hình ảnh.');
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

        {/* Error message */}
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
                placeholder="Tìm kiếm hình ảnh sản phẩm..."
                className="border border-gray-300 rounded-xl pl-10 pr-4 py-2 w-60"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            {/* Add button */}
            <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => navigate('/admin/productimage/create')}>
              + Thêm
            </button>
          </div>
        </header>

        {/* Product images management table */}
        <div className="bg-white p-4 rounded-3xl shadow mb-6">
          <h3 className="text-bold text-lg font-semibold mb-4">QUẢN LÝ HÌNH ẢNH SẢN PHẨM</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border text-center">ID</th>
                <th className="p-2 border text-center">Product ID</th>
                <th className="p-2 border text-center">Thumbnail</th>
                <th className="p-2 border text-center">Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {filteredProductImages && filteredProductImages.length > 0 ? ( // Kiểm tra mảng trước khi truy cập
                filteredProductImages.map((productimage, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2 border text-center">{productimage.id}</td>
                    <td className="p-2 border text-center">{productimage.product_id}</td>
                    <td className="p-2 border ">{productimage.thumbnail ? (
                        <div className="flex justify-center items-center">
                      <img src={productimage.thumbnail} alt="Product thumbnail " className="w-30 h-24 object-cover "/></div>
                    ) : 'NULL'} </td>
                    <td className="p-2 border">
                      <div className="flex items-center gap-2 ">
                        <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => handleEdit(productimage.id)}>
                          Sửa
                        </button>
                        <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(productimage.id)}>
                          Xóa
                        </button>
                        <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => handleShow(productimage.id)}>
                          Xem
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-4">Không có hình ảnh nào</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductImage;

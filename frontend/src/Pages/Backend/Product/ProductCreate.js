import React, { useState } from 'react';
import axios from 'axios';

const ProductCreate = () => {
  const [productName, setProductName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [brandId, setBrandId] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', productName);
    formData.append('category_id', categoryId);
    formData.append('brand_id', brandId);
    formData.append('price', price);
    formData.append('description', description);
    if (images) {
      formData.append('images', images);
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/product/store', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200 && response.data.status) {
        setSuccess('Sản phẩm đã được thêm thành công.');
        setError(null);
        // Reset form
        setProductName('');
        setCategoryId('');
        setBrandId('');
        setPrice('');
        setDescription('');
        setImages(null);
      } else {
        throw new Error('Không thể thêm sản phẩm.');
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi thêm sản phẩm.');
      setSuccess(null);
    }
  };

  const handleImageChange = (e) => {
    setImages(e.target.files[0]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center">Thêm sản phẩm mới</h1>

        {error && <div className="bg-red-500 text-white p-4 rounded mb-4">{error}</div>}
        {success && <div className="bg-green-500 text-white p-4 rounded mb-4">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Tên sản phẩm:</label>
            <input 
              type="text" 
              value={productName} 
              onChange={(e) => setProductName(e.target.value)} 
              className="w-full px-3 py-2 border rounded" 
              required 
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Category ID:</label>
            <input 
              type="text" 
              value={categoryId} 
              onChange={(e) => setCategoryId(e.target.value)} 
              className="w-full px-3 py-2 border rounded" 
              required 
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Brand ID:</label>
            <input 
              type="text" 
              value={brandId} 
              onChange={(e) => setBrandId(e.target.value)} 
              className="w-full px-3 py-2 border rounded" 
              required 
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Giá:</label>
            <input 
              type="number" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
              className="w-full px-3 py-2 border rounded" 
              required 
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Mô tả:</label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className="w-full px-3 py-2 border rounded" 
              required 
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Hình ảnh:</label>
            <input 
              type="file" 
              onChange={handleImageChange} 
              className="w-full px-3 py-2 border rounded" 
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
            Thêm sản phẩm
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductCreate;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BrandCreate = () => {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to send form data (including file) in the request
    const formData = new FormData();
    formData.append('name', name);
    formData.append('slug', slug);
    formData.append('image', image);
    formData.append('description', description);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/brand/store', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type for file upload
        },
      });

      if (response.status === 200 && response.data.status) {
        setSuccessMessage('Brand created successfully!');
        setError('');
        navigate('/admin/brand');  // Redirect back to the brand list after successful creation
      } else {
        setError(response.data.message || 'Failed to create brand.');
        setSuccessMessage('');
      }
    } catch (err) {
      setError('An error occurred while creating the brand.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-3xl shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">Tạo Thương Hiệu Mới</h1>

        {/* Success message */}
        {successMessage && (
          <div className="bg-green-500 text-white p-4 rounded mb-4">{successMessage}</div>
        )}

        {/* Error message */}
        {error && (
          <div className="bg-red-500 text-white p-4 rounded mb-4">{error}</div>
        )}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Tên Thương Hiệu</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mt-2"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="slug" className="block text-gray-700">Slug</label>
            <input
              type="text"
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mt-2"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700">Hình ảnh</label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mt-2"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700">Mô tả</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mt-2"
              rows="4"
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300"
            >
              Tạo Thương Hiệu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BrandCreate;

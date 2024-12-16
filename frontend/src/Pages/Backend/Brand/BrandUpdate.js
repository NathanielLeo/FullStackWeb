import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const BrandUpdate = () => {
  const { id } = useParams(); // Get the brand ID from the URL
  const navigate = useNavigate();

  // State to hold brand data
  const [brand, setBrand] = useState({
    name: '',
    slug: '',
    description: '',
    image: null
  });

  // State for success/error messages
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch the brand details when the component mounts
  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/brand/show/${id}`);
        if (response.status === 200 && response.data.status) {
          setBrand(response.data.brand);
        } else {
          throw new Error('Brand not found.');
        }
      } catch (err) {
        setErrorMessage('Có lỗi xảy ra khi tải thông tin thương hiệu.');
      }
    };

    fetchBrand();
  }, [id]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBrand((prevBrand) => ({
      ...prevBrand,
      [name]: value
    }));
  };

  // Handle image change
  const handleImageChange = (e) => {
    setBrand((prevBrand) => ({
      ...prevBrand,
      image: e.target.files[0]
    }));
  };

  // Handle form submission (update brand)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', brand.name);
    formData.append('slug', brand.slug);
    formData.append('description', brand.description);
    if (brand.image) formData.append('image', brand.image);

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/brand/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200 && response.data.status) {
        setSuccessMessage('Cập nhật thương hiệu thành công!');
        setErrorMessage('');
        // Redirect to the brand list after successful update
        setTimeout(() => {
          navigate('/admin/brand');
        }, 1500);
      } else {
        setErrorMessage(response.data.message || 'Cập nhật không thành công.');
      }
    } catch (err) {
      setErrorMessage('Có lỗi xảy ra khi cập nhật thương hiệu.');
    }
  };

  // Conditional rendering to avoid error when brand is not loaded yet
  if (!brand) {
    return <div>Loading...</div>; // Or a loading spinner if you prefer
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6">
        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-500 text-white p-4 rounded mb-4">
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="bg-red-500 text-white p-4 rounded mb-4">
            {errorMessage}
          </div>
        )}

        <header className="bg-white p-4 rounded-3xl shadow mb-6">
          <h1 className="text-2xl font-semibold">Cập nhật Thương Hiệu</h1>
        </header>

        {/* Brand Update Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Tên thương hiệu</label>
            <input
              type="text"
              id="name"
              name="name"
              value={brand.name || ''}  
              onChange={handleChange}
              className="border border-gray-300 rounded-xl pl-4 pr-4 py-2 w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="slug" className="block text-gray-700">Slug</label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={brand.slug || ''}  
              onChange={handleChange}
              className="border border-gray-300 rounded-xl pl-4 pr-4 py-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700">Mô tả</label>
            <textarea
              id="description"
              name="description"
              value={brand.description || ''}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl pl-4 pr-4 py-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700">Hình ảnh</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              className="border border-gray-300 rounded-xl pl-4 pr-4 py-2 w-full"
            />
            {brand.image && <img src={`http://localhost:8000/images/brand/${brand.image}`} alt="Current" className="mt-4 h-32 w-32 object-cover" />}
          </div>

          <div className="mb-4 flex justify-end">
            <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg">
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BrandUpdate;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BannerUpdate = () => {
  const { id } = useParams();  // Get banner ID from URL
  const [banner, setBanner] = useState({
    name: '',
    link: '',
    description: '',
    status: 1,
    position: '',
    sort_order: 1,
  });
  const [existingImage, setExistingImage] = useState(null);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Fetch banner details to edit
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/banner/show/${id}`);
        if (response.status === 200 && response.data.status) {
          setBanner(response.data.banner);
          setExistingImage(response.data.banner.image);  // Assuming 'image' is the existing image URL
          setError(null);
        } else {
          throw new Error('Unable to load banner data.');
        }
      } catch (err) {
        setError('Error loading banner data.');
      }
    };

    fetchBanner();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBanner((prevBanner) => ({ ...prevBanner, [name]: value }));
  };

  // Handle file selection for image upload
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission to update banner
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', banner.name);
    formData.append('link', banner.link);
    formData.append('description', banner.description);
    formData.append('position', banner.position);
    formData.append('sort_order', banner.sort_order);
    formData.append('status', banner.status);

    if (image) {
      formData.append('image', image);  // Append new image if it's selected
    }

    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/banner/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200 && response.data.status) {
        setSuccessMessage('Banner updated successfully.');
        setError(null);
        // Redirect to banner management page after successful update
        setTimeout(() => {
          navigate('/admin/banner');
        }, 1500);
      } else {
        throw new Error('Unable to update banner.');
      }
    } catch (err) {
      setError('Error updating banner.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-xl font-semibold mb-4">Update Banner</h1>

        {error && <div className="bg-red-500 text-white p-4 rounded mb-4">{error}</div>}
        {successMessage && <div className="bg-green-500 text-white p-4 rounded mb-4">{successMessage}</div>}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-gray-700">Banner Name</label>
            <input
              type="text"
              name="name"
              value={banner.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg w-full p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Link</label>
            <textarea
              name="link"
              value={banner.link}
              onChange={handleChange}
              rows="2"
              className="border border-gray-300 rounded-lg w-full p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={banner.description}
              onChange={handleChange}
              rows="4"
              className="border border-gray-300 rounded-lg w-full p-2"
            />
          </div>

          {existingImage && (
            <div className="mb-4">
              <label className="block text-gray-700">Current Image</label>
              <img src={existingImage} alt={banner.name} className="w-32 h-auto" />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700">New Image (Optional)</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="border border-gray-300 rounded-lg w-full p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Status</label>
            <select
              name="status"
              value={banner.status}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg w-full p-2"
            >
              <option value="1">Published</option>
              <option value="0">Unpublished</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Position</label>
            <input
              type="text"
              name="position"
              value={banner.position}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg w-full p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Sort Order</label>
            <input
              type="number"
              name="sort_order"
              value={banner.sort_order}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg w-full p-2"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default BannerUpdate;

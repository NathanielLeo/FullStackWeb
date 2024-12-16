import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const CategoryUpdate = () => {
  const { id } = useParams(); // Get the category ID from the URL
  const [category, setCategory] = useState({
    name: '',
    slug: '',
    description: '',
    parent_id: '',
    sort_order: '',
    image: null, // For handling image upload
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [imagePreview, setImagePreview] = useState(null); // To show the current image preview
  const navigate = useNavigate();

  // Fetch the category details for editing
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/category/show/${id}`);
        if (response.status === 200 && response.data.status) {
          setCategory(response.data.category);
          setImagePreview(`http://localhost:8000/images/category/${response.data.category.image}`);
        } else {
          throw new Error(response.data.message || 'Unable to fetch category.');
        }
      } catch (error) {
        setError('Failed to load category details.');
      }
    };

    fetchCategory();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  // Handle image change (file input)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCategory((prevCategory) => ({
      ...prevCategory,
      image: file,
    }));

    // Preview the image before upload
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission for updating the category
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', category.name);
    formData.append('slug', category.slug);
    formData.append('description', category.description);
    formData.append('parent_id', category.parent_id);
    formData.append('sort_order', category.sort_order);
    formData.append('image', category.image); // If there's a new image

    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/category/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200 && response.data.status) {
        setSuccessMessage('Category updated successfully!');
        setError(null);
        // Redirect to the category list after success
        setTimeout(() => {
          navigate('/admin/category');
        }, 1500);
      } else {
        throw new Error(response.data.message || 'Failed to update category.');
      }
    } catch (error) {
      setError('An error occurred while updating the category.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6">
        {/* Success message */}
        {successMessage && (
          <div className="bg-green-500 text-white p-4 rounded mb-4">{successMessage}</div>
        )}

        {/* Error message */}
        {error && (
          <div className="bg-red-500 text-white p-4 rounded mb-4">{error}</div>
        )}

        <header className="bg-white p-4 rounded-3xl shadow mb-6">
          <h1 className="text-2xl font-semibold">Update Category</h1>
        </header>

        {/* Category Update Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
          <div className="mb-4">
            <label className="block text-gray-700">Category Name</label>
            <input
              type="text"
              name="name"
              value={category.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg w-full p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Slug</label>
            <input
              type="text"
              name="slug"
              value={category.slug}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg w-full p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={category.description}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg w-full p-2"
              rows="4"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Parent ID</label>
            <input
              type="number"
              name="parent_id"
              value={category.parent_id}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg w-full p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Sort Order</label>
            <input
              type="number"
              name="sort_order"
              value={category.sort_order}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg w-full p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Category Image</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="border border-gray-300 rounded-lg w-full p-2"
            />
            {imagePreview && <img src={imagePreview} alt="Image Preview" className="mt-2 h-32 object-cover" />}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Update Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategoryUpdate;

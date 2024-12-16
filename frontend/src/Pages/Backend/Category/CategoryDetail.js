import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CategoryDetail = () => {
  const { id } = useParams(); // Get the category ID from the URL
  const [category, setCategory] = useState(null);
  const [error, setError] = useState(null);

  // Fetch the category data when the component mounts
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/category/show/${id}`);
        if (response.status === 200 && response.data.status) {
          setCategory(response.data.category);
        } else {
          throw new Error('Category not found.');
        }
      } catch (err) {
        setError('There was an error fetching the category details.');
      }
    };

    fetchCategory();
  }, [id]); // Dependency array with `id` to trigger when it changes

  // Render the category details
  if (error) {
    return <div className="bg-red-500 text-white p-4 rounded mb-4">{error}</div>;
  }

  if (!category) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6">
        <header className="bg-white p-4 rounded-3xl shadow mb-6">
          <h1 className="text-2xl font-semibold">Category Details</h1>
        </header>

        {/* Category Detail */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold mb-4">Category Information</h3>
          
          <div className="mb-4">
            <label className="block text-gray-700">Category Name</label>
            <p>{category.name}</p>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Slug</label>
            <p>{category.slug}</p>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <p>{category.description}</p>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Parent ID</label>
            <p>{category.parent_id}</p>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Sort Order</label>
            <p>{category.sort_order}</p>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Category Image</label>
            <img
              src={`http://localhost:8000/images/category/${category.image}`}
              alt={category.name}
              className="h-32 w-32 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;

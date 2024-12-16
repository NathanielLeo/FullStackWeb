import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const MenuUpdate = () => {
  const { id } = useParams(); // Extract the menu ID from the URL parameters
  const navigate = useNavigate();

  const [menu, setMenu] = useState({
    name: '',
    link: '',
    type: '',
    table_id: '',
    status: 1,
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch the menu data to update
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/menu/show/${id}`);
        if (response.status === 200) {
          setMenu(response.data.menu); // Set the fetched menu data to state
          setError(null);
        } else {
          setError('Lỗi khi tải dữ liệu menu.');
        }
      } catch (err) {
        setError('Có lỗi xảy ra khi lấy dữ liệu menu.');
      }
    };

    fetchMenu();
  }, [id]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenu((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/menu/update${id}`, menu);
      if (response.status === 200) {
        setSuccessMessage('Cập nhật menu thành công.');
        setError(null);
        // Redirect after successful update
        setTimeout(() => {
          navigate('/admin/menu');
        }, 2000);
      } else {
        setError('Lỗi khi cập nhật menu.');
        setSuccessMessage('');
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi cập nhật menu.');
      setSuccessMessage('');
    }
  };

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

        <header className="bg-white p-4 rounded-3xl shadow mb-6 flex justify-between items-center">
          <h3 className="text-xl font-semibold">Cập nhật Menu</h3>
        </header>

        {/* Update Menu Form */}
        <div className="bg-white p-6 rounded-3xl shadow">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-lg font-medium">Tên Menu:</label>
              <input
                type="text"
                name="name"
                className="border border-gray-300 rounded-lg w-full p-2 mt-2"
                value={menu.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="text-lg font-medium">Link:</label>
              <input
                type="text"
                name="link"
                className="border border-gray-300 rounded-lg w-full p-2 mt-2"
                value={menu.link}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="text-lg font-medium">Loại:</label>
              <input
                type="text"
                name="type"
                className="border border-gray-300 rounded-lg w-full p-2 mt-2"
                value={menu.type}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="text-lg font-medium">Table ID:</label>
              <input
                type="text"
                name="table_id"
                className="border border-gray-300 rounded-lg w-full p-2 mt-2"
                value={menu.table_id}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="text-lg font-medium">Trạng thái:</label>
              <select
                name="status"
                className="border border-gray-300 rounded-lg w-full p-2 mt-2"
                value={menu.status}
                onChange={handleChange}
              >
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300"
              >
                Cập nhật Menu
              </button>
            </div>
          </form>
        </div>

        {/* Back to list */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/admin/menu')} // Navigate back to the menu list page
            className="bg-gray-500 text-white px-6 py-3 rounded-full hover:bg-gray-600 transition duration-300"
          >
            Quay lại danh sách Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuUpdate;

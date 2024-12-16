import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ContactCreate = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState(1); // 1 for active, 0 for inactive
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // For navigation

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be sent to the API
    const contactData = {
      name,
      email,
      phone,
      title,
      content,
      status
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/contact/create', contactData);

      if (response.status === 200 && response.data.status) {
        setSuccessMessage('Contact created successfully.');
        setError(null);
        // Reset the form after successful submission
        setName('');
        setEmail('');
        setPhone('');
        setTitle('');
        setContent('');
        setStatus(1);
        // Redirect to the contact list page
        setTimeout(() => {
          navigate('/admin/contact');
        }, 2000);
      } else {
        setError('Error creating contact.');
      }
    } catch (err) {
      setError('There was an error while creating the contact.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-3xl shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">Tạo Contact Mới</h1>

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

        {/* Contact creation form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-lg font-medium">Tên:</label>
            <input
              type="text"
              className="border border-gray-300 rounded-lg w-full p-2 mt-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-lg font-medium">Email:</label>
            <input
              type="email"
              className="border border-gray-300 rounded-lg w-full p-2 mt-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-lg font-medium">Số điện thoại:</label>
            <input
              type="text"
              className="border border-gray-300 rounded-lg w-full p-2 mt-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-lg font-medium">Tiêu đề:</label>
            <input
              type="text"
              className="border border-gray-300 rounded-lg w-full p-2 mt-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-lg font-medium">Nội dung:</label>
            <textarea
              className="border border-gray-300 rounded-lg w-full p-2 mt-2"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-lg font-medium">Trạng thái:</label>
            <select
              className="border border-gray-300 rounded-lg w-full p-2 mt-2"
              value={status}
              onChange={(e) => setStatus(Number(e.target.value))}
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
              Tạo Contact
            </button>
          </div>
        </form>

        {/* Back to List Button */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/admin/contact')} // Navigate back to the contact list page
            className="bg-gray-500 text-white px-6 py-3 rounded-full hover:bg-gray-600 transition duration-300"
          >
            Quay lại danh sách Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactCreate;

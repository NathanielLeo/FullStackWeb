import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ContactUpdate = () => {
  const { id } = useParams(); // Get the contact ID from the URL
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    title: '',
    content: '',
    replay_id: '',
    status: '',
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate(); // For navigation

  // Fetch contact details when the component mounts
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/contact/show/${id}`);
        if (response.status === 200 && response.data.status) {
          setContact(response.data.contact); // Set the fetched contact details
          setError(null);
        } else {
          setError('Không tìm thấy contact này.');
        }
      } catch (err) {
        setError('Có lỗi xảy ra khi tải dữ liệu.');
      }
    };

    fetchContact();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/contact/update/${id}`, contact);

      if (response.status === 200 && response.data.status) {
        setSuccessMessage('Cập nhật contact thành công.');
        setError(null);
        setTimeout(() => {
          navigate('/admin/contact'); // Redirect to contact list page after success
        }, 1500);
      } else {
        setError('Có lỗi xảy ra khi cập nhật contact.');
        setSuccessMessage(null);
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi cập nhật contact.');
      setSuccessMessage(null);
    }
  };

  if (error) {
    return <div className="bg-red-500 text-white p-4 rounded mb-4">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-3xl shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">Cập Nhật Contact</h1>

        {/* Success message */}
        {successMessage && (
          <div className="bg-green-500 text-white p-4 rounded mb-4">
            {successMessage}
          </div>
        )}

        {/* Update Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Tên</label>
            <input
              type="text"
              name="name"
              value={contact.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={contact.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Số điện thoại</label>
            <input
              type="text"
              name="phone"
              value={contact.phone}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Tiêu đề</label>
            <input
              type="text"
              name="title"
              value={contact.title}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Nội dung</label>
            <textarea
              name="content"
              value={contact.content}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Replay ID</label>
            <input
              type="text"
              name="replay_id"
              value={contact.replay_id}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Trạng thái</label>
            <select
              name="status"
              value={contact.status}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl p-2 w-full"
            >
              <option value="">Chọn trạng thái</option>
              <option value="active">Hoạt động</option>
              <option value="inactive">Không hoạt động</option>
            </select>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300"
            >
              Cập Nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUpdate;

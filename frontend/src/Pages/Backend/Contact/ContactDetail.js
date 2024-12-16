import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ContactDetail = () => {
  const { id } = useParams(); // Get the contact ID from the URL
  const [contact, setContact] = useState(null); // State to store the contact data
  const [error, setError] = useState(null); // State for error handling
  const navigate = useNavigate(); // For navigation

  // Fetch contact details when the component mounts
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/contact/show/${id}`);
        
        if (response.status === 200 && response.data.status) {
          setContact(response.data.contact); // Set the fetched contact
          setError(null);
        } else {
          setError('Không tìm thấy contact này.');
        }
      } catch (err) {
        setError('Có lỗi xảy ra khi tải dữ liệu.');
      }
    };

    fetchContact();
  }, [id]); // Re-run if the ID changes

  // If there is an error, show the error message
  if (error) {
    return <div className="bg-red-500 text-white p-4 rounded">{error}</div>;
  }

  // If the contact is still loading, show a loading message
  if (!contact) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-3xl shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">Chi Tiết Contact</h1>

        {/* Displaying Contact Details */}
        <div className="mb-4">
          <strong className="text-lg">Tên:</strong> <span>{contact.name}</span>
        </div>
        <div className="mb-4">
          <strong className="text-lg">Email:</strong> <span>{contact.email}</span>
        </div>
        <div className="mb-4">
          <strong className="text-lg">Số điện thoại:</strong> <span>{contact.phone}</span>
        </div>
        <div className="mb-4">
          <strong className="text-lg">Tiêu đề:</strong> <span>{contact.title}</span>
        </div>
        <div className="mb-4">
          <strong className="text-lg">Nội dung:</strong> <span>{contact.content}</span>
        </div>
        <div className="mb-4">
          <strong className="text-lg">Replay ID:</strong> <span>{contact.replay_id}</span>
        </div>
        <div className="mb-4">
          <strong className="text-lg">Trạng thái:</strong> <span>{contact.status === 1 ? 'Active' : 'Inactive'}</span>
        </div>

        {/* Back to List Button */}
        <div className="text-center">
          <button
            onClick={() => navigate('/admin/contact')} // Navigate back to the contact list page
            className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300"
          >
            Quay lại danh sách Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactDetail;

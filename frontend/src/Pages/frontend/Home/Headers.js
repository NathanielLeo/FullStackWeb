import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import UserSignIn from '../SignIn';
import LayoutFrontend from '../../../Layouts/frontend';
import CategoryList from '../Category';
import { useNavigate } from 'react-router-dom';

export default function Header({openCart }) {
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  // Fetch categories from the API when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/category'); // Cập nhật URL đúng với API của bạn
        setCategories(response.data.categories); // Giả định API trả về { categories: [...] }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleClick = () => {
    navigate('/category'); // Thay đổi URL nếu cần
  };
  return (
    <>
      {/* Top Hotline Bar */}
      <div className="flex justify-between items-center px-4 py-2 bg-gray-100 text-gray-700">
        <div className="text-sm">
          <p className="font-bold">HOTLINE: </p>     
          <p> 0902 633 0902 | 0394 160 360</p>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-1 cursor-pointer">
            <Link to="/signin" element={<UserSignIn />} className="flex items-center space-x-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A9.9 9.9 0 0112 15.9c2.624 0 5.032.984 6.879 2.604M12 12a4.8 4.8 0 100-9.6 4.8 4.8 0 000 9.6z" />
              </svg>
              <span>Tài khoản</span>
            </Link>
          </div>
          <header className="flex items-center space-x-1 cursor-pointer">
          <button onClick={openCart} className="flex items-center space-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l1.4-8H6.6l-.6-3H3m3 10v6m4-6v6m4-6v6M5 19a1 1 0 11-2 0 1 1 0z"
              />
            </svg>
            <span>Giỏ hàng</span>
          </button>
        </header>
          <div className="flex items-center space-x-1 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 21h6a2 2 0 002-2v-7H7v7a2 2 0 002 2zM12 3v12m-3-6h6" />
            </svg>
            <span>Thanh toán</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white py-1 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/" element={<LayoutFrontend />} className="flex items-center">
            {/* Logo */}
            <img src="https://mwc.com.vn/Assets/App/images/logo.png" alt="Shop Logo" className="w-28 h-32 object-contain" />
          </Link>
          {/* Location, Search, and Categories */}
          <div className="flex items-center space-x-4">
            {/* Location */}
            <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-md">
              <span className="text-gray-500">Your Location:</span>
              <span className="font-semibold">Vietnam</span>
            </div> 

            {/* Search bar */}
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Tìm kiếm ..."
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="Search for products"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" aria-label="Search">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.9 14.32a7 7 0 111.414-1.414l3.707 3.707a1 1 0 01-1.414 1.414l-3.707-3.707zM7 13a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          {/* Categories, Sign In, Cart */}
          <div className="flex items-center space-x-6">
            <div className="relative">
                <button
                  className="bg-purple-600 text-white px-4 py-2 rounded-md focus:outline-none flex items-center space-x-2"
                  onClick={toggleCategoryDropdown}
                  aria-haspopup="true"
                  aria-expanded={isCategoryDropdownOpen}
                >
                  <span>DANH MỤC SẢN PHẨM</span>
                  <svg
                    
                    className="h-5 w-5 ml-2 transition-transform duration-300"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    style={{
                      transform: isCategoryDropdownOpen ? 'rotate(90deg)' : 'rotate(0deg)'
                    }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.292 7.292a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {/* Dropdown content */}
                <div
                  className={`absolute mt-2 w-48 bg-white border border-gray-300 py-2 px-4 rounded-md shadow-lg z-50 ${
                    isCategoryDropdownOpen ? 'block' : 'hidden'
                  }`}
                >
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <a
                        key={category.id}
                        href="#"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        {/* Hình ảnh nhỏ bên trái */}
                        <img
                          src={category.image_url} 
                          alt={category.name}
                          className="w-6 h-6 rounded-full mr-3"
                          onClick={handleClick}
                        />
                        <span>{category.name}</span>
                      </a>
                    ))
                  ) : (
                    <p className="text-gray-500">Loading...</p>
                  )}
                </div>
              </div>

            {/* Cart Icon */}
            <div className="relative cursor-pointer" aria-label="Shopping Cart">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6" />
              </svg>
              {/* Notification Badge */}
              <span className="absolute top-0 right-0 inline-block w-4 h-4 bg-red-600 text-white text-xs font-semibold text-center rounded-full">1</span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

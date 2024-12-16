import React, { useState } from 'react';
import { ThemeProvider } from "@material-tailwind/react";
import { Link, Outlet } from 'react-router-dom';
import Footer from "../../Pages/frontend/Home/Footer";
import Headers from "../../Pages/frontend/Home/Headers";
import CartList from '../../Pages/frontend/Cart/Cart';

const LayoutFrontend = () => {
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  return (
    <ThemeProvider>
      <div className="w-full bg-white border-t border-gray-300">
        {/* Header Section */}
        <Headers 
          toggleCategoryDropdown={toggleCategoryDropdown} 
          openCart={() => setIsCartOpen(true)} 
        />

        {/* Navigation Links */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between space-x-8">
            <Link to="/" className="hover:text-purple-600">TRANG CHỦ</Link>
            <Link to="/product" className="hover:text-purple-600">TẤT CẢ SẢN PHẨM</Link>
            <Link to="/category" className="text-blue-500 hover:underline">CATEGORY</Link>
            <Link to="/brand" className="text-blue-500 hover:underline">THƯƠNG HIỆU</Link>
            <Link to="/post" className="text-blue-500 hover:underline">BÀI VIẾT</Link>
            <Link to="/config" className="text-blue-500 hover:underline">LIÊN HỆ</Link>  
          </div>
        </nav>

        {/* Main Content */}
        <main>
          <Outlet />
        </main>

        {/* Footer Section */}
        <Footer />

        {/* Cart Component */}
        <CartList 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          cartItems={cartItems} 
        />
      </div>
    </ThemeProvider>
  );
};

export default LayoutFrontend;
import React, {useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { RiAdminLine } from "react-icons/ri";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { FcBarChart,FcPicture, FcShop, FcSalesPerformance, FcFaq, FcPortraitMode, FcTodoList , FcStackOfPhotos , FcIdea , FcPhone, FcSettings, FcInTransit, FcSelfie, FcTimeline, } from "react-icons/fc";
import { GiVerticalBanner } from "react-icons/gi";
import { useAuth } from '../../Pages/Backend/Auth/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSubMenuVisible, setSubMenuVisible] = useState(false);
  const { isAuthenticated } = useAuth();
  
  // Toggle sub-menu visibility
  const toggleSubMenu = () => {
    setSubMenuVisible((prev) => !prev);
  };

  // Check authentication status and redirect if necessary
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login'); // Redirect to login page if not authenticated
    }
  }, [isAuthenticated, navigate]);

  // Display a loading state while waiting for the auth status
  if (isAuthenticated === undefined) {
    return <div>Loading...</div>; // Or use any loading spinner
  }

  // If not authenticated, return nothing or handle it as you prefer
  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <div className="h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/6 bg-gray-800 text-white p-4 rounded-r-3xl">
      
        <h2 className="text-lg font-semibold mb-4 flex items-center" > <RiAdminLine className="m-2 text-6xl" />HỆ THỐNG QUẢN TRỊ</h2>
        <ul>
              <li className="py-2 rounded-2xl hover:bg-gray-700"> 
                <div
                  className="hover:text-gray-300 block p-2 cursor-pointer flex items-center"
                  onClick={toggleSubMenu}KeyboardArrowDownIcon
                >
                  <FcBarChart className="m-2 text-4xl" />
                  <span> Quản lý sản phẩm</span>
                  <span className="ml-auto">{isSubMenuVisible ? <KeyboardArrowDownIcon /> : <KeyboardArrowLeftIcon />}</span>
                </div>
                
                      {isSubMenuVisible && (
                  <ul className={`transition-transform transition-opacity duration-500 ease-in-out transform-gpu origin-top ${isSubMenuVisible ? 'scale-y-100 opacity-100 max-h-screen' : 'scale-y-0 opacity-0 max-h-0'}`}>
                    <li className="pl-6 py-1 hover:bg-gray-600">
                      <Link to="/admin/product" className="hover:text-gray-300 block p-2 cursor-pointer flex items-center"><FcFaq   className="m-2 text-3xl"/>Product</Link>
                    </li>
                    <li className="pl-6  py-1 hover:bg-gray-600">
                      <Link to="/admin/productsale" className="hover:text-gray-300 block p-2 cursor-pointer flex items-center"><FcSalesPerformance   className="m-2 text-3xl"/>ProductSale</Link>
                    </li>
                    <li className="pl-6  py-1 hover:bg-gray-600">
                      <Link to="/admin/productstore" className="hover:text-gray-300 block p-2 cursor-pointer flex items-center"><FcShop   className="m-2 text-3xl"/>ProductStore</Link>
                    </li>
                    <li className="pl-6  py-1 hover:bg-gray-600">
                      <Link to="/admin/productimage" className="hover:text-gray-300 block p-2 cursor-pointer flex items-center"><FcPicture  className="m-2 text-3xl"/>ProductImage</Link>
                    </li>
                  </ul>
                )}
              </li>
              {/* <li className="py-2 rounded-2xl hover:bg-gray-700"> 
                <div
                  className="hover:text-gray-300 block p-2 cursor-pointer flex items-center"
                  onClick={toggleSubMenu}KeyboardArrowDownIcon
                >
                  <span>Quản lí Giỏ hàng</span>
                  <span className="ml-auto">{isSubMenuVisible ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</span>
                </div>
                
                      {isSubMenuVisible && (
                  <ul className={`transition-transform transition-opacity duration-500 ease-in-out transform-gpu origin-top ${isSubMenuVisible ? 'scale-y-100 opacity-100 max-h-screen' : 'scale-y-0 opacity-0 max-h-0'}`}>
                    <li className="pl-6 py-1 hover:bg-gray-600">
                      <Link to="/admin/order" className="hover:text-gray-300 block p-2 cursor-pointer">Order</Link>
                    </li>
                    <li className="pl-6  py-1 hover:bg-gray-600">
                      <Link to="/admin/orderdetail" className="hover:text-gray-300 block p-2 cursor-pointer">Orderdetail</Link>
                    </li>
                  </ul>
                )}
              </li> */}
          <li className="py-2 rounded-2xl hover:bg-gray-700 flex items-center">
            <FcInTransit   className="m-2 text-3xl"/>
            <Link to="/admin/order" className="hover:text-gray-300 block p-2 cursor-pointer">Order</Link>
          </li>
          <li className="py-2 rounded-2xl hover:bg-gray-700 flex items-center">
            <GiVerticalBanner   className="m-2 text-3xl text-red-600"/>
            <Link to="/admin/banner" className="hover:text-gray-300 block p-2 cursor-pointer">Banner</Link>
          </li>
          <li className="py-2 rounded-2xl hover:bg-gray-700 flex items-center">
            <FcTimeline   className="m-2 text-3xl"/>
            <Link to="/admin/category" className="hover:text-gray-300 block p-2 cursor-pointer">Category</Link>
          </li>
          <li className="py-2 rounded-2xl hover:bg-gray-700 flex items-center">
            <FcSelfie   className="m-2 text-3xl"/>
            <Link to="/admin/brand" className="hover:text-gray-300 block p-2 cursor-pointer">Brand</Link>
          </li>
          <li className="py-2 rounded-2xl hover:bg-gray-700 flex items-center">
            <FcSettings  className="m-2 text-3xl"/>
            <Link to="/admin/config" className="hover:text-gray-300 block p-2 cursor-pointer">Config</Link>
          </li>
          <li className="py-2 rounded-2xl hover:bg-gray-700 flex items-center">
            <FcPhone   className="m-2 text-3xl"/>
            <Link to="/admin/contact" className="hover:text-gray-300 block p-2 cursor-pointer">Contact</Link>
          </li>
          <li className="py-2 rounded-2xl hover:bg-gray-700 flex items-center">
            <FcTodoList   className="m-2 text-3xl"/>
            <Link to="/admin/menu" className="hover:text-gray-300 block p-2 cursor-pointer">Menu</Link>
          </li>
          <li className="py-2 rounded-2xl hover:bg-gray-700 flex items-center">
            <FcStackOfPhotos   className="m-2 text-3xl"/>
            <Link to="/admin/post" className="hover:text-gray-300 block p-2 cursor-pointer">Post</Link>
          </li>
          <li className="py-2 rounded-2xl hover:bg-gray-700 flex items-center">
            <FcIdea    className="m-2 text-3xl"/>
            <Link to="/admin/topic" className="hover:text-gray-300 block p-2 cursor-pointer">Topic</Link>
          </li>
          <li className="py-2 rounded-2xl hover:bg-gray-700 flex items-center">
            <FcPortraitMode  className="m-2 text-3xl"/>
            <Link to="/admin/user" className="hover:text-gray-300 block p-2 cursor-pointer">User</Link>
          </li>
          {/* <li className="py-2 rounded-2xl hover:bg-gray-700">
            <Link className="hover:text-gray-300 block p-2 cursor-pointer">Nhập sản phẩm</Link>
          </li> */}
        </ul>
      </aside>

      {/* Main content area */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

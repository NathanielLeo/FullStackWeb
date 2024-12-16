
import React from 'react'
import BannerList from '../Pages/Backend/Banner';
import Dashboard from '../Pages/Backend/Dashboard';
import ProductList from '../Pages/Backend/Product/ProductList';
import ProductCreate from '../Pages/Backend/Product/ProductCreate';
import BannerCreate from '../Pages/Backend/Banner/BannerCreate';
import CategoryList from '../Pages/Backend/Category';
import CategoryCreate from '../Pages/Backend/Category/CategoryCreate';
import BrandList from '../Pages/Backend/Brand';
import ProductSale from '../Pages/Backend/Product/ProductSale';
import ProductStore from '../Pages/Backend/Product/ProductStore';
import ProductSaleCreate from '../Pages/Backend/Product/ProductSaleCreate';
import ProductImage from '../Pages/Backend/Product/ProductImage';
import Config from '../Pages/Backend/Config';
import Contact from '../Pages/Backend/Contact';
import Order from '../Pages/Backend/Order';
import Menu from '../Pages/Backend/Menu';
import Post from '../Pages/Backend/Post';
import Topic from '../Pages/Backend/Topic';
import User from '../Pages/Backend/User';
import ProductDetail from '../Pages/Backend/Product/ProductDetail';
import ProductUpdate from '../Pages/Backend/Product/ProductUpdate';
import ProductSaleDetail from '../Pages/Backend/Product/ProductSaleDetail';
import ProductStoreDetail from '../Pages/Backend/Product/ProductStoreDetail';
import ProductImageDetail from '../Pages/Backend/Product/ProductImageDetail';
import ProductSaleUpdate from '../Pages/Backend/Product/ProductSaleUpdate';
import Login from '../Pages/Backend/Auth';
import { Navigate } from 'react-router-dom';
import Register from '../Pages/Backend/Auth/Register';
import ForgetPassword from '../Pages/Backend/Auth/ForgetPassword';
import ProductStoreUpdate from '../Pages/Backend/Product/ProductStoreUpdate';
import OrderDetail from '../Pages/Backend/Order/OrderDetail';
import BannerDetail from '../Pages/Backend/Banner/BannerDetail';
import BannerEdit from '../Pages/Backend/Banner/BannerEdit';
import CategoryUpdate from '../Pages/Backend/Category/CategoryUpdate';
import CategoryDetail from '../Pages/Backend/Category/CategoryDetail';
import BrandUpdate from '../Pages/Backend/Brand/BrandUpdate';
import BrandDetail from '../Pages/Backend/Brand/Brandetail';
import BrandCreate from '../Pages/Backend/Brand/BrandCreate';
import ConfigUpdate from '../Pages/Backend/Config/ConfigUpdate';
import ConfigCreate from '../Pages/Backend/Config/ConfigCreate';
import ConfigDetail from '../Pages/Backend/Config/ConfigDetail';
import ContactUpdate from '../Pages/Backend/Contact/ContactUpdate';
import ContactDetail from '../Pages/Backend/Contact/ContactDetail';
import ContactCreate from '../Pages/Backend/Contact/ContactCreate';
import MenuUpdate from '../Pages/Backend/Menu/MenuUpdate';
import MenuDetail from '../Pages/Backend/Menu/MenuDetail';
import MenuCreate from '../Pages/Backend/Menu/MenuCreate';
import PostUpdate from '../Pages/Backend/Post/PostUpdate';
import PostDetail from '../Pages/Backend/Post/PostDetail';
import PostCreate from '../Pages/Backend/Post/PostCreate';
import TopicUpdate from '../Pages/Backend/Topic/TopicUpdate';
import TopicDetail from '../Pages/Backend/Topic/TopicDetail';
import TopicCreate from '../Pages/Backend/Topic/TopicCreate';
import UserUpdate from '../Pages/Backend/User/UserUpdate';
import UserDetail from '../Pages/Backend/User/UserDetail';
import UserCreate from '../Pages/Backend/User/UserCreate';

// import OrderDetail from '../Pages/Backend/Order/OrderDetail';
// const ProtectedRoute = ({ element, isAuthenticated }) => {
//   return isAuthenticated ? element : <Navigate to="/admin/login" />;
// };

// Dữ liệu ví dụ về xác thực (sẽ cần thay đổi theo ứng dụng thực tế)
// const isAuthenticated = true; // Giả sử người dùng đã đăng nhập
const RouterBackend = [
  { path: "/admin/", element: <Dashboard /> },
    
  { path: "/admin/banner", element: <BannerList /> },
  { path: "/admin/banner/create", element: <BannerCreate /> },
  { path: "/admin/banner/show/:id", element: <BannerDetail /> },
  { path: "/admin/banner/update/:id", element: <BannerEdit /> },


  { path: "/admin/category", element: <CategoryList /> },
  { path: "/admin/category/store", element: <CategoryCreate /> },
  { path: "/admin/category/show/:id", element: <CategoryDetail /> },
  { path: "/admin/category/update/:id", element: <CategoryUpdate /> },

  { path: "/admin/brand", element: <BrandList /> },
  { path: "/admin/brand/store", element: <BrandCreate /> },
  { path: "/admin/brand/show/:id", element: <BrandDetail /> },
  { path: "/admin/brand/update/:id", element: <BrandUpdate /> },

  { path: "/admin/config", element: <Config /> },
  { path: "/admin/config/store", element: <ConfigCreate /> },
  { path: "/admin/config/show/:id", element: <ConfigDetail /> },
  { path: "/admin/config/update/:id", element: <ConfigUpdate /> },

  { path: "/admin/contact", element: <Contact /> },
  { path: "/admin/contact/store", element: <ContactCreate /> },
  { path: "/admin/contact/show/:id", element: <ContactDetail /> },
  { path: "/admin/contact/update/:id", element: <ContactUpdate /> },

  { path: "/admin/order", element: <Order /> },
  { path: "/admin/order/show/:id", element: <OrderDetail /> },

  { path: "/admin/product", element: <ProductList /> },
  { path: "/admin/product/show/:id", element: <ProductDetail /> },
  { path: "/admin/product/create", element: <ProductCreate /> },
  { path: "/admin/product/update/:id", element: <ProductUpdate /> },

  { path: "/admin/productsale", element: <ProductSale /> },
  { path: "/admin/productsale/show/:id", element: <ProductSaleDetail /> },
  { path: "/admin/productsale/create", element: <ProductSaleCreate /> },
  { path: "/admin/productsale/update/:id", element: <ProductSaleUpdate /> },

  { path: "/admin/productstore", element: <ProductStore /> },
  { path: "/admin/productstore/show/:id", element: <ProductStoreDetail /> },
  { path: "/admin/productstore/update/:id", element: <ProductStoreUpdate /> },

  { path: "/admin/productimage", element: <ProductImage /> },
  { path: "/admin/productimage/show/:id", element: <ProductImageDetail /> },

  { path: "/admin/menu", element: <Menu /> },
  { path: "/admin/menu/store", element: <MenuCreate /> },
  { path: "/admin/menu/show/:id", element: <MenuDetail /> },
  { path: "/admin/menu/update/:id", element: <MenuUpdate /> },

  { path: "/admin/post", element: <Post /> },
  { path: "/admin/post/store", element: <PostCreate /> },
  { path: "/admin/post/show/:id", element: <PostDetail /> },
  { path: "/admin/post/update/:id", element: <PostUpdate /> },

  { path: "/admin/topic", element: <Topic /> },
  { path: "/admin/topic/store", element: <TopicCreate /> },
  { path: "/admin/topic/show/:id", element: <TopicDetail /> },
  { path: "/admin/topic/update/:id", element: <TopicUpdate /> },

  { path: "/admin/user", element: <User /> },
  { path: "/admin/user/store", element: <UserCreate /> },
  { path: "/admin/user/show/:id", element: <UserDetail /> },
  { path: "/admin/user/update/:id", element: <UserUpdate /> },

  { path: "/admin/login", element: <Login /> },
  { path: "/admin/register", element: <Register /> },
  { path: "/admin/forget", element: <ForgetPassword /> },
];

export default RouterBackend

import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import UserProductSale from '../Product/ProductSale';
import Product from '../Product';
import ProductStore from '../Product/ProductStore';
import Post from '../Post/Post';
import BannerList from '../banner';
import CategoryList from '../Category';


export const Home = () => {
  const location = useLocation();
  const isMainPage = location.pathname === '/'; 

  return (
    <div>
      {isMainPage && (
        <>
          <BannerList />
          <UserProductSale/>
          <Product />
          <ProductStore />
          <Post />
        </>
      )}
      <Outlet />
    </div>
  );
}

import React from 'react';
import UserSignIn from '../Pages/frontend/SignIn';
import UserProductSale from '../Pages/frontend/Product/ProductSale';
import ConfigList from '../Pages/frontend/Config';
import Post from '../Pages/frontend/Post/Post';
import PostPage from '../Pages/frontend/Post/PostPage';
import ProductStore from '../Pages/frontend/Product/ProductStore';
import ProductDetail from '../Pages/frontend/Product/ProductDetail';
import CartList from '../Pages/frontend/Cart/Cart';
import { Home } from '../Pages/frontend/Home';
import ProductPage from '../Pages/frontend/Product/ProductPage';
import CategoryList from '../Pages/frontend/Category';
import BannerList from '../Pages/frontend/banner';
import BrandDetail from '../Pages/frontend/Brand';

const Routerfrontend = [
    { 
        path: "/", 
        element: <Home />, 
        children: [
            { path: "banner", element: < BannerList/> },
            { path: "product", element: <ProductPage /> },
            { path: "product/:id", element: <ProductDetail /> },
            { path: "productsale", element: <UserProductSale /> },
            { path: "productsale/:id", element: <ProductDetail /> },
            { path: "productstore", element: <ProductStore /> },
            { path: "productstore/:id", element: <ProductDetail /> },
            { path: "category", element: <CategoryList /> },
            { path: "signin", element: <UserSignIn /> },
            { path: "brand", element: <BrandDetail/> },
            { path: "config", element: <ConfigList /> },
            { path: "post", element: <PostPage /> },
            { path: "post/:id", element: <Post/> },
            { path: "order", element: <CartList /> },
        ]
    },
];

export default Routerfrontend;

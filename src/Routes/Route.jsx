import React from 'react';
import { createBrowserRouter } from 'react-router';
import MainLayout from '../Layouts/MainLayout';
import Home from '../Pages/Home';
import Products from '../Pages/Products';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import ProductDetails from '../Pages/ProductDetails';
import AddProduct from '../Pages/AddProduct';

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
           {
            index: true,
            Component: Home,
            loader: ()=> fetch("https://app-orbit-server-zeta.vercel.app/products")
           },
           {
            path: "/products",
            Component: Products
           },
           {
            path: "/add-product",
            Component: AddProduct
           },
           {
            path: "/products/:id",
            Component: ProductDetails,
            loader: ({params}) => fetch(`https://app-orbit-server-zeta.vercel.app/products/${params.id}`)
           },
           {
            path: "/login",
            Component: Login
           },
           {
            path: "/register",
            Component: Register
           }
        ]
    },
]);

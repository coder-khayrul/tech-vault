import React from 'react';
import { createBrowserRouter } from 'react-router';
import MainLayout from '../Layouts/MainLayout';
import Home from '../Pages/Home';
import Products from '../Pages/Products';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import ProductDetails from '../Pages/ProductDetails';
import AddProduct from '../Pages/AddProduct';
import PrivateRoute from './PrivateRoute';
import { Dashboard } from '../Layouts/Dashboard';
import MyProfile from '../Pages/Dashboard/MyProfile';
import MyProducts from '../Pages/Dashboard/MyProducts';
import OverView from '../Pages/Dashboard/OverView';
import UpdateProduct from '../Pages/Dashboard/UpdateProduct';

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
            element: <PrivateRoute><AddProduct></AddProduct></PrivateRoute>
           },
           {
            path: "/products/:id",
            element: <PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>,
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
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: "/dashboard/overview",
                index: true,
                Component: OverView,
            },
            {
                path: "/dashboard/my-products",
                element: <PrivateRoute><MyProducts></MyProducts></PrivateRoute>
            },
            {
                path: "/dashboard/my-products/update/:id",
                element:<PrivateRoute><UpdateProduct></UpdateProduct></PrivateRoute>,
                loader: ({params}) => fetch(`https://app-orbit-server-zeta.vercel.app/products/${params.id}`)
            },
            {
                path: "/dashboard/my-profile",
                element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>
            },
            {
                path: "/dashboard/add-product",
                element: <PrivateRoute><AddProduct></AddProduct></PrivateRoute>
            }

        ]
    }
]);

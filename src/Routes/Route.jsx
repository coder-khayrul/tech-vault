import React from 'react';
import { createBrowserRouter } from 'react-router';
import MainLayout from '../Layouts/MainLayout';
import Home from '../Pages/Home';
import Products from '../Pages/Products';
import Login from '../Pages/Login';
import Register from '../Pages/Register';

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
           {
            index: true,
            Component: Home
           },
           {
            path: "/products",
            Component: Products
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

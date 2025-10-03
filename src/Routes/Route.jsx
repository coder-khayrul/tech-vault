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
import Payment from '../Pages/Dashboard/Payment/Payment';
import Unauthorized from '../Pages/Unauthorized';
import Statistics from '../Pages/Dashboard/Admin/Statistics';
import ManageUsers from '../Pages/Dashboard/Admin/ManageUsers';
import ManageCoupons from '../Pages/Dashboard/Admin/ManageCoupons';

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home,
                loader: () => fetch("https://app-orbit-server-zeta.vercel.app/products")
            },
            {
                path: "/unauthorized",
                Component: Unauthorized
            },
            {
                path: "/products",
                Component: Products
            },
            {
                path: "/add-product",
                element: <PrivateRoute allowedRoles={["user", "moderator", "admin"]}><AddProduct></AddProduct></PrivateRoute>
            },
            {
                path: "/products/:id",
                element: <PrivateRoute allowedRoles={["user", "moderator", "admin"]}><ProductDetails></ProductDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`https://app-orbit-server-zeta.vercel.app/products/${params.id}`)
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
        element: <PrivateRoute allowedRoles={["user", "moderator", "admin"]}><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: "/dashboard/overview",
                index: true,
                element: <PrivateRoute allowedRoles={["user", "moderator", "admin"]}><OverView></OverView></PrivateRoute>,
            },
            {
                path: "/dashboard/my-products/update/:id",
                element: <PrivateRoute allowedRoles={["user", "moderator", "admin"]}><UpdateProduct></UpdateProduct></PrivateRoute>,
                loader: ({ params }) => fetch(`https://app-orbit-server-zeta.vercel.app/products/${params.id}`)
            },
            {
                path: "/dashboard/my-profile",
                element: <PrivateRoute allowedRoles={["user", "moderator", "admin"]}><MyProfile></MyProfile></PrivateRoute>
            },
            {
                path: "/dashboard/add-product",
                element: <PrivateRoute allowedRoles={["user", "moderator", "admin"]}><AddProduct></AddProduct></PrivateRoute>
            },
            {
                path: "/dashboard/payment/subscription",
                element: <PrivateRoute allowedRoles={["user", "moderator", "admin"]}><Payment></Payment></PrivateRoute>
            },
             {
                path: "/dashboard/my-products",
                element: (
                    <PrivateRoute allowedRoles={["user", "moderator", "admin"]}>
                        <MyProducts />
                    </PrivateRoute>
                )
            },
            {
                path: "/dashboard/statistics",
                element: (
                    <PrivateRoute allowedRoles={["admin"]}>
                        <Statistics></Statistics>
                    </PrivateRoute>
                )
            },
             {
                path: "/dashboard/manage-users",
                element: (
                    <PrivateRoute allowedRoles={["admin"]}>
                        <ManageUsers></ManageUsers>
                    </PrivateRoute>
                )
            },
             {
                path: "/dashboard/manage-coupons",
                element: (
                    <PrivateRoute allowedRoles={["admin"]}>
                        <ManageCoupons></ManageCoupons>
                    </PrivateRoute>
                )
            },
            {
                path: "/dashboard/moderator",
                element: (
                    <PrivateRoute allowedRoles={["moderator", "admin"]}>
                        <h1>Moderator Panel</h1>
                    </PrivateRoute>
                )
            },

        ]
    }
]);

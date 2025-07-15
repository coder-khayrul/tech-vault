import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Outlet } from 'react-router';
import OverLear from '../Components/OverLear';

const MainLayout = () => {
    return (
        <>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
            <OverLear></OverLear>
        </>
    );
};

export default MainLayout;
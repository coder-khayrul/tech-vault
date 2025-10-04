import React from 'react';
import Hero from '../Components/Hero';
import CommunitySection from '../Components/CommunitySection';
import NewsLetter from '../Components/NewsLetter';
import FeaturedProduct from '../Components/FeaturedProduct';
import TrandingProduct from '../Components/TrandingProduct';
import CouponCarousel from '../Components/CouponCarousel';

const Home = () => {
    return (
        <>
            <Hero></Hero>
            <FeaturedProduct></FeaturedProduct>
            <TrandingProduct></TrandingProduct>
            <CouponCarousel></CouponCarousel>
            <CommunitySection></CommunitySection>
            <NewsLetter></NewsLetter>
        </>
    );
};

export default Home;
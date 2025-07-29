import React from 'react';
import Hero from '../Components/Hero';
import CommunitySection from '../Components/CommunitySection';
import NewsLetter from '../Components/NewsLetter';
import FeaturedProduct from '../Components/FeaturedProduct';
import TrandingProduct from '../Components/TrandingProduct';

const Home = () => {
    return (
        <>
            <Hero></Hero>
            <FeaturedProduct></FeaturedProduct>
            <TrandingProduct></TrandingProduct>
            <CommunitySection></CommunitySection>
            <NewsLetter></NewsLetter>
        </>
    );
};

export default Home;
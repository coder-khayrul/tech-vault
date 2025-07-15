import React from 'react';
import Hero from '../Components/Hero';
import CommunitySection from '../Components/CommunitySection';
import NewsLetter from '../Components/NewsLetter';
import FeaturedProduct from '../Components/FeaturedProduct';

const Home = () => {
    return (
        <>
            <Hero></Hero>
            <FeaturedProduct></FeaturedProduct>
            <CommunitySection></CommunitySection>
            <NewsLetter></NewsLetter>
        </>
    );
};

export default Home;
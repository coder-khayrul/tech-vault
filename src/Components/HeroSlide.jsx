import { Link } from 'lucide-react';
import React from 'react';
import ButtonBody from './ui/ButtonBody';

const HeroSlide = ({ title, subtitle, description }) => {
    const [before, after] = title.split('||').map(part => part.trim());

    return (
        <div className="min-h-screen flex items-center justify-center bg-indigo-50">
            <div className="text-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-500 text-white mb-8 animation-box">
                    {subtitle}
                </span>
                <h1 className="text-4xl md:text-6xl text-indigo-950 font-bold mb-6 w-[70%] mx-auto animation-text">
                    {before} <span className='text-indigo-500'>{after}</span>
                </h1>
                <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto  text-indigo-950 animation-body">
                    {description}
                </p>
                <div className="flex gap-4 items-center justify-center">
                    <div className={"fade-left"}>
                      <ButtonBody to={"/products"} >
                        Explore Products
                    </ButtonBody>  
                    </div>
                    <div className={"fade-right"}>
                        <ButtonBody to={"/add-product"} >
                        Discover Now
                    </ButtonBody>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default HeroSlide;
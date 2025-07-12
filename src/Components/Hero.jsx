import React from 'react';
import Container from './ui/Container';

const Hero = () => {
    return (
        <section className='bg-indigo-50'>
            {/* <VantaDotsBackground/> */}
            <Container>
                <div>
                    <div className="min-h-screen flex items-center justify-center ">
                        <div className="text-center">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-500 text-white mb-4">
                                The future of tech, built today.
                            </span>
                            <h1 className="text-4xl md:text-6xl text-indigo-950 font-bold mb-4 w-[70%] mx-auto">
                                Experience the Power of a <span className='text-indigo-500'>Cloud-first Platform</span> 
                            </h1>
                            <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto  text-indigo-950">
                                Our cloud-first platform simplifies operations and accelerates innovation.
                            </p>
                            <div className="space-x-4">
                                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition">
                                    See how it works
                                </button>
                                <button className="bg-transparent border border-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition">
                                    Schedule a Demo
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

        </section>
    );
};

export default Hero;
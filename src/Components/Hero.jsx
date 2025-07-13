import React from 'react';
import Container from './ui/Container';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
// import required modules
import { Autoplay, EffectFade, Mousewheel, Pagination } from 'swiper/modules';

const Hero = () => {



    return (
        <section className='bg-indigo-50 h-screen' >
            <Container>
                <div className='h-screen'>
                    <Swiper
                    effect="fade"
                    fadeEffect={{ crossFade: true }}
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        direction={'vertical'}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination, Mousewheel, Autoplay,EffectFade]}
                        className="mySwiper h-screen"
                    >

                        <SwiperSlide>
                            <div className="min-h-screen flex items-center justify-center bg-indigo-50">
                                <div className="text-center">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-500 text-white mb-4">
                                        The future of tech, built today.
                                    </span>
                                    <h1 className="text-4xl md:text-6xl text-indigo-950 font-bold mb-4 w-[70%] mx-auto animation-text">
                                        Experience the Power of a <span className='text-indigo-500'>Cloud-first Platform</span>
                                    </h1>
                                    <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto  text-indigo-950 animation-body">
                                        Our cloud-first platform simplifies operations and accelerates innovation.
                                    </p>
                                    <div className="space-x-4">
                                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition">
                                            See how it works
                                        </button>
                                        <button className="bg-transparent border border-indigo-600 hover:bg-indigo-700 text-indigo-700 font-bold py-3 px-6 rounded-lg transition duration-700 hover:text-white ">
                                            Schedule a Demo
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="min-h-screen flex items-center justify-center bg-indigo-50">
                                <div className="text-center">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-500 text-white mb-6">
                                        The future of tech, built today.
                                    </span>
                                    <h1 className="text-4xl md:text-6xl text-indigo-950 font-bold mb-6 w-[70%] mx-auto animation-text">
                                        Experience the Khayrul Islam <span className='text-indigo-500'>Cloud-first Platform</span>
                                    </h1>
                                    <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto  text-indigo-950 animation-body">
                                        Our cloud-first platform simplifies operations and accelerates innovation.
                                    </p>
                                    <div className="space-x-4">
                                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition">
                                            See how it works
                                        </button>
                                        <button className="bg-transparent border border-indigo-600 hover:bg-indigo-700 text-indigo-700 font-bold py-3 px-6 rounded-lg transition duration-700 hover:text-white ">
                                            Schedule a Demo
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </Container>

        </section>
    );
};

export default Hero;
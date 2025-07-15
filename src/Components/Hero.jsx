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
import HeroSlide from './HeroSlide';

const Hero = () => {

    const sliderContent = [
        {
            subtitle: 'Discover the Future of Tech',
            title: "Find the Next Big Thing in || AI, Software & Web Tools",
            description: "Explore and share powerful tech products, from indie hacks to game-changing startups — all in one place."
        },
        {
            subtitle: 'The Smart Way to Find Smart Tools',
            title: "Curated AI Tools to || Boost Your Productivity",
            description: "Discover cutting-edge AI apps for writing, designing, coding, and more — rated and reviewed by real users."
        },
        {
            subtitle: 'Made for Makers & Devs',
            title: "The Ultimate Hub for || Web Dev & SaaS Tools",
            description: "From frameworks to APIs, find the tools powering tomorrow’s web — discover the next dev gem."
        }
    ]

    return (
        <section className='bg-indigo-50 h-screen' >
            <Container>
                <div className='h-screen'>
                    <Swiper
                        effect="fade"
                        fadeEffect={{ crossFade: true }}
                        loop={true}
                        // autoplay={{
                        //     delay: 3000,
                        //     disableOnInteraction: false,
                        // }}
                        direction={'vertical'}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination, Mousewheel, Autoplay, EffectFade]}
                        className="mySwiper h-screen"
                    >
                        {
                            sliderContent.map(content => (
                                <SwiperSlide>
                                    <HeroSlide title={content.title} description={content.description} subtitle={content.subtitle} />
                                </SwiperSlide>
                            ))
                        }

                    </Swiper>
                </div>
            </Container>

        </section>
    );
};

export default Hero;
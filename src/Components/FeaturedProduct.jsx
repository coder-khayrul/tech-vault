import React, { useEffect, useState } from 'react';
import Container from './ui/Container';
import ProductCard from './ProductCard';
import SectionHeader from './SectionHeader';
import axios from 'axios';

const FeaturedProduct = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("https://app-orbit-server-zeta.vercel.app/featured-products")
            .then(res => setProducts(res.data))
            .catch(err => console.error("Error fetching products:", err));
    }, []);
    return (
        <section className='py-20 bg-indigo-950'>
            <Container>
                <div>
                    <SectionHeader
                        type={"dark"}
                        title={"Featured Products|Of This Week"}
                        description={"Joining our mission is easy and impactful. Just explore current volunteer requests, sign up for an opportunity that matches your interests, and start making a difference."}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7 auto-rows-fr">
                        {products.map((product, index) => (
                            <div
                                key={index}
                                className="animate-slide-up"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>
            </Container>

        </section>
    );
};

export default FeaturedProduct;
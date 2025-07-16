import React from 'react';
import Container from '../Components/ui/Container';
import ProductCard from '../Components/ProductCard';
import { useLoaderData } from 'react-router';

const Products = () => {
    const products = useLoaderData()
    return (
        <section className='bg-indigo-950 py-20'>
            <Container>
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7">
                        {products.map((product, index) => (
                            <div
                                key={index}
                                className="animate-slide-up"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <ProductCard
                                    id={product.id}
                                    name={product.name}
                                    description={product.description}
                                    image={product.image}
                                    tags={product.tags}
                                    votes={product.votes}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </Container>

        </section>
    );
};

export default Products;
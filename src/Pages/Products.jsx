import React, { useEffect, useState } from 'react';
import Container from '../Components/ui/Container';
import ProductCard from '../Components/ProductCard';
import { IoSearchOutline } from 'react-icons/io5';

const Products = () => {

    const [searchTerm, setSearchTerm] = useState("")
    const [products, setProducts] = useState([]);
        
    useEffect(() => {
        fetch(`https://app-orbit-server-zeta.vercel.app/products?search=${searchTerm}`)
            .then(res => res.json())
            .then(data => setProducts(data))
            
    }, [searchTerm])
console.log(products)

    const handleSearchInput = (e) => {
        e.preventDefault();
        setSearchTerm(e.target.value)
    }
    return (
        <section className='bg-indigo-950 py-20'>
            <Container>
                <div>
                    <form className='relative flex items-center w-full'>
                        <input
                            className='h-[50px] w-full border border-indigo-200 rounded-[50px] px-5 focus:outline-1 outline-indigo-200 outline-offset-0 focus:outline-offset-4 duration-700 text-white'
                            onChange={handleSearchInput}
                            type="search"
                            name="postSearch"
                            placeholder='Search product by title'
                            id="postSearch"
                            required />
                        <div className=' text-indigo-400 grid place-items-center absolute right-[15px] top-[50%] translate-y-[-50%] duration-700 '>
                            <IoSearchOutline size={25} />
                        </div>
                    </form>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7">
                        {products.map((product, index) => (
                            <div
                                key={index}
                                className="animate-slide-up"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <ProductCard product={product}/>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>

        </section>
    );
};

export default Products;
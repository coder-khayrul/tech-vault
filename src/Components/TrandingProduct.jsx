import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Link } from 'react-router';
import { BiUpvote } from 'react-icons/bi';
import SectionHeader from './SectionHeader';
import ButtonBody from './ui/ButtonBody';
import axios from 'axios';
import ProductCard from './ProductCard';
const autoplay = Autoplay({ delay: 3000 });


const TrandingProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("https://app-orbit-server-zeta.vercel.app/tranding-products")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);


  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <SectionHeader title={"Trending |Products"} description={"Discover the most popular products loved by our community — curated for innovation, performance, and creativity."} type={"light"} />

        <div className="relative max-w-6xl mx-auto">
          <Carousel
            plugins={[autoplay]}
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4 py-12">
              {products.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <ProductCard product={product}/>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 bg-indigo-400 text-white h-10 w-10" />
            <CarouselNext className="hidden md:flex -right-12 bg-indigo-400 text-white h-10 w-10" />
          </Carousel>
        </div>

        <div className="flex items-center justify-center">
          <Link to="/products">
            <ButtonBody>See All Product</ButtonBody>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrandingProduct;

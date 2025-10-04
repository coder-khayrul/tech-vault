import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Copy, Calendar, Tag } from 'lucide-react';
import Swal from "sweetalert2";
import SectionHeader from './SectionHeader';
import { useEffect, useState } from 'react';
// Mock coupon data - this will be replaced with real data from admin


const CouponCarousel = () => {
    const [coupons,setCoupons] = useState([])
    useEffect(()=> {
        fetch("https://app-orbit-server-zeta.vercel.app/coupons")
        .then(res=>res.json())
        .then(data => setCoupons(data))
    },[])
    const handleCopyCode = (code) => {
        navigator.clipboard.writeText(code);

        Swal.fire({
            icon: "success",
            title: "Coupon Code Copied!",
            text: `Code "${code}" has been copied to clipboard`,
            showConfirmButton: false,
            timer: 1500,
            toast: true,
            position: "top-end",
        });
    };


    return (

        <section className="py-20 ">
            <div className="container mx-auto px-4">
                <SectionHeader title={"Exclusive |Coupons"} description={"Discover limited-time discounts and special offers designed to help you save more on every purchase you make today."} type={"light"} />
                <Carousel
                    opts={{
                        align: 'start',
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-4 py-10">
                        {coupons.map((coupon) => (
                            <CarouselItem key={coupon.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                <Card className="group relative overflow-hidden bg-gradient-to-br from-white via-indigo-50/30 to-indigo-100/50 border-indigo-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                    <CardContent className="p-6">
                                        {/* Discount Badge */}
                                        <div className="absolute top-4 right-4">
                                            <Badge className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-lg px-4 py-2 shadow-md">
                                                {coupon.discount}% OFF
                                            </Badge>
                                        </div>

                                        {/* Coupon Code Section */}
                                        <div className="mb-6 pt-8">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Tag className="w-5 h-5 text-indigo-600" />
                                                <span className="text-sm font-medium text-indigo-600">Coupon Code</span>
                                            </div>
                                            <div className="flex items-center justify-between bg-white/80 backdrop-blur-sm border-2 border-dashed border-indigo-300 rounded-lg p-4 mb-2">
                                                <code className="text-2xl font-bold text-indigo-900 tracking-wider">
                                                    {coupon.code}
                                                </code>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleCopyCode(coupon.code)}
                                                    className="hover:bg-indigo-100"
                                                >
                                                    <Copy className="w-5 h-5 text-indigo-600" />
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="text-sm text-muted-foreground mb-4 min-h-[2.5rem]">
                                            {coupon.description}
                                        </p>

                                        {/* Expiry Date */}
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground border-t border-indigo-200 pt-4">
                                            <Calendar className="w-4 h-4" />
                                            <span>Valid until {new Date(coupon.expiresAt).toLocaleDateString()}</span>
                                        </div>
                                    </CardContent>

                                    {/* Decorative Element */}
                                    <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-indigo-200/30 rounded-full blur-2xl group-hover:bg-indigo-300/40 transition-colors" />
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:flex -left-12 bg-white border-indigo-200 hover:bg-indigo-50" />
                    <CarouselNext className="hidden md:flex -right-12 bg-white border-indigo-200 hover:bg-indigo-50" />
                </Carousel>
            </div>
        </section>
    );
};

export default CouponCarousel;
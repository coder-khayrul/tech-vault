
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FaStar } from 'react-icons/fa6';

const ReviewSection = ({ reviews }) => {
    console.log(reviews.length)
    return (
        <Card className=" p-6 mb-8">
            <CardHeader>
                <CardTitle className="text-2xl text-white">Reviews ({reviews.length})</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {reviews?.map((review) => (
                        <div key={review.id} className="border-b border-b-indigo-50/15 last:border-b-0 pb-6 last:pb-0">
                            <div className="flex items-start gap-4">
                                <img
                                    src={review.reviewerImage}
                                    alt={review.reviewerName}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 ">
                                        <h4 className="font-semibold text-white">{review.reviewerName}</h4>
                                        <div className='flex gap-2 items-center bg-indigo-900 rounded-md p-1 px-2'>
                                            <FaStar size={18} className='text-[#F7B000]' />
                                            <span className='text-white text-[18px]'>{review?.rating}</span>
                                        </div>
                                    </div>
                                    <span className="text-sm text-indigo-200 block mb-4">
                                        {new Date(review.timestamp).toLocaleDateString()}
                                    </span>
                                    <p className="text-indigo-200 leading-relaxed">{review.reviewDescription}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default ReviewSection;
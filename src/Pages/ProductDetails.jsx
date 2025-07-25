import { useNavigate, useLoaderData } from 'react-router';
import { useState, useEffect } from 'react';
import { ChevronUp, ExternalLink, Flag, Star, ArrowLeft, Github, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Swal from 'sweetalert2';
import { use } from 'react';
import { AuthContext } from '../Context/AuthContext';
import ButtonBody from '../Components/ui/ButtonBody';

const sampleReviews = [
    {
        id: "1",
        reviewerName: "Alex Chen",
        reviewerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        description: "Amazing product! Really improved our workflow and saved us tons of time. The AI features are incredibly accurate.",
        rating: 5,
        timestamp: "2024-01-10T14:30:00Z"
    },
    {
        id: "2",
        reviewerName: "Sarah Johnson",
        reviewerImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
        description: "Good product overall, but could use some improvements in the user interface. Support team is very responsive.",
        rating: 4,
        timestamp: "2024-01-08T10:15:00Z"
    },
    {
        id: "3",
        reviewerName: "Mike Rodriguez",
        reviewerImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        description: "Excellent tool for our development team. The automation features are game-changing!",
        rating: 5,
        timestamp: "2024-01-05T16:45:00Z"
    }
];

const ProductDetails = () => {
    const navigate = useNavigate();

    const [hasVoted, setHasVoted] = useState(false);
    const [voteCount, setVoteCount] = useState(0);
    const [reviews, setReviews] = useState(sampleReviews);
    const [reviewDescription, setReviewDescription] = useState('');
    const [rating, setRating] = useState(5);


    const product = useLoaderData();
    const {user} = use(AuthContext)




    useEffect(() => {
        if (product) {
            setVoteCount(product.setVoteCount);
        }
    }, [product]);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-indigo-950">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
                    <Button onClick={() => navigate('/')}>Go Back Home</Button>
                </div>
            </div>
        );
    }

    const handleVote = () => {
        if (!hasVoted) {
            setVoteCount(prev => prev + 1);
            setHasVoted(true);
            Swal.fire({
                title: "Vote recorded!",
                text: "Thank you for supporting this product.",
                icon: "success"
            });
        }
    };

    const handleReport = () => {
        Swal.fire({
            title: "Report submitted",
            text: "Thank you for reporting. We'll review this product shortly.",
            icon: "success"
        });
    };

    const handleSubmitReview = (e) => {
        e.preventDefault();

        if (!reviewDescription.trim()) {
            
             Swal.fire({
                title: "Error!",
                text: "Please enter a review description.",
                icon: "error"
            });
            return;
        }

        const newReview = {
            id: Date.now().toString(),
            reviewerName: user?.name,
            reviewerImage: user?.image,
            description: reviewDescription,
            rating,
            timestamp: new Date().toISOString()
        };

        setReviews(prev => [newReview, ...prev]);
        setReviewDescription('');
        setRating(5);
         Swal.fire({
                title: "Review submitted!",
                text: "Thank you for sharing your feedback.",
                icon: "success"
            });
       
    };

    // const renderStars = (rating, interactive = false, onRatingChange) => {
    //     return (
    //         <div className="flex gap-1">
    //             {[1, 2, 3, 4, 5].map((star) => (
    //                 <Star
    //                     key={star}
    //                     className={`w-5 h-5 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
    //                         } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
    //                     onClick={() => interactive && onRatingChange && onRatingChange(star)}
    //                 />
    //             ))}
    //         </div>
    //     );
    // };

    return (
        <div className="min-h-screen bg-indigo-950">
            <div className="border-b border-b-indigo-50/">
                <div className="container mx-auto px-4 py-4">
                    <Button className="bg-indigo-400 px-6 py-3 rounded-lg text-white mb-4" onClick={() => navigate('/')}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Button>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    <div>
                        <img
                            src={product.image}
                            alt={product.productName}
                            className="w-full h-80 object-cover rounded-2xl shadow-lg"
                        />
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h1 className="text-4xl font-bold text-indigo-950 mb-4">{product.productName}</h1>
                            <p className="text-indigo-200 text-lg leading-relaxed">{product.description}</p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {product?.tags?.map((tag) => (
                                <Badge key={tag} variant="secondary"
                  className="text-xs font-medium bg-indigo-900 text-indigo-400 hover:bg-indigo-400/20 transition-colors">
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        <div className="flex items-center gap-4">
                            <Button
                                onClick={handleVote}
                                disabled={hasVoted}
                                className={`flex items-center gap-2 px-6 py-3 ${hasVoted ? 'bg-indigo-400' : 'bg-indigo-400 hover:bg-indigo-400/90'
                                    }`}
                            >
                                <ChevronUp className="w-5 h-5" />
                                <span className="font-semibold">{voteCount}</span>
                                <span>{hasVoted ? 'Voted' : 'Upvote'}</span>
                            </Button>

                            <Button variant="outline" onClick={handleReport} className="flex items-center gap-2 bg-indigo-200 text-indigo-950">
                                <Flag className="w-4 h-4" />
                                Report
                            </Button>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold text-white">External Links</h3>
                            <div className="flex gap-3">
                                {product?.externalLinks?.website && (
                                    <a
                                        href={product?.externalLinks?.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-indigo-950 border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-white transition-colors duration-500"
                                    >
                                        <Globe className="w-4 h-4" />
                                        Website
                                        <ExternalLink className="w-3 h-3" />
                                    </a>
                                )}
                                {product?.externalLinks?.github && (
                                    <a
                                        href={product?.externalLinks?.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-indigo-950 border-indigo-400 hover:text-indigo-400 bg-indigo-400 text-white transition-colors duration-500"
                                    >
                                        <Github className="w-4 h-4" />
                                        GitHub
                                        <ExternalLink className="w-3 h-3" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews */}
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
                                            <div className="flex items-center gap-3 mb-2">
                                                <h4 className="font-semibold text-white">{review.reviewerName}</h4>
                                                {/* {renderStars(review.rating)} */}
                                                <span className="text-sm text-indigo-200">
                                                    {new Date(review.timestamp).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="text-indigo-200 leading-relaxed">{review.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Submit Review */}
                <Card className="p-6">
                    <CardHeader>
                        <CardTitle className="text-2xl text-white">Post a Review</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmitReview} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label className="text-white text-sm mb-3" htmlFor="reviewerName">Reviewer Name</Label>
                                    <Input id="reviewerName" value={user?.name} readOnly className="bg-indigo-200 text-indigo-950" />
                                </div>
                                <div>
                                    <Label className="text-white text-sm mb-3" htmlFor="reviewerImage">Reviewer Image</Label>
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={user?.image}
                                            alt="Your profile"
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <Input id="reviewerImage" value={user?.image} readOnly className="bg-indigo-200" />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <Label className="text-white text-sm mb-3" htmlFor="rating">Rating</Label>
                                {/* <div className="mt-2">{renderStars(rating, true, setRating)}</div> */}
                            </div>

                            <div>
                                <Label className="text-white text-sm mb-3" htmlFor="reviewDescription">Review Description</Label>
                                <Textarea
                                    id="reviewDescription"
                                    placeholder="Share your experience with this product..."
                                    value={reviewDescription}
                                    onChange={(e) => setReviewDescription(e.target.value)}
                                    className="min-h-32 mt-2 bg-indigo-200 text-indigo-950"
                                />
                            </div>

                            <ButtonBody>Submit</ButtonBody>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ProductDetails;

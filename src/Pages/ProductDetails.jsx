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
import { BiUpvote } from 'react-icons/bi';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { FaStar } from "react-icons/fa6";
import ReviewSection from '../Components/ReviewSection';


const ProductDetails = () => {
    const navigate = useNavigate();
    const product = useLoaderData();
    const { user } = use(AuthContext)

    const { register, handleSubmit } = useForm()
    const [voteCount, setVoteCount] = useState(product.upvotes ? parseInt(product.upvotes) : 0);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch(`https://app-orbit-server-zeta.vercel.app/reviews/${product._id}`)
            .then(res => res.json())
            .then(data => setReviews(data))


    }, [product._id]);

    console.log("Updated Reviews:", reviews);



    const handleVoteCount = () => {
        if (product.ownerEmail !== user.email) {
            const newCount = voteCount + 1;
            setVoteCount(newCount);

            axios.patch(`https://app-orbit-server-zeta.vercel.app/products/${product._id}`, {
                userEmail: user.email
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    console.log("Vote recorded:", res.data);
                })
                .catch(error => {
                    console.error(error);
                    if (error.response?.data?.message === "User already voted") {
                        alert("You already voted!");
                    }
                });

        }
    };




        const handleReport = async (productId) => {
            try {
                const response = await axios.patch(`https://app-orbit-server-zeta.vercel.app/products/report/${productId}`, {
                    reported: true,
                    reportTimestamp: new Date().toISOString()
                });

                if (response.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Report submitted",
                        text: "Thank you for reporting. We'll review this product shortly.",
                        icon: "success"
                    });
                }
            } catch (error) {
                console.error("Error reporting product:", error);
                Swal.fire({
                    title: "Report submitted",
                    text: "Reporting Error!!",
                    icon: "error"
                });
            }
        };


    const onSubmit = (data) => {
        const review = { ...data, productId: product._id }
        axios.post("https://app-orbit-server-zeta.vercel.app/reviews", review);

        Swal.fire({
            title: 'Success!',
            text: 'Review submitted successfully.',
            icon: 'success',
            confirmButtonColor: '#6366f1'
        });


    };



    return (
        <div className="min-h-screen bg-indigo-950">
            <div className="border-b border-b-indigo-900">
                <div className="container mx-auto px-4 py-4">
                    <Button className="bg-indigo-400 px-6 py-3 rounded-lg text-white" onClick={() => navigate('/')}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Button>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    <div className=''>
                        <img
                            src={product.image}
                            alt={product.productName}
                            className="w-full h-80 object-cover rounded-2xl shadow-lg border border-indigo-700 "
                        />
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-4">{product.productName}</h1>
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
                                onClick={handleVoteCount}
                                className={`flex items-center gap-2 px-6 py-3 bg-indigo-400 hover:bg-indigo-400/90
                                    }`}
                            >
                                <BiUpvote className="w-5 h-5" />
                                <span className="font-semibold">{product.upvotes}</span>
                            </Button>

                            <Button variant="outline" onClick={() => handleReport(product._id)}className="flex items-center gap-2 bg-indigo-200 text-indigo-950">
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


                <ReviewSection reviews={reviews}></ReviewSection>

                {/* Submit Review */}
                <Card className="p-6 bg-indigo-900">
                    <CardHeader>
                        <CardTitle className="text-2xl text-white">Post a Review</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <div className="">
                                    <Label className="block text-white">Reviewer Name</Label>
                                    <input type="text" name="reviewerName" value={user?.displayName}
                                        {...register("reviewerName", { required: true })}
                                        className="w-full px-4 py-4 rounded-lg bg-main-dark text-indigo-300  focus:text-white placeholder:text-indigo-300  focus:placeholder:text-indigo-300 mt-2 border border-indigo-400 focus:outline-none duration-700" required readOnly />
                                </div>
                                <div>
                                    <Label className="text-white  block" htmlFor="reviewerImage">Reviewer Image</Label>
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={user?.photoURL}
                                            alt="Your profile"
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        <input id="reviewerImage" value={user?.photoURL} readOnly  {...register("reviewerImage", { required: true })} className="w-full px-4 py-4 rounded-lg bg-main-dark text-indigo-300  focus:text-white placeholder:text-indigo-300  focus:placeholder:text-indigo-300 mt-2 border border-indigo-400 focus:outline-none duration-700" />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <Label className="block text-white">Rating Point</Label>
                                <input htmlFor="rating" type="text" name="rating" placeholder="Enter Review point"
                                    {...register("rating", { required: true })}
                                    className="w-full px-4 py-4 rounded-lg bg-main-dark text-indigo-300  focus:text-white placeholder:text-indigo-300  focus:placeholder:text-indigo-300 mt-2 border border-indigo-400 focus:outline-none duration-700" required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="reviewDescription" className={"block text-white"}>Review Description *</Label>
                                <Textarea
                                    id="description"
                                    name="reviewDescription"
                                    {...register("reviewDescription", { required: true })}
                                    placeholder="Describe your product..."
                                    rows={6}
                                    className={"w-full px-4 py-4 rounded-lg bg-main-dark text-indigo-300  focus:text-white placeholder:text-indigo-300  focus:placeholder:text-indigo-300 mt-2 border border-indigo-400 focus:outline-none duration-700"}
                                    required
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

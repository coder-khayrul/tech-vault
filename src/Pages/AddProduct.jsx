import React, { useState, useRef, use } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { FiUpload, FiTag, FiLink, FiUser, FiMail, FiX } from 'react-icons/fi';
import Swal from 'sweetalert2';
import ButtonBody from '../Components/ui/ButtonBody';
import SectionHeader from '../Components/SectionHeader';
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';

const AddProduct = () => {
    const { user } = use(AuthContext);
    const [imagePreview, setImagePreview] = useState(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef(null);

    const handleFilePreview = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setImagePreview(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            handleFilePreview(file);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleFilePreview(file);
            if (fileInputRef.current) {
                fileInputRef.current.files = e.dataTransfer.files;
            }
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const file = formData.get('image');

        if (!formData.get('productName') || !file || !formData.get('description')) {
            Swal.fire({
                title: 'Error!',
                text: 'Please fill in all required fields.',
                icon: 'error',
                confirmButtonColor: '#6366f1'
            });
            return;
        }

        try {
            const imageForm = new FormData();
            imageForm.append("image", file);

            const res = await axios.post(
                `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_image_key}`,
                imageForm
            );

            const imageUrl = res.data?.data?.url;
            const ProductData = Object.fromEntries(formData.entries());
            ProductData.image = imageUrl;
            ProductData.ownerName = user?.displayName || '';
            ProductData.ownerEmail = user?.email || '';
            ProductData.ownerImage = user?.image || '';
            ProductData.externalLinks = {
                github: ProductData.githubLink,
                website: ProductData.webLink
            }
            ProductData.tags = ProductData.tags.split(",").map(tag => tag.trim())
            ProductData.upvotes = 0;
            ProductData.status = 'pending';
            ProductData.isFeatured = false;
            ProductData.timestamp = new Date().toISOString();


            await axios.post("https://app-orbit-server-zeta.vercel.app/products", ProductData);

            Swal.fire({
                title: 'Success!',
                text: 'Product submitted successfully.',
                icon: 'success',
                confirmButtonColor: '#6366f1'
            });

            form.reset();
            setImagePreview(null);
        } catch (err) {
            console.error("Error submitting product:", err);
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong while submitting the form.',
                icon: 'error',
                confirmButtonColor: '#6366f1'
            });
        }
    };

    return (
        <div className="min-h-screen bg-indigo-50 p-6 py-20">
            <div className="max-w-2xl mx-auto">
                <SectionHeader
                    type="light"
                    title="Submit Your | Tech Product"
                    description="Share your innovation with the community. Submissions go through a short review before appearing live."
                />

                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-t-lg">
                        <CardTitle className="flex items-center gap-2 py-5 font-medium text-[25px]">
                            <FiUpload className="w-6 h-6" />
                            Product Submission Form
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="productName">Product Name *</Label>
                                <Input
                                    id="productName"
                                    name="productName"
                                    placeholder="Enter product name"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Product Image *</Label>
                                <div
                                    className={`relative border-2 border-dashed rounded-lg p-6 transition-all duration-200 cursor-pointer ${isDragOver
                                        ? 'border-indigo-500 bg-indigo-50'
                                        : 'border-indigo-200 hover:border-indigo-400 hover:bg-indigo-25'
                                        }`}
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleFileInputChange}
                                        className="hidden"
                                        required
                                    />

                                    {imagePreview ? (
                                        <div className="relative">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-full h-40 object-cover rounded-lg"
                                            />
                                            <Button
                                                type="button"
                                                size="sm"
                                                variant="destructive"
                                                className="absolute top-2 right-2"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeImage();
                                                }}
                                            >
                                                <FiX className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <FiUpload className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
                                            <p className="text-lg font-medium text-indigo-600">
                                                Click to upload or drag and drop
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                PNG, JPG, GIF up to 10MB
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description *</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder="Describe your product..."
                                    rows={6}
                                    required
                                />
                            </div>

                            <div className="space-y-4">
                                <Label>Product Owner Info</Label>
                                <Card className="bg-indigo-50 border-indigo-200">
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-4">
                                            <Avatar className="w-16 h-16 border-2 border-indigo-300">
                                                <AvatarImage src={user?.image} alt={user?.displayName} />
                                                <AvatarFallback className="bg-indigo-500 text-white">
                                                    {user?.displayName?.split(' ').map(n => n[0]).join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <FiUser className="w-4 h-4 text-indigo-600" />
                                                    <span className="font-medium text-indigo-900">{user?.displayName}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <FiMail className="w-4 h-4 text-indigo-600" />
                                                    <span className="text-indigo-700">{user?.email}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="tags">Tags</Label>
                                <div className="relative">
                                    <FiTag className="absolute left-3 top-3 w-5 h-5 text-indigo-500" />
                                    <Input
                                        id="tags"
                                        name="tags"
                                        placeholder="React, JavaScript, Web App (comma separated)"
                                        className="pl-12"
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground">Separate tags with commas</p>
                            </div>

                            <div className="space-y-2 flex flex-col gap-3">
                                <h3 className='font-semibold'>External Links</h3>
                                <div className="space-y-2">
                                    <Label htmlFor="githubLink">Github Link *</Label>
                                    <div className="relative">
                                        <FiLink className="absolute left-3 top-3 w-5 h-5 text-indigo-500" />
                                        <Input
                                            name="githubLink"
                                            placeholder="https://github.io/name"
                                            className="pl-12"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="githubLink">Website Link *</Label>
                                    <div className="relative">
                                        <FiLink className="absolute left-3 top-3 w-5 h-5 text-indigo-500" />
                                        <Input
                                            name="webLink"
                                            placeholder="https://yourproduct.com"
                                            className="pl-12"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <ButtonBody>Submit Product for Review</ButtonBody>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AddProduct;

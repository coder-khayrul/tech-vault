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

const AddProduct = () => {
    const {user} = use(AuthContext)
    const [formData, setFormData] = useState({
        productName: '',
        productImage: null,
        description: '',
        tags: '',
        externalLink: ''
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef(null);


    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileSelect = (file) => {
        setFormData({
            ...formData,
            productImage: file
        });

        const reader = new FileReader();
        reader.onload = (e) => {
            setImagePreview(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                handleFileSelect(file);
            }
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleFileInputChange = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFileSelect(files[0]);
        }
    };

    const removeImage = () => {
        setFormData({
            ...formData,
            productImage: null
        });
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.productName || !formData.productImage || !formData.description) {
            Swal.fire({
                title: 'Error!',
                text: 'Please fill in all required fields.',
                icon: 'error',
                confirmButtonColor: '#6366f1'
            });
            return;
        }

        console.log('Form submitted:', { ...formData, owner: user });

        Swal.fire({
            title: 'Success!',
            text: 'Product has been submitted for review.',
            icon: 'success',
            confirmButtonColor: '#6366f1'
        });

        setFormData({
            productName: '',
            productImage: null,
            description: '',
            tags: '',
            externalLink: ''
        });
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="min-h-screen bg-indigo-50 p-6 py-20">
            <div className="max-w-2xl mx-auto">
                <SectionHeader 
                type={"light"}
                title={"Submit Your | Tech Product"}
                description={"Share your innovation with the community. Submissions go through a short review before appearing live."}
                ></SectionHeader>

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
                                <Label htmlFor="productName" className="text-sm font-semibold text-foreground">
                                    Product Name *
                                </Label>
                                <Input
                                    id="productName"
                                    name="productName"
                                    value={formData.productName}
                                    onChange={handleInputChange}
                                    placeholder="Enter product name"
                                    className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm font-semibold text-foreground">
                                    Product Image *
                                </Label>
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
                                        accept="image/*"
                                        onChange={handleFileInputChange}
                                        className="hidden"
                                    />

                                    {imagePreview ? (
                                        <div className="relative">
                                            <img
                                                src={imagePreview}
                                                alt="Product preview"
                                                className="w-full h-40 rounded-lg object-cover"
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
                                            <div className="space-y-2">
                                                <p className="text-lg font-medium text-indigo-600">
                                                    Click to upload or drag and drop
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    PNG, JPG, GIF up to 10MB
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-sm font-semibold text-foreground">
                                    Description *
                                </Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Describe your product..."
                                    rows={7}
                                    className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                />
                            </div>

                            <div className="space-y-4">
                                <Label className="text-sm font-semibold text-foreground">
                                    Product Owner Info
                                </Label>
                                <Card className="bg-indigo-50 border-indigo-200">
                                    <CardContent className="p-4">
                                        <div className="flex items-center space-x-4">
                                            <Avatar className="w-16 h-16 border-2 border-indigo-300">
                                                <AvatarImage src={user?.image} alt={user?.name} />
                                                <AvatarFallback className="bg-indigo-500 text-white">
                                                    {user?.name.split(' ').map(n => n[0]).join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <FiUser className="w-4 h-4 text-indigo-600" />
                                                    <span className="font-medium text-indigo-900">{user?.name}</span>
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
                                <Label htmlFor="tags" className="text-sm font-semibold text-foreground">
                                    Tags
                                </Label>
                                <div className="relative">
                                    <FiTag className="absolute left-3 top-3 w-5 h-5 text-indigo-500" />
                                    <Input
                                        id="tags"
                                        name="tags"
                                        value={formData.tags}
                                        onChange={handleInputChange}
                                        placeholder="React, JavaScript, Web App (comma separated)"
                                        className="pl-12 border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Separate tags with commas
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="externalLink" className="text-sm font-semibold text-foreground">
                                    External Link
                                </Label>
                                <div className="relative">
                                    <FiLink className="absolute left-3 top-3 w-5 h-5 text-indigo-500" />
                                    <Input
                                        id="externalLink"
                                        name="externalLink"
                                        value={formData.externalLink}
                                        onChange={handleInputChange}
                                        placeholder="https://yourproduct.com"
                                        className="pl-12 border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>
                            <div className={'flex items-center justify-center'}>
                                <ButtonBody
                                >
                                    Submit Product for Review
                                </ButtonBody>
                            </div>

                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AddProduct;

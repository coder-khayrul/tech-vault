import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FaEye, FaStar, FaCheck, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { useState } from 'react';


const ProductReview = () => {

    const [acceptedProduct, setAcceptedProduct] = useState([]);
    const [pendingProduct, setPendingProduct] = useState([]);
    

    useEffect(() => {
        fetch("https://app-orbit-server-zeta.vercel.app/products/pending")
            .then((res) => res.json())
            .then((data) => setPendingProduct(data))
            .catch((err) => console.error(err));

            fetch("https://app-orbit-server-zeta.vercel.app/products")
            .then((res) => res.json())
            .then((data) => setAcceptedProduct(data))
            .catch((err) => console.error(err));
    }, []);


    const handleViewDetails = (productId) => {
        Swal.fire({
            title: "Product Details",
            text: `Viewing details for product ${productId}`,
            icon: "info",
        });
    };

    const handleMakeFeatured = async (id) => {
        await fetch(`https://app-orbit-server-zeta.vercel.app/${id}/feature`, {
            method: "PUT",
        });
        Swal.fire("Featured!", "Product marked as featured.", "success");
        // refreshProducts();
    };

    const handleAccept = async (id) => {
        await fetch(`https://app-orbit-server-zeta.vercel.app/products/${id}/accept`, {
            method: "PUT",
        });
        Swal.fire("Accepted!", "Product is now live.", "success");
        // refreshProducts();
    };

    const handleReject = async (id) => {
        await fetch(`https://app-orbit-server-zeta.vercel.app/${id}/reject`, {
            method: "PUT",
        });
        Swal.fire("Rejected", "Product has been rejected.", "error");
        // refreshProducts();
    };

    // const refreshProducts = () => {
    //     fetch("https://app-orbit-server-zeta.vercel.app/products")
    //         .then((res) => res.json())
    //         .then((data) => setProducts(data));
    // };

    const getStatusBadge = (status) => {
        switch (status) {
            case "accepted":
                return <Badge className="bg-green-500">Accepted</Badge>;
            case "rejected":
                return <Badge variant="destructive">Rejected</Badge>;
            default:
                return <Badge variant="secondary">Pending</Badge>;
        }
    };
 
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Product Review Queue</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Products Awaiting Review</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Submitted By</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pendingProduct.map((product) => (
                                <TableRow key={product._id}>
                                    <TableCell className="font-medium">{product.productName}</TableCell>
                                    <TableCell>{getStatusBadge(product.status)}</TableCell>
                                    <TableCell>{product.ownerName}</TableCell>
                                    <TableCell>{product.timestamp}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2 flex-wrap">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleViewDetails(product._id)}
                                            >
                                                <FaEye className="h-3 w-3" />
                                                View
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="secondary"
                                                onClick={() => handleMakeFeatured(product._id)}
                                            >
                                                <FaStar className="h-3 w-3" />
                                                Feature
                                            </Button>
                                            {product.status === "pending" && (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        className="bg-green-500 hover:bg-green-600"
                                                        onClick={() => handleAccept(product._id)}
                                                    >
                                                        <FaCheck className="h-3 w-3" />
                                                        Accept
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() => handleReject(product._id)}
                                                    >
                                                        <FaTimes className="h-3 w-3" />
                                                        Reject
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {acceptedProduct.map((product) => (
                                <TableRow key={product._id}>
                                    <TableCell className="font-medium">{product.productName}</TableCell>
                                    <TableCell>{getStatusBadge(product.status)}</TableCell>
                                    <TableCell>{product.ownerName}</TableCell>
                                    <TableCell>{product.timestamp}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2 flex-wrap">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleViewDetails(product._id)}
                                            >
                                                <FaEye className="h-3 w-3" />
                                                View
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="secondary"
                                                onClick={() => handleMakeFeatured(product._id)}
                                            >
                                                <FaStar className="h-3 w-3" />
                                                Feature
                                            </Button>
                                            {product.status === "pending" && (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        className="bg-green-500 hover:bg-green-600"
                                                        onClick={() => handleAccept(product._id)}
                                                    >
                                                        <FaCheck className="h-3 w-3" />
                                                        Accept
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() => handleReject(product._id)}
                                                    >
                                                        <FaTimes className="h-3 w-3" />
                                                        Reject
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProductReview;
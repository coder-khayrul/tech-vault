import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FaEye, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useEffect} from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router';


const ReportedContents = () => {
    const [reportedProducts, setReportedProduct] = useState([])
     const navigate = useNavigate();
    useEffect(() => {
        fetch("https://app-orbit-server-zeta.vercel.app/products/reported")
            .then(res => res.json())
            .then(data => setReportedProduct(data))
    }, [])
     const handleViewDetails = (productId) => {
    console.log("view details");
    navigate(`/products/${productId}`);
  };

    const handleDelete = (productId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This will permanently delete the reported product!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async(result) => {
            if (result.isConfirmed) {
                const res = await axios.delete(`https://app-orbit-server-zeta.vercel.app/products/${productId}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire('Deleted!', 'Product has been deleted.', 'success');

                }
            }
        });
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Reported Contents</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Products Reported by Users</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product Name</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {reportedProducts.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">{product.productName}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleViewDetails(product._id)}
                                            >
                                                <FaEye className="h-3 w-3" />
                                                View Details
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => handleDelete(product._id)}
                                            >
                                                <FaTrash className="h-3 w-3" />
                                                Delete
                                            </Button>
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

export default ReportedContents;
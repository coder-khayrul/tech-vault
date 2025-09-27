import React, { use, useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Context/AuthContext';



export default function MyProducts() {
    const { user } = use(AuthContext)
    const [product, setProduct] = useState([]);
    

    useEffect(() => {
        fetch(`https://app-orbit-server-zeta.vercel.app/products/${user.email}`)
        .then(res => res.json())
        .then(data => setProduct(data)
        )
    }, [user.email])



    const handleUpdate = (productId) => {
        Swal.fire({
            title: 'Redirect to Update',
            text: `Would redirect to update product ${productId}`,
            icon: 'info',
        });
    };

    const handleDelete = (productId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Deleted!', 'Product has been deleted.', 'success');
            }
        });
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'accepted':
                return <Badge className="bg-green-500">Accepted</Badge>;
            case 'rejected':
                return <Badge variant="destructive">Rejected</Badge>;
            default:
                return <Badge variant="secondary">Pending</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-foreground">My Products</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Your Submitted Products</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product Name</TableHead>
                                <TableHead>Votes</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {product.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">{product.productName}</TableCell>
                                    <TableCell>{product.votes}</TableCell>
                                    <TableCell>{getStatusBadge(product.status)}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleUpdate(product.id)}
                                            >
                                                <FaEdit className="h-3 w-3" />
                                                Update
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => handleDelete(product.id)}
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
}

import React from 'react';
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

// Mock product data
const mockProducts = [
  {
    id: '1',
    name: 'AI Code Assistant',
    votes: 145,
    status: 'accepted',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Smart Todo App',
    votes: 89,
    status: 'pending',
    createdAt: '2024-01-20',
  },
  {
    id: '3',
    name: 'Design Tool Pro',
    votes: 267,
    status: 'rejected',
    createdAt: '2024-01-10',
  },
];

export default function MyProducts() {
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
              {mockProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
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

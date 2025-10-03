import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from 'axios';


const ManageCoupons = () => {
    const [coupons, setCoupons] = useState([]);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [newCoupon, setNewCoupon] = useState({

        code: "",
        discount: "",
        description: "",
        expiresAt: "",
        isActive: true,
        usageCount: 0
    });
    const [editCoupon, setEditCoupon] = useState(null);

    useEffect(() => {
        axios.get("https://app-orbit-server-zeta.vercel.app/coupons")
            .then(res => setCoupons(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleCreateCoupon = async (e) => {
        e.preventDefault();
        await axios.post("https://app-orbit-server-zeta.vercel.app/coupons", newCoupon);
        setIsCreateOpen(false);
        Swal.fire("Coupon Created!", "New coupon has been added.", "success");
        const res = await axios.get("https://app-orbit-server-zeta.vercel.app/coupons");
        setCoupons(res.data);

    };

    const handleEditCoupon = (coupon) => {
        console.log(coupon)
        setEditCoupon(coupon);
        setIsEditOpen(true);
    };

    const handleUpdateCoupon = async (e) => {
        e.preventDefault();
        await axios.put(`https://app-orbit-server-zeta.vercel.app/coupons/${editCoupon._id}`, editCoupon);
        setIsEditOpen(false);
        Swal.fire("Updated!", "Coupon has been updated.", "success");
        const res = await axios.get("https://app-orbit-server-zeta.vercel.app/coupons");
        setCoupons(res.data);
        setEditCoupon(null);

    };

    const handleDeleteCoupon = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This will permanently delete the coupon!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(`https://app-orbit-server-zeta.vercel.app/coupons/${id}`);
                setCoupons(coupons.filter(c => c._id !== id));
                Swal.fire("Deleted!", "Coupon has been deleted.", "success");
            }
        });
    };


    const getStatusBadge = (isActive) => {
        return isActive ? (
            <Badge className="bg-green-500">Active</Badge>
        ) : (
            <Badge variant="secondary">Inactive</Badge>
        );
    };


    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-foreground">Manage Coupons</h1>

                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <FaPlus className="h-4 w-4 mr-2" />
                            Create Coupon
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>Create New Coupon</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleCreateCoupon} className="space-y-4">
                            <div>
                                <Label htmlFor="code">Coupon Code</Label>
                                <Input id="code" value={newCoupon.code} onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })} required />
                            </div>
                            <div>
                                <Label htmlFor="discount">Discount Amount(%)</Label>
                                <Input id="discount" type="number" value={newCoupon.discount} onChange={(e) => setNewCoupon({ ...newCoupon, discount: e.target.value })} required />
                            </div>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" value={newCoupon.description} onChange={(e) => setNewCoupon({ ...newCoupon, description: e.target.value })} />
                            </div>
                            <div>
                                <Label htmlFor="expires">Expires At</Label>
                                <Input id="expires" type="date" value={newCoupon.expiresAt} onChange={(e) => setNewCoupon({ ...newCoupon, expiresAt: e.target.value })} required />
                            </div>
                            <Button type="submit" className="w-full">Create Coupon</Button>
                        </form>

                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Coupons</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Code</TableHead>
                                <TableHead>Discount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Usage</TableHead>
                                <TableHead>Expires</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {coupons.map((coupon) => (
                                <TableRow key={coupon._id}>
                                    <TableCell className="font-mono font-bold">{coupon.code}</TableCell>
                                    <TableCell>
                                        {`${coupon.discount}%`}
                                    </TableCell>
                                    <TableCell>{getStatusBadge(coupon.isActive)}</TableCell>
                                    <TableCell>{coupon.usageCount} uses</TableCell>
                                    <TableCell>{coupon.expiresAt}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleEditCoupon(coupon)}
                                            >
                                                <FaEdit className="h-3 w-3" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => handleDeleteCoupon(coupon._id)}
                                            >
                                                <FaTrash className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            {/* Edit Coupon Dialog */}
            {editCoupon && (
                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>Edit Coupon</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleUpdateCoupon} className="space-y-4">
                            <div>
                                <Label htmlFor="edit-code">Coupon Code</Label>
                                <Input
                                    id="edit-code"
                                    value={editCoupon.code}
                                    onChange={(e) => setEditCoupon({ ...editCoupon, code: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="edit-discount">Discount Amount(%)</Label>
                                <Input
                                    id="edit-discount"
                                    type="number"
                                    value={editCoupon.discount}
                                    onChange={(e) => setEditCoupon({ ...editCoupon, discount: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="edit-description">Description</Label>
                                <Textarea
                                    id="edit-description"
                                    value={editCoupon.description}
                                    onChange={(e) => setEditCoupon({ ...editCoupon, description: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label htmlFor="edit-expires">Expires At</Label>
                                <Input
                                    id="edit-expires"
                                    type="date"
                                    value={editCoupon.expiresAt}
                                    onChange={(e) => setEditCoupon({ ...editCoupon, expiresAt: e.target.value })}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Update Coupon
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default ManageCoupons;
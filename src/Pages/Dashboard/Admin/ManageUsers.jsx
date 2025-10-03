import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FaUserShield, FaUserCog } from 'react-icons/fa';
import Swal from 'sweetalert2';


const ManageUsers = () => {

    const mockUsers = [
        {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            role: 'user',
            joinedAt: '2024-01-15'
        },
        {
            id: '2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            role: 'moderator',
            joinedAt: '2024-01-10'
        },
        {
            id: '3',
            name: 'Mike Johnson',
            email: 'mike@example.com',
            role: 'user',
            joinedAt: '2024-01-20'
        },
        {
            id: '4',
            name: 'Sarah Wilson',
            email: 'sarah@example.com',
            role: 'user',
            joinedAt: '2024-01-18'
        }
    ];
    // Promote to Moderator
    function handleMakeModerator(userId, userName) {
        Swal.fire({
            title: 'Promote to Moderator?',
            text: 'Are you sure you want to make ' + userName + ' a moderator?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, promote!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Promoted!', userName + ' is now a moderator.', 'success');
            }
        });
    }

    // Promote to Admin
    function handleMakeAdmin(userId, userName) {
        Swal.fire({
            title: 'Promote to Admin?',
            text: 'Are you sure you want to make ' + userName + ' an admin?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, promote!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Promoted!', userName + ' is now an admin.', 'success');
            }
        });
    }

    // Role Badge Generator
    function getRoleBadge(role) {
        if (role === "admin") {
            return <Badge variant="default">Admin</Badge>;
        } else if (role === "moderator") {
            return <Badge variant="secondary">Moderator</Badge>;
        } else {
            return <Badge variant="outline">User</Badge>;
        }
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Manage Users</h1>

            <Card>
                <CardHeader>
                    <CardTitle>All Users</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Joined</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                                    <TableCell>{user.joinedAt}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            {user.role === 'user' && (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white shadow-sm transition-all"
                                                        onClick={() => handleMakeModerator(user.id, user.name)}
                                                    >
                                                        <FaUserCog className="h-4 w-4" />
                                                        <span>Make Moderator</span>
                                                    </Button>

                                                    <Button
                                                        size="sm"
                                                        className="flex items-center gap-2 border border-indigo-500 text-indigo-600 
                                                        bg-indigo-100 hover:bg-indigo-50 shadow-sm transition-all"
                                                        onClick={() => handleMakeAdmin(user.id, user.name)}
                                                    >
                                                        <FaUserShield className="h-4 w-4" />
                                                        <span>Make Admin</span>
                                                    </Button>

                                                </>
                                            )}

                                            {user.role === 'moderator' && (
                                                <Button
                                                        size="sm"
                                                        className="flex items-center gap-2 border border-indigo-500 
                                                        bg-indigo-100 text-indigo-600 hover:bg-indigo-50 shadow-sm transition-all"
                                                        onClick={() => handleMakeAdmin(user.id, user.name)}
                                                    >
                                                        <FaUserShield className="h-4 w-4" />
                                                        <span>Make Admin</span>
                                                    </Button>
                                            )}

                                            {user.role === 'admin' && (
                                                <span className="text-sm font-medium text-green-600">✔ Admin</span>
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

export default ManageUsers;
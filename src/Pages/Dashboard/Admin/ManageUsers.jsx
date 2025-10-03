import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FaUserShield, FaUserCog } from 'react-icons/fa';
import Swal from 'sweetalert2';


const ManageUsers = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const token = localStorage.getItem("access-token");

        fetch("https://app-orbit-server-zeta.vercel.app/users", {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.error(err));
    }, []);
    console.log(users)
    function handleMakeModerator(userId, userName) {
        Swal.fire({
            title: 'Promote to Moderator?',
            text: 'Are you sure you want to make ' + userName + ' a moderator?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, promote!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await fetch(`https://app-orbit-server-zeta.vercel.app/users/${userId}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ role: "moderator" })
                });

                if (res.ok) {

                    Swal.fire('Promoted!', userName + ' is now a moderator.', 'success');
                    setUsers(prevUsers =>
                        prevUsers.map(u =>
                            u._id === userId ? { ...u, role: "moderator" } : u
                        )
                    );
                }
            }
        });
    }


    function handleMakeAdmin(userId, userName) {
        Swal.fire({
            title: 'Promote to Admin?',
            text: 'Are you sure you want to make ' + userName + ' an admin?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, promote!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await fetch(`https://app-orbit-server-zeta.vercel.app/users/${userId}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ role: "admin" })
                });
                if (res.ok) {

                    Swal.fire('Promoted!', userName + ' is now a admin.', 'success');
                    setUsers(prevUsers =>
                        prevUsers.map(u =>
                            u._id === userId ? { ...u, role: "admin" } : u
                        )
                    );
                }
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
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                                    <TableCell>{user.last_login}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            {user.role === 'user' && (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white shadow-sm transition-all"
                                                        onClick={() => handleMakeModerator(user._id, user.name)}
                                                    >
                                                        <FaUserCog className="h-4 w-4" />
                                                        <span>Make Moderator</span>
                                                    </Button>

                                                    <Button
                                                        size="sm"
                                                        className="flex items-center gap-2 border border-indigo-500 text-indigo-600 
                                                        bg-indigo-100 hover:bg-indigo-50 shadow-sm transition-all"
                                                        onClick={() => handleMakeAdmin(user._id, user.name)}
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
                                                    onClick={() => handleMakeAdmin(user._id, user.name)}
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
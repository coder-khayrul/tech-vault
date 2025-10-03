import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FaUsers, FaBox, FaThumbsUp, FaFlag } from 'react-icons/fa';

const Statistics = () => {

    const statsData = [
        {
            title: 'Total Users',
            value: '1,234',
            change: '+12%',
            icon: FaUsers,
            color: 'text-blue-500'
        },
        {
            title: 'Total Products',
            value: '567',
            change: '+8%',
            icon: FaBox,
            color: 'text-green-500'
        },
        {
            title: 'Total Upvotes',
            value: '8,901',
            change: '+15%',
            icon: FaThumbsUp,
            color: 'text-purple-500'
        },
        {
            title: 'Reports',
            value: '23',
            change: '-5%',
            icon: FaFlag,
            color: 'text-red-500'
        }
    ];

    const recentActivity = [
        { action: 'New user registered', time: '2 minutes ago', user: 'john@example.com' },
        { action: 'Product submitted', time: '5 minutes ago', user: 'jane@example.com' },
        { action: 'Product approved', time: '10 minutes ago', user: 'Moderator' },
        { action: 'Report filed', time: '15 minutes ago', user: 'user123' },
        { action: 'New upvote', time: '20 minutes ago', user: 'mike@example.com' }
    ];


    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Statistics Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsData.map((stat, index) => (
                    <Card key={index}>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                                    <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                                        {stat.change} from last month
                                    </p>
                                </div>
                                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Activity */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {recentActivity.map((activity, index) => (
                            <div key={index} className="flex items-center justify-between border-b pb-2">
                                <div>
                                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                                    <p className="text-xs text-muted-foreground">by {activity.user}</p>
                                </div>
                                <p className="text-xs text-muted-foreground">{activity.time}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Charts Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>User Growth</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 flex items-center justify-center bg-muted rounded">
                            <p className="text-muted-foreground">Chart visualization would go here</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Product Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 flex items-center justify-center bg-muted rounded">
                            <p className="text-muted-foreground">Pie chart would go here</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Statistics;
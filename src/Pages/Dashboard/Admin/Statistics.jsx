import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaUsers, FaBox, FaThumbsUp, FaFlag } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Statistics = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]); // if you have a reviewCollection

  useEffect(() => {
    // Fetch all data (replace endpoints with your actual API)
    fetch("https://app-orbit-server-zeta.vercel.app/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));

    fetch("https://app-orbit-server-zeta.vercel.app/all-products")
      .then((res) => res.json())
      .then((data) => setProducts(data));

    fetch("https://app-orbit-server-zeta.vercel.app/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  // Calculations
  const totalUsers = users.length;
  const totalProducts = products.length;
  const totalUpvotes = products.reduce((acc, p) => acc + (p.upvotes || 0), 0);
  const reportedProducts = products.filter((p) => p.reported).length;

  // Product status distribution (example: accepted vs pending vs all)
  const acceptedProducts = products.filter((p) => p.status === "accepted").length;
  const pendingProducts = products.filter((p) => p.status === "pending").length;

  const pieData = [
    { name: "Accepted Products", value: acceptedProducts },
    { name: "Pending Products", value: pendingProducts },
    { name: "All Products", value: totalProducts },
    { name: "Reviews", value: reviews.length },
    { name: "Users", value: totalUsers },
  ];

  const COLORS = ["#3B82F6", "#F59E0B", "#10B981", "#8B5CF6", "#EF4444"];

  const statsData = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: FaUsers,
      color: "text-blue-500",
    },
    {
      title: "Total Products",
      value: totalProducts,
      icon: FaBox,
      color: "text-green-500",
    },
    {
      title: "Total Upvotes",
      value: totalUpvotes,
      icon: FaThumbsUp,
      color: "text-purple-500",
    },
    {
      title: "Reports",
      value: reportedProducts,
      icon: FaFlag,
      color: "text-red-500",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Statistics Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-3">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className=" text-md font-bold text-black">{stat.title}</p>
                  <p style={{ color: COLORS[index % COLORS.length] }} className="text-4xl font-bold">{stat.value}</p>
                
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Site Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Statistics;

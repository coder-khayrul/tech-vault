import React, { use } from 'react';
import { Link, NavLink, useLocation } from 'react-router';

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    useSidebar,
} from '@/components/ui/sidebar';

export function AppSidebar() {
    const sidebar = useSidebar();
    const collapsed = sidebar?.state === 'collapsed';




    return (
        <Sidebar className={collapsed ? 'w-16' : 'w-64'}>
            <SidebarContent>
                <div className='border-b border-b-indigo-100 px-4'>
                    <Link to="/" className="flex items-center space-x-2">
                        <h2 className="font-bold text-[35px] text-indigo-950">Tech<span className='text-indigo-500'>Vault</span></h2>
                    </Link>
                </div>
                <SidebarGroupContent>
                    <SidebarMenu className={"px-4"}>
                        <NavLink to={"/dashboard/overview"}  className={"p-2 hover:bg-gray-100 duration-500 rounded-md border-b border-b-gray-300"}>
                            Overview
                        </NavLink >
                        <NavLink to={"/dashboard/my-profile"}  className={"p-2 hover:bg-gray-100 duration-500 rounded-md border-b border-b-gray-300"}>
                            My Profile
                        </NavLink >
                        <NavLink to={"/dashboard/add-product"} className={"p-2 hover:bg-gray-100 duration-500 rounded-md border-b border-b-gray-300"}>
                            Add Product
                        </NavLink>
                        <NavLink to={"/dashboard/my-products"} className={"p-2 hover:bg-gray-100 duration-500 rounded-md border-b border-b-gray-300"}>
                            My Products
                        </NavLink>

                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarContent>
        </Sidebar>
    );
}

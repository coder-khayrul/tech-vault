import React, { use } from 'react';
import { Outlet } from 'react-router';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { AuthContext } from '../Context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Dashboard() {
  const { user } = use(AuthContext);

  if (!user) {
    return <div>Please log in to access dashboard</div>;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 flex items-center justify-between border-b bg-background px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
            </div>
            {/* <div className="flex items-center gap-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm text-muted-foreground">{user.displayName}</span>
            </div> */}
            <div className="flex items-center space-x-3 px-3 ">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar} alt={user.displayName} />
                <AvatarFallback className="bg-indigo-500 text-white text-[17px]">
                  {user?.displayName?.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-medium text-black">{user.displayName}</p>
              </div>
            </div>
          </header>
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

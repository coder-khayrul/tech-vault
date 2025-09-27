import React, { use } from 'react';
import { Outlet } from 'react-router';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { AuthContext } from '../Context/AuthContext';

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
            <div className="flex items-center gap-4">
              <img
                src={user.image}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm text-muted-foreground">{user.name}</span>
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

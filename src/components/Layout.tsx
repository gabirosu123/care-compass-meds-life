
import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NotesDialog } from "@/components/NotesDialog";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-medical-50 to-health-50 touch-manipulation">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Mobile-optimized Header */}
          <header className="h-16 bg-white/90 backdrop-blur-sm border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 z-40 safe-area-top">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="lg:hidden p-2 -ml-2" />
              <div className="hidden sm:block">
                <h1 className="text-xl lg:text-2xl font-bold gradient-bg bg-clip-text text-transparent">
                  CareCompass
                </h1>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <NotesDialog />
              <Button variant="ghost" size="icon" className="relative h-10 w-10 touch-manipulation">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse-soft"></span>
              </Button>
              <Button variant="ghost" size="icon" className="h-10 w-10 touch-manipulation">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </header>

          {/* Main Content with mobile padding */}
          <main className="flex-1 p-4 sm:p-6 safe-area-bottom">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

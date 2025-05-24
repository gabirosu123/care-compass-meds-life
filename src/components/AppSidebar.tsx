
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Calendar,
  Pill,
  Activity,
  User,
  File,
  Bell,
  Heart,
  Clock
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/", icon: Activity },
  { title: "My Medications", url: "/medications", icon: Pill },
  { title: "Schedule", url: "/schedule", icon: Calendar },
  { title: "Reminders", url: "/reminders", icon: Bell },
  { title: "Health Records", url: "/records", icon: File },
  { title: "Monitoring", url: "/monitoring", icon: Heart },
  { title: "Profile", url: "/profile", icon: User },
];

export function AppSidebar() {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/") {
      return currentPath === "/";
    }
    return currentPath.startsWith(path);
  };

  const getNavClass = (path: string) => {
    const active = isActive(path);
    return `w-full justify-start transition-all duration-200 ${
      active 
        ? "bg-medical-500 text-white hover:bg-medical-600 shadow-md" 
        : "hover:bg-medical-50 text-slate-700 hover:text-medical-700"
    }`;
  };

  return (
    <Sidebar className={`border-r border-gray-200 bg-white/95 backdrop-blur-sm ${collapsed ? "w-16" : "w-64"}`}>
      <SidebarContent className="p-4">
        {/* Logo */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-bg">
            <Heart className="h-6 w-6 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-xl font-bold gradient-bg bg-clip-text text-transparent">
                CareCompass
              </h2>
              <p className="text-xs text-slate-500">Medication Manager</p>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-600 font-medium mb-4">
            {!collapsed && "Main Menu"}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavClass(item.url)}
                      end={item.url === "/"}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && (
                        <span className="ml-3 font-medium">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Stats */}
        {!collapsed && (
          <div className="mt-8 p-4 bg-gradient-to-r from-health-50 to-medical-50 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-slate-800 mb-3">Today's Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Medications</span>
                <span className="font-semibold text-medical-600">3/4</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Next dose</span>
                <span className="font-semibold text-health-600">2:30 PM</span>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}

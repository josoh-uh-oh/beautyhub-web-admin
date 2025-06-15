
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  useSidebar
} from '@/components/ui/sidebar';
import { Building2, Clock, Calendar, Link2, CreditCard } from 'lucide-react';

const menuItems = [
  { id: 'profile', label: 'Salon Profile', icon: Building2 },
  { id: 'hours', label: 'Business Hours', icon: Clock },
  { id: 'booking', label: 'Online Booking', icon: Calendar },
  { id: 'integrations', label: 'Integrations', icon: Link2 },
  { id: 'billing', label: 'Subscription', icon: CreditCard },
];

interface SettingsSidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export const SettingsSidebar = ({ activeView, setActiveView }: SettingsSidebarProps) => {
  const { setOpenMobile, isMobile } = useSidebar();

  const handleItemClick = (id: string) => {
    setActiveView(id);
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar>
      <SidebarContent className="bg-white border-r border-orange-100">
        <SidebarHeader className="p-2">
            <div className="flex items-center space-x-3 p-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">BeautyHub</h1>
              </div>
            </div>
        </SidebarHeader>
        <SidebarMenu className="p-2 pt-4">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                onClick={() => handleItemClick(item.id)}
                isActive={activeView === item.id}
                tooltip={item.label}
                className="data-[active=true]:bg-orange-50 data-[active=true]:text-orange-700 hover:bg-orange-50"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

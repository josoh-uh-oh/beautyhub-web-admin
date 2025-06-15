
import React, { useState } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  useSidebar,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Building2, Clock, Calendar, Link2, CreditCard, LayoutGrid, Package, ClipboardList, Users, Settings, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const menuConfig = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, path: 'dashboard' },
  { 
    id: 'business', 
    label: 'Business', 
    icon: Building2,
    children: [
      { id: 'profile', label: 'Salon Profile', path: 'business/profile' },
      { id: 'hours', label: 'Business Hours', path: 'business/hours' },
      { id: 'booking', label: 'Online Booking', path: 'business/booking' },
    ]
  },
  { id: 'products', label: 'Products', icon: Package, path: 'products' },
  { id: 'services', label: 'Services', icon: ClipboardList, path: 'services' },
  { id: 'staff', label: 'Staff Management', icon: Users, path: 'staff' },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    children: [
      { id: 'integrations', label: 'Integrations', path: 'settings/integrations' },
      { id: 'billing', label: 'Subscription', path: 'settings/billing' },
    ]
  }
];

interface SettingsSidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export const SettingsSidebar = ({ activeView, setActiveView }: SettingsSidebarProps) => {
  const { setOpenMobile, isMobile } = useSidebar();
  const [openMenu, setOpenMenu] = useState('business');

  const handleItemClick = (path: string) => {
    setActiveView(path);
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
          {menuConfig.map((item) => (
            <SidebarMenuItem key={item.id}>
              {item.children ? (
                <Collapsible open={openMenu === item.id} onOpenChange={(isOpen) => setOpenMenu(isOpen ? item.id : '')}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      isActive={activeView.startsWith(item.id)}
                      tooltip={item.label}
                      className="data-[active=true]:bg-orange-50 data-[active=true]:text-orange-700 hover:bg-orange-50 w-full justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </div>
                      <ChevronDown className={cn("h-4 w-4 transition-transform", openMenu === item.id && "rotate-180")} />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub className="ml-0 pl-4 py-1">
                      {item.children.map((child) => (
                        <SidebarMenuSubItem key={child.id}>
                          <SidebarMenuButton
                            onClick={() => handleItemClick(child.path)}
                            isActive={activeView === child.path}
                            tooltip={child.label}
                            className="h-8 data-[active=true]:bg-orange-50 data-[active=true]:text-orange-700 hover:bg-orange-50"
                          >
                           <span>{child.label}</span>
                          </SidebarMenuButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <SidebarMenuButton
                  onClick={() => handleItemClick(item.path)}
                  isActive={activeView === item.path}
                  tooltip={item.label}
                  className="data-[active=true]:bg-orange-50 data-[active=true]:text-orange-700 hover:bg-orange-50"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

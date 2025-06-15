
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { SettingsSidebar } from '@/components/layout/SettingsSidebar';
import { SalonProfileSettings } from '@/components/salon/SalonProfileSettings';
import { BusinessHoursSettings } from '@/components/salon/BusinessHoursSettings';
import { OnlineBookingSettings } from '@/components/salon/OnlineBookingSettings';
import { IntegrationsSettings } from '@/components/salon/IntegrationsSettings';
import { SubscriptionBilling } from '@/components/salon/SubscriptionBilling';

const Index = () => {
  const [activeView, setActiveView] = useState('profile');

  const renderContent = () => {
    switch (activeView) {
      case 'profile':
        return <SalonProfileSettings />;
      case 'hours':
        return <BusinessHoursSettings />;
      case 'booking':
        return <OnlineBookingSettings />;
      case 'integrations':
        return <IntegrationsSettings />;
      case 'billing':
        return <SubscriptionBilling />;
      default:
        return <SalonProfileSettings />;
    }
  };

  const pageConfig = {
    profile: {
      title: "Salon Profile",
      description: "Manage your salon's identity and branding.",
    },
    hours: {
      title: "Business Hours",
      description: "Set your standard business hours and special closures.",
    },
    booking: {
      title: "Online Booking",
      description: "Configure how clients can book appointments online.",
    },
    integrations: {
      title: "Integrations",
      description: "Connect BeautyHub with your favorite tools.",
    },
    billing: {
      title: "Subscription & Billing",
      description: "Manage your BeautyHub subscription and view invoices.",
    }
  };

  const { title, description } = pageConfig[activeView] || pageConfig.profile;

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-gradient-to-br from-orange-50 via-white to-orange-50 flex">
        <SettingsSidebar activeView={activeView} setActiveView={setActiveView} />
        <div className="flex-1 flex flex-col">
          <header className="bg-white border-b border-orange-100 shadow-sm sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                 <div className="flex items-center gap-4">
                    <SidebarTrigger className="lg:hidden" />
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
                        <p className="text-sm text-gray-500">{description}</p>
                    </div>
                 </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Pro Plan
                  </Badge>
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-orange-800">SA</span>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;

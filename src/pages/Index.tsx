
import React, { useState } from 'react';
import { Settings, Building2, Clock, Calendar, Link2, CreditCard } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SalonProfileSettings } from '@/components/salon/SalonProfileSettings';
import { BusinessHoursSettings } from '@/components/salon/BusinessHoursSettings';
import { OnlineBookingSettings } from '@/components/salon/OnlineBookingSettings';
import { IntegrationsSettings } from '@/components/salon/IntegrationsSettings';
import { SubscriptionBilling } from '@/components/salon/SubscriptionBilling';

const Index = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white border-b border-orange-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">BeautyHub</h1>
                <p className="text-sm text-gray-500">Salon Control Center</p>
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings Hub</h1>
          <p className="text-gray-600">
            Configure your salon's operational rules and identity within BeautyHub
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 h-12 bg-white border border-orange-100">
            <TabsTrigger 
              value="profile" 
              className="flex items-center space-x-2 data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700"
            >
              <Building2 className="w-4 h-4" />
              <span className="hidden sm:inline">Salon Profile</span>
            </TabsTrigger>
            <TabsTrigger 
              value="hours" 
              className="flex items-center space-x-2 data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700"
            >
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">Business Hours</span>
            </TabsTrigger>
            <TabsTrigger 
              value="booking" 
              className="flex items-center space-x-2 data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700"
            >
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Online Booking</span>
            </TabsTrigger>
            <TabsTrigger 
              value="integrations" 
              className="flex items-center space-x-2 data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700"
            >
              <Link2 className="w-4 h-4" />
              <span className="hidden sm:inline">Integrations</span>
            </TabsTrigger>
            <TabsTrigger 
              value="billing" 
              className="flex items-center space-x-2 data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700"
            >
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">Subscription</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <SalonProfileSettings />
          </TabsContent>

          <TabsContent value="hours" className="space-y-6">
            <BusinessHoursSettings />
          </TabsContent>

          <TabsContent value="booking" className="space-y-6">
            <OnlineBookingSettings />
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <IntegrationsSettings />
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <SubscriptionBilling />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;


import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, CreditCard, ExternalLink, AlertTriangle, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const IntegrationsSettings = () => {
  const { toast } = useToast();
  const [hpbSettings, setHpbSettings] = useState({
    icalUrl: 'https://calendar.hotpepper.jp/salon/123456/ical',
    lastSynced: '2024-01-15 14:30:00'
  });

  const [stripeSettings, setStripeSettings] = useState({
    isConnected: true,
    accountId: 'acct_1234567890',
    status: 'active'
  });

  const [showDisconnectDialog, setShowDisconnectDialog] = useState(false);

  const handleHpbSync = () => {
    setHpbSettings(prev => ({
      ...prev,
      lastSynced: new Date().toLocaleString()
    }));
    toast({
      title: "Calendar synced",
      description: "Hot Pepper Beauty calendar has been synchronized successfully.",
    });
  };

  const handleStripeConnect = () => {
    // In a real app, this would redirect to Stripe OAuth
    window.open('https://connect.stripe.com/oauth/authorize', '_blank');
    toast({
      title: "Redirecting to Stripe",
      description: "Opening Stripe connection page...",
    });
  };

  const handleStripeDisconnect = () => {
    setStripeSettings({
      isConnected: false,
      accountId: '',
      status: 'disconnected'
    });
    setShowDisconnectDialog(false);
    toast({
      title: "Stripe disconnected",
      description: "Payment processing has been disabled.",
      variant: "destructive"
    });
  };

  const openStripePortal = () => {
    window.open('https://dashboard.stripe.com', '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Integrations</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Hot Pepper Beauty */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-orange-500" />
              <span>Hot Pepper Beauty Calendar Sync</span>
            </CardTitle>
            <CardDescription>
              Automatically sync your Hot Pepper Beauty appointments to prevent double bookings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hpb-ical">Salon Board iCal Feed URL</Label>
              <Input
                id="hpb-ical"
                value={hpbSettings.icalUrl}
                onChange={(e) => setHpbSettings(prev => ({ ...prev, icalUrl: e.target.value }))}
                placeholder="https://calendar.hotpepper.jp/salon/123456/ical"
              />
              <p className="text-sm text-gray-500">
                You can find this URL in your Hot Pepper Beauty Salon Board settings
              </p>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="text-sm font-medium text-gray-900">Last Synced</div>
                <div className="text-sm text-gray-500">
                  {hpbSettings.lastSynced ? new Date(hpbSettings.lastSynced).toLocaleString() : 'Never'}
                </div>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Check className="w-3 h-3 mr-1" />
                Active
              </Badge>
            </div>

            <Button onClick={handleHpbSync} className="w-full bg-orange-500 hover:bg-orange-600">
              Save & Sync Calendar
            </Button>
          </CardContent>
        </Card>

        {/* Stripe Payment Gateway */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-blue-500" />
              <span>Stripe Payment Gateway</span>
            </CardTitle>
            <CardDescription>
              Connect Stripe to process payments for your salon services
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${stripeSettings.isConnected ? 'bg-green-500' : 'bg-gray-300'}`} />
                <div>
                  <div className="font-medium">
                    Status: {stripeSettings.isConnected ? 'Connected' : 'Not Connected'}
                  </div>
                  {stripeSettings.isConnected && (
                    <div className="text-sm text-gray-500">
                      Account ID: {stripeSettings.accountId}
                    </div>
                  )}
                </div>
              </div>
              <Badge variant={stripeSettings.isConnected ? "default" : "secondary"}>
                {stripeSettings.isConnected ? 'Active' : 'Inactive'}
              </Badge>
            </div>

            <div className="space-y-2">
              {stripeSettings.isConnected ? (
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    onClick={openStripePortal}
                    className="w-full"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Manage Stripe Account
                  </Button>
                  
                  <Dialog open={showDisconnectDialog} onOpenChange={setShowDisconnectDialog}>
                    <DialogTrigger asChild>
                      <Button variant="destructive" className="w-full">
                        <X className="w-4 h-4 mr-2" />
                        Disconnect Stripe
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="flex items-center space-x-2">
                          <AlertTriangle className="w-5 h-5 text-red-500" />
                          <span>Disconnect Stripe?</span>
                        </DialogTitle>
                        <DialogDescription>
                          This will prevent you from processing payments through BeautyHub. 
                          Your existing payment history will remain accessible, but you won't 
                          be able to accept new payments until you reconnect. Are you sure?
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowDisconnectDialog(false)}>
                          Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleStripeDisconnect}>
                          Disconnect
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              ) : (
                <Button
                  onClick={handleStripeConnect}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Connect with Stripe
                </Button>
              )}
            </div>

            {!stripeSettings.isConnected && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <strong>Payment processing is disabled.</strong> Connect your Stripe account 
                    to start accepting payments through BeautyHub.
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Additional Integrations Info */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>
              We're working on additional integrations to make your salon management even easier
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-dashed border-gray-300 rounded-lg text-center">
                <div className="w-8 h-8 bg-gray-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-gray-500" />
                </div>
                <div className="font-medium text-gray-900">Google Calendar</div>
                <div className="text-sm text-gray-500">Two-way sync</div>
              </div>
              <div className="p-4 border border-dashed border-gray-300 rounded-lg text-center">
                <div className="w-8 h-8 bg-gray-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-gray-500" />
                </div>
                <div className="font-medium text-gray-900">Square POS</div>
                <div className="text-sm text-gray-500">Payment integration</div>
              </div>
              <div className="p-4 border border-dashed border-gray-300 rounded-lg text-center">
                <div className="w-8 h-8 bg-gray-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <ExternalLink className="w-4 h-4 text-gray-500" />
                </div>
                <div className="font-medium text-gray-900">Instagram</div>
                <div className="text-sm text-gray-500">Portfolio sync</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};


import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Copy, ExternalLink, Globe, Settings, Users, Scissors } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const OnlineBookingSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    leadTime: '2',
    leadTimeUnit: 'hours',
    bookingWindow: '30',
    bookingWindowUnit: 'days',
    cancellationPolicy: 'Cancellations must be made at least 24 hours in advance. Late cancellations may incur a fee.',
    availableServices: ['haircut', 'coloring', 'treatment'],
    availableStaff: ['stylist1', 'stylist2', 'colorist1']
  });

  const bookingUrl = 'https://beautyhub.app/book/sakura-beauty-salon';
  const embedCode = `<iframe src="${bookingUrl}" width="100%" height="600" frameborder="0"></iframe>`;

  const services = [
    { id: 'haircut', name: 'Hair Cut', price: '¥3,000' },
    { id: 'coloring', name: 'Hair Coloring', price: '¥8,000' },
    { id: 'treatment', name: 'Hair Treatment', price: '¥5,000' },
    { id: 'perm', name: 'Perm', price: '¥6,000' },
    { id: 'styling', name: 'Hair Styling', price: '¥2,500' }
  ];

  const staff = [
    { id: 'stylist1', name: 'Yuki Tanaka', role: 'Senior Stylist' },
    { id: 'stylist2', name: 'Mei Sato', role: 'Stylist' },
    { id: 'colorist1', name: 'Ryo Kimura', role: 'Color Specialist' },
    { id: 'assistant1', name: 'Aina Watanabe', role: 'Assistant' }
  ];

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard.`,
    });
  };

  const handleSettingChange = (field: string, value: string | string[]) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const toggleService = (serviceId: string) => {
    setSettings(prev => ({
      ...prev,
      availableServices: prev.availableServices.includes(serviceId)
        ? prev.availableServices.filter(id => id !== serviceId)
        : [...prev.availableServices, serviceId]
    }));
  };

  const toggleStaff = (staffId: string) => {
    setSettings(prev => ({
      ...prev,
      availableStaff: prev.availableStaff.includes(staffId)
        ? prev.availableStaff.filter(id => id !== staffId)
        : [...prev.availableStaff, staffId]
    }));
  };

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your online booking settings have been updated successfully!",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Online Booking Settings</h2>
        <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600">
          Save Settings
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Your Booking Page */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>Your Booking Page</span>
            </CardTitle>
            <CardDescription>
              Share this link with clients or embed the widget on your website
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Your Booking Page URL</Label>
              <div className="flex items-center space-x-2">
                <Input value={bookingUrl} readOnly className="flex-1" />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(bookingUrl, 'Booking URL')}
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(bookingUrl, '_blank')}
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Embed Code (for your website)</Label>
              <div className="relative">
                <Textarea
                  value={embedCode}
                  readOnly
                  className="font-mono text-xs resize-none"
                  rows={3}
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(embedCode, 'Embed code')}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking Rules */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Booking Rules</span>
            </CardTitle>
            <CardDescription>
              Configure how far in advance clients can book and cancellation policies
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Minimum Booking Lead Time</Label>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  value={settings.leadTime}
                  onChange={(e) => handleSettingChange('leadTime', e.target.value)}
                  className="w-20"
                />
                <Select value={settings.leadTimeUnit} onValueChange={(value) => handleSettingChange('leadTimeUnit', value)}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hours">Hours</SelectItem>
                    <SelectItem value="days">Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-sm text-gray-500">
                Minimum time required between booking and appointment
              </p>
            </div>
            <div className="space-y-2">
              <Label>Booking Window</Label>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  value={settings.bookingWindow}
                  onChange={(e) => handleSettingChange('bookingWindow', e.target.value)}
                  className="w-20"
                />
                <Select value={settings.bookingWindowUnit} onValueChange={(value) => handleSettingChange('bookingWindowUnit', value)}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="days">Days</SelectItem>
                    <SelectItem value="weeks">Weeks</SelectItem>
                    <SelectItem value="months">Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-sm text-gray-500">
                How far in advance clients can book
              </p>
            </div>
            <div className="space-y-2">
              <Label>Booking & Cancellation Policy</Label>
              <Textarea
                value={settings.cancellationPolicy}
                onChange={(e) => handleSettingChange('cancellationPolicy', e.target.value)}
                rows={4}
                placeholder="Enter your booking and cancellation policy..."
              />
              <p className="text-sm text-gray-500">
                This text will be displayed to clients on the booking page
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Online Availability */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Scissors className="w-5 h-5" />
              <span>Online Availability</span>
            </CardTitle>
            <CardDescription>
              Choose which services and staff are available for online booking
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>Services Offered Online</Label>
              <div className="grid grid-cols-1 gap-2">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                      settings.availableServices.includes(service.id)
                        ? 'border-orange-300 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => toggleService(service.id)}
                  >
                    <div>
                      <div className="font-medium">{service.name}</div>
                      <div className="text-sm text-gray-500">{service.price}</div>
                    </div>
                    {settings.availableServices.includes(service.id) && (
                      <Badge variant="default" className="bg-orange-500">
                        Available
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                All active services are selected by default. Click to toggle availability.
              </p>
            </div>

            <div className="space-y-3">
              <Label>Staff Available for Online Booking</Label>
              <div className="grid grid-cols-1 gap-2">
                {staff.map((member) => (
                  <div
                    key={member.id}
                    className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                      settings.availableStaff.includes(member.id)
                        ? 'border-orange-300 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => toggleStaff(member.id)}
                  >
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-gray-500">{member.role}</div>
                    </div>
                    {settings.availableStaff.includes(member.id) && (
                      <Badge variant="default" className="bg-orange-500">
                        Available
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                All active staff are selected by default. Click to toggle availability.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

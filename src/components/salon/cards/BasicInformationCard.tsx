
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface BasicInformationCardProps {
  formData: {
    salonName: string;
    phoneNumber: string;
    email: string;
  };
  onInputChange: (field: string, value: string) => void;
}

export const BasicInformationCard = ({ formData, onInputChange }: BasicInformationCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Basic Information</CardTitle>
        <CardDescription>
          Core business information that appears on receipts and client communications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="salonName">Salon Name *</Label>
          <Input
            id="salonName"
            value={formData.salonName}
            onChange={(e) => onInputChange('salonName', e.target.value)}
            required
            placeholder="Enter your salon name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Salon Phone Number *</Label>
          <Input
            id="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => onInputChange('phoneNumber', e.target.value)}
            required
            placeholder="03-1234-5678"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Public Contact Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => onInputChange('email', e.target.value)}
            required
            placeholder="contact@yoursalon.com"
          />
          <p className="text-sm text-gray-500">
            This email will be displayed on your booking widget and receipts
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

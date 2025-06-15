
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AddressCardProps {
  formData: {
    postalCode: string;
    prefecture: string;
    city: string;
    streetAddress: string;
  };
  onInputChange: (field: string, value: string) => void;
  prefectures: Array<{ value: string; label: string }>;
}

export const AddressCard = ({ formData, onInputChange, prefectures }: AddressCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Salon Address</CardTitle>
        <CardDescription>
          Your salon's physical location for client directions and local search
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input
            id="postalCode"
            value={formData.postalCode}
            onChange={(e) => onInputChange('postalCode', e.target.value)}
            placeholder="123-4567"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="prefecture">Prefecture</Label>
          <Select value={formData.prefecture} onValueChange={(value) => onInputChange('prefecture', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select prefecture" />
            </SelectTrigger>
            <SelectContent>
              {prefectures.map((prefecture) => (
                <SelectItem key={prefecture.value} value={prefecture.value}>
                  {prefecture.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">City / Ward / Village</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => onInputChange('city', e.target.value)}
            placeholder="Shibuya City"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="streetAddress">Street Address & Building Name</Label>
          <Input
            id="streetAddress"
            value={formData.streetAddress}
            onChange={(e) => onInputChange('streetAddress', e.target.value)}
            placeholder="1-2-3 Building Name 4F"
          />
        </div>
      </CardContent>
    </Card>
  );
};

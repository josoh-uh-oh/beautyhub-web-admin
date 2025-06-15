
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface RegionalSettingsCardProps {
  timezone: string;
  onInputChange: (field: string, value: string) => void;
}

export const RegionalSettingsCard = ({ timezone, onInputChange }: RegionalSettingsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Regional Settings</CardTitle>
        <CardDescription>
          Configure timezone and currency settings for your salon
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="timezone">Timezone</Label>
          <Select value={timezone} onValueChange={(value) => onInputChange('timezone', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asia-tokyo">Asia/Tokyo (JST)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Currency</Label>
          <div className="p-3 bg-gray-50 rounded-md text-sm text-gray-600">
            JPY (Japanese Yen)
          </div>
          <p className="text-xs text-gray-500">Currency is fixed to JPY for MVP</p>
        </div>
      </CardContent>
    </Card>
  );
};

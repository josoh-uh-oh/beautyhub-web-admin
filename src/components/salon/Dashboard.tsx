
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export const Dashboard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Welcome to your dashboard. Analytics and an overview of your business will be displayed here.</p>
      </CardContent>
    </Card>
  );
};

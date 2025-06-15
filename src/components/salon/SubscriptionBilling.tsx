
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CreditCard, Download, ExternalLink, Crown, Calendar, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const SubscriptionBilling = () => {
  const { toast } = useToast();

  const subscription = {
    plan: 'BeautyHub Pro',
    price: '¥9,800',
    period: 'month',
    nextBilling: '2024-02-15',
    paymentMethod: 'Visa ending in ****1234',
    status: 'active'
  };

  const invoices = [
    { id: 'inv_001', date: '2024-01-15', amount: '¥9,800', status: 'Paid' },
    { id: 'inv_002', date: '2023-12-15', amount: '¥9,800', status: 'Paid' },
    { id: 'inv_003', date: '2023-11-15', amount: '¥9,800', status: 'Paid' },
    { id: 'inv_004', date: '2023-10-15', amount: '¥9,800', status: 'Paid' }
  ];

  const openBillingPortal = () => {
    window.open('https://billing.stripe.com/session/customer_portal', '_blank');
    toast({
      title: "Opening billing portal",
      description: "Redirecting to secure billing management...",
    });
  };

  const downloadInvoice = (invoiceId: string) => {
    toast({
      title: "Downloading invoice",
      description: `Invoice ${invoiceId} download started.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Subscription & Billing</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Current Plan */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Crown className="w-5 h-5 text-orange-500" />
              <span>Current Plan</span>
            </CardTitle>
            <CardDescription>
              Your active BeautyHub subscription and billing details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
              <div>
                <div className="text-lg font-semibold text-orange-900">{subscription.plan}</div>
                <div className="text-sm text-orange-700">Full salon management suite</div>
              </div>
              <Badge className="bg-orange-500 hover:bg-orange-600">
                Active
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Price</span>
                </div>
                <span className="font-medium">
                  {subscription.price} / {subscription.period}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Next Billing Date</span>
                </div>
                <span className="font-medium">
                  {new Date(subscription.nextBilling).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Payment Method</span>
                </div>
                <span className="font-medium">{subscription.paymentMethod}</span>
              </div>
            </div>

            <Button
              onClick={openBillingPortal}
              className="w-full bg-orange-500 hover:bg-orange-600"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Manage Billing & Invoices
            </Button>
          </CardContent>
        </Card>

        {/* Plan Features */}
        <Card>
          <CardHeader>
            <CardTitle>Plan Features</CardTitle>
            <CardDescription>
              What's included in your BeautyHub Pro subscription
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                'Unlimited appointments & bookings',
                'Online booking widget',
                'Staff management',
                'Client database',
                'Payment processing',
                'Inventory tracking',
                'Reports & analytics',
                'Hot Pepper Beauty integration',
                'Priority customer support',
                'Mobile POS application'
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Invoice History */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Invoice History</CardTitle>
            <CardDescription>
              View and download your past billing statements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                    <TableCell className="font-mono text-sm">{invoice.id}</TableCell>
                    <TableCell className="font-medium">{invoice.amount}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="secondary" 
                        className="bg-green-100 text-green-800"
                      >
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadInvoice(invoice.id)}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        PDF
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Billing Support */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
            <CardDescription>
              Having issues with billing or need to make changes to your subscription?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg text-center">
                <CreditCard className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <div className="font-medium">Payment Issues</div>
                <div className="text-sm text-gray-500 mb-3">
                  Problems with payment methods or failed charges
                </div>
                <Button variant="outline" size="sm">
                  Get Help
                </Button>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <Crown className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <div className="font-medium">Plan Changes</div>
                <div className="text-sm text-gray-500 mb-3">
                  Upgrade, downgrade, or cancel your subscription
                </div>
                <Button variant="outline" size="sm">
                  Contact Sales
                </Button>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <Download className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <div className="font-medium">Tax Documents</div>
                <div className="text-sm text-gray-500 mb-3">
                  Download receipts for tax and accounting purposes
                </div>
                <Button variant="outline" size="sm">
                  Download
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

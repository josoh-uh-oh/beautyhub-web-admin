
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, X, Building2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const SalonProfileSettings = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    salonName: 'Sakura Beauty Salon',
    phoneNumber: '03-1234-5678',
    email: 'contact@sakurabeauty.jp',
    postalCode: '150-0001',
    prefecture: 'tokyo',
    city: 'Shibuya City',
    streetAddress: '1-2-3 Shibuya Building 4F',
    timezone: 'asia-tokyo',
    logoUrl: null
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const prefectures = [
    { value: 'tokyo', label: 'Tokyo' },
    { value: 'osaka', label: 'Osaka' },
    { value: 'kyoto', label: 'Kyoto' },
    { value: 'kanagawa', label: 'Kanagawa' },
    { value: 'chiba', label: 'Chiba' },
    { value: 'saitama', label: 'Saitama' },
    { value: 'hokkaido', label: 'Hokkaido' },
    { value: 'aichi', label: 'Aichi' },
    { value: 'hyogo', label: 'Hyogo' },
    { value: 'fukuoka', label: 'Fukuoka' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.match(/^image\/(jpeg|jpg|png)$/)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a JPG or PNG image.",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (2MB max)
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 2MB.",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
        setFormData(prev => ({ ...prev, logoUrl: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogoPreview(null);
    setFormData(prev => ({ ...prev, logoUrl: null }));
  };

  const validateForm = () => {
    const errors = [];
    
    if (!formData.salonName.trim()) {
      errors.push("Salon Name is required");
    }
    
    if (!formData.phoneNumber.trim()) {
      errors.push("Salon Phone Number is required");
    }
    
    if (!formData.email.trim()) {
      errors.push("Public Contact Email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push("Please enter a valid email address");
    }

    return errors;
  };

  const handleSave = async () => {
    const validationErrors = validateForm();
    
    if (validationErrors.length > 0) {
      toast({
        title: "Validation Error",
        description: validationErrors.join(", "),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Saving salon profile data:', formData);
      
      toast({
        title: "Success",
        description: "Salon profile updated successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save salon profile. Please check your inputs and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Salon Profile</h2>
        <Button 
          onClick={handleSave} 
          className="bg-orange-500 hover:bg-orange-600"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Basic Information Section */}
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
                onChange={(e) => handleInputChange('salonName', e.target.value)}
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
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
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
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                placeholder="contact@yoursalon.com"
              />
              <p className="text-sm text-gray-500">
                This email will be displayed on your booking widget and receipts
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Branding Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Branding</CardTitle>
            <CardDescription>
              Upload your salon logo to personalize your booking page and receipts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Salon Logo (Optional)</Label>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                {logoPreview ? (
                  <div className="relative inline-block">
                    <img 
                      src={logoPreview} 
                      alt="Logo preview" 
                      className="max-h-24 mx-auto rounded"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full"
                      onClick={removeLogo}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Building2 className="w-12 h-12 text-gray-400 mx-auto" />
                    <div>
                      <Button variant="outline" asChild>
                        <label htmlFor="logo-upload" className="cursor-pointer">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Logo
                        </label>
                      </Button>
                      <input
                        id="logo-upload"
                        type="file"
                        accept="image/jpeg,image/jpg,image/png"
                        className="hidden"
                        onChange={handleLogoUpload}
                      />
                    </div>
                    <p className="text-sm text-gray-500">
                      Recommended size: 300x100px, max 2MB (JPG, PNG)
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address Section */}
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
                onChange={(e) => handleInputChange('postalCode', e.target.value)}
                placeholder="123-4567"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prefecture">Prefecture</Label>
              <Select value={formData.prefecture} onValueChange={(value) => handleInputChange('prefecture', value)}>
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
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="Shibuya City"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="streetAddress">Street Address & Building Name</Label>
              <Input
                id="streetAddress"
                value={formData.streetAddress}
                onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                placeholder="1-2-3 Building Name 4F"
              />
            </div>
          </CardContent>
        </Card>

        {/* Regional Settings Section */}
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
              <Select value={formData.timezone} onValueChange={(value) => handleInputChange('timezone', value)}>
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
      </div>
    </div>
  );
};

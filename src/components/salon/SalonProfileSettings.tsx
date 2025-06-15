
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { BasicInformationCard } from './cards/BasicInformationCard';
import { BrandingCard } from './cards/BrandingCard';
import { AddressCard } from './cards/AddressCard';
import { RegionalSettingsCard } from './cards/RegionalSettingsCard';

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
        <BasicInformationCard 
          formData={formData}
          onInputChange={handleInputChange}
        />
        
        <BrandingCard 
          logoPreview={logoPreview}
          onLogoUpload={handleLogoUpload}
          onRemoveLogo={removeLogo}
        />
        
        <AddressCard 
          formData={formData}
          onInputChange={handleInputChange}
          prefectures={prefectures}
        />
        
        <RegionalSettingsCard 
          timezone={formData.timezone}
          onInputChange={handleInputChange}
        />
      </div>
    </div>
  );
};

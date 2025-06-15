
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload, X, Building2 } from 'lucide-react';

interface BrandingCardProps {
  logoPreview: string | null;
  onLogoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveLogo: () => void;
}

export const BrandingCard = ({ logoPreview, onLogoUpload, onRemoveLogo }: BrandingCardProps) => {
  return (
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
                  onClick={onRemoveLogo}
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
                    onChange={onLogoUpload}
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
  );
};

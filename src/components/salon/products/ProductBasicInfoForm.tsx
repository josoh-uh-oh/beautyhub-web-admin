
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { ProductFormData } from '@/types/product';
import { useLanguage } from '@/hooks/useLanguage';

interface ProductBasicInfoFormProps {
  register: UseFormRegister<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
}

export const ProductBasicInfoForm = ({ register, errors }: ProductBasicInfoFormProps) => {
  const { t } = useLanguage();
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">{t('productNameLabel')}</Label>
          <Input
            id="name"
            {...register('name')}
            placeholder={t('productNamePlaceholder')}
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="sku">{t('skuLabel')}</Label>
          <Input
            id="sku"
            {...register('sku')}
            placeholder={t('skuPlaceholder')}
          />
          {errors.sku && (
            <p className="text-sm text-red-600">{errors.sku.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">{t('descriptionLabel')}</Label>
        <Textarea
          id="description"
          {...register('description')}
          placeholder={t('descriptionPlaceholder')}
          rows={3}
        />
        {errors.description && (
          <p className="text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>
    </>
  );
};

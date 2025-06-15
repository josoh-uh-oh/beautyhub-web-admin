
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormRegister, UseFormSetValue, UseFormWatch, FieldErrors } from 'react-hook-form';
import { ProductFormData, ProductSupplier } from '@/types/product';
import { useLanguage } from '@/hooks/useLanguage';

interface ProductDetailsFormProps {
  register: UseFormRegister<ProductFormData>;
  setValue: UseFormSetValue<ProductFormData>;
  watch: UseFormWatch<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
  categories: string[];
  suppliers: ProductSupplier[];
}

export const ProductDetailsForm = ({ 
  register, 
  setValue, 
  watch, 
  errors, 
  categories, 
  suppliers 
}: ProductDetailsFormProps) => {
  const selectedSupplier = watch('supplier');
  const status = watch('status');
  const { t } = useLanguage();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">{t('categoryLabel')}</Label>
          <Select
            value={watch('category')}
            onValueChange={(value) => setValue('category', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t('selectCategory')} />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
              <SelectItem value="Hair Care">{t('hairCare')}</SelectItem>
              <SelectItem value="Skin Care">{t('skinCare')}</SelectItem>
              <SelectItem value="Nail Care">{t('nailCare')}</SelectItem>
              <SelectItem value="Makeup">{t('makeup')}</SelectItem>
              <SelectItem value="Tools">{t('tools')}</SelectItem>
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-sm text-red-600">{errors.category.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="brand">{t('brandLabel')}</Label>
          <Input
            id="brand"
            {...register('brand')}
            placeholder={t('brandPlaceholder')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="supplier">{t('supplierLabel')}</Label>
          <Select
            value={selectedSupplier?.id || 'none'}
            onValueChange={(value) => {
              if (value === 'none') {
                setValue('supplier', undefined);
              } else {
                const supplier = suppliers.find(s => s.id === value);
                setValue('supplier', supplier);
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder={t('selectSupplier')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">{t('noSupplierOption')}</SelectItem>
              {suppliers.map(supplier => (
                <SelectItem key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">{t('priceLabel')}</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            {...register('price', { valueAsNumber: true })}
            placeholder="0.00"
          />
          {errors.price && (
            <p className="text-sm text-red-600">{errors.price.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="stockQuantity">{t('stockQuantityLabel')}</Label>
          <Input
            id="stockQuantity"
            type="number"
            {...register('stockQuantity', { valueAsNumber: true })}
            placeholder="0"
          />
          {errors.stockQuantity && (
            <p className="text-sm text-red-600">{errors.stockQuantity.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lowStockThreshold">{t('lowStockAlertLabel')}</Label>
          <Input
            id="lowStockThreshold"
            type="number"
            {...register('lowStockThreshold', { valueAsNumber: true })}
            placeholder="5"
          />
          {errors.lowStockThreshold && (
            <p className="text-sm text-red-600">{errors.lowStockThreshold.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">{t('statusLabel')}</Label>
        <Select
          value={status}
          onValueChange={(value) => setValue('status', value as 'active' | 'inactive' | 'draft')}
        >
          <SelectTrigger>
            <SelectValue placeholder={t('selectStatus')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">{t('active')}</SelectItem>
            <SelectItem value="inactive">{t('inactive')}</SelectItem>
            <SelectItem value="draft">{t('draft')}</SelectItem>
          </SelectContent>
        </Select>
        {errors.status && (
          <p className="text-sm text-red-600">{errors.status.message}</p>
        )}
      </div>
    </>
  );
};

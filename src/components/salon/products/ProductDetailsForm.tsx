
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormRegister, UseFormSetValue, UseFormWatch, FieldErrors } from 'react-hook-form';
import { ProductFormData, ProductSupplier } from '@/types/product';

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

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select
            value={watch('category')}
            onValueChange={(value) => setValue('category', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
              <SelectItem value="Hair Care">Hair Care</SelectItem>
              <SelectItem value="Skin Care">Skin Care</SelectItem>
              <SelectItem value="Nail Care">Nail Care</SelectItem>
              <SelectItem value="Makeup">Makeup</SelectItem>
              <SelectItem value="Tools">Tools</SelectItem>
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-sm text-red-600">{errors.category.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="brand">Brand</Label>
          <Input
            id="brand"
            {...register('brand')}
            placeholder="Enter brand name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="supplier">Supplier</Label>
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
              <SelectValue placeholder="Select supplier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No supplier</SelectItem>
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
          <Label htmlFor="price">Price *</Label>
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
          <Label htmlFor="stockQuantity">Stock Quantity *</Label>
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
          <Label htmlFor="lowStockThreshold">Low Stock Alert</Label>
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
        <Label htmlFor="status">Status *</Label>
        <Select
          value={status}
          onValueChange={(value) => setValue('status', value as 'active' | 'inactive' | 'draft')}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
        {errors.status && (
          <p className="text-sm text-red-600">{errors.status.message}</p>
        )}
      </div>
    </>
  );
};

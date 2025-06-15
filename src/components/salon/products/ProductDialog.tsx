
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Trash2 } from 'lucide-react';
import { Product, ProductFormData, ProductSupplier, ProductVariant } from '@/types/product';

const variantSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Variant name is required'),
  value: z.string().min(1, 'Variant value is required'),
  stockQuantity: z.number().int().min(0, 'Stock quantity must be 0 or greater'),
});

const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().min(1, 'Description is required'),
  sku: z.string().min(1, 'SKU is required'),
  price: z.number().min(0.01, 'Price must be greater than 0'),
  category: z.string().min(1, 'Category is required'),
  brand: z.string().optional(),
  stockQuantity: z.number().int().min(0, 'Stock quantity must be 0 or greater'),
  lowStockThreshold: z.number().int().min(0, 'Low stock threshold must be 0 or greater'),
  status: z.enum(['active', 'inactive', 'draft']),
  variants: z.array(variantSchema),
  supplier: z.object({
    id: z.string(),
    name: z.string(),
    contactEmail: z.string().optional(),
    contactPhone: z.string().optional(),
  }).optional(),
});

interface ProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ProductFormData | { id: string; data: Partial<ProductFormData> }) => void;
  product?: Product | null;
  categories: string[];
  suppliers: ProductSupplier[];
}

export const ProductDialog = ({ isOpen, onClose, onSave, product, categories, suppliers }: ProductDialogProps) => {
  const isEditing = !!product;
  
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: product ? {
      name: product.name,
      description: product.description,
      sku: product.sku,
      price: product.price,
      category: product.category,
      brand: product.brand || '',
      stockQuantity: product.stockQuantity,
      lowStockThreshold: product.lowStockThreshold,
      status: product.status,
      variants: product.variants,
      supplier: product.supplier,
    } : {
      name: '',
      description: '',
      sku: '',
      price: 0,
      category: '',
      brand: '',
      stockQuantity: 0,
      lowStockThreshold: 5,
      status: 'draft' as const,
      variants: [],
      supplier: undefined,
    },
  });

  const { fields: variantFields, append: appendVariant, remove: removeVariant } = useFieldArray({
    control,
    name: 'variants',
  });

  const status = watch('status');
  const selectedSupplier = watch('supplier');

  const addVariant = () => {
    appendVariant({
      id: Date.now().toString(),
      name: '',
      value: '',
      stockQuantity: 0,
    });
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      if (isEditing && product) {
        onSave({ id: product.id, data });
      } else {
        onSave(data);
      }
      reset();
      onClose();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                {...register('name')}
                placeholder="Enter product name"
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="sku">SKU *</Label>
              <Input
                id="sku"
                {...register('sku')}
                placeholder="Enter SKU"
              />
              {errors.sku && (
                <p className="text-sm text-red-600">{errors.sku.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Enter product description"
              rows={3}
            />
            {errors.description && (
              <p className="text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

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
                value={selectedSupplier?.id || ''}
                onValueChange={(value) => {
                  const supplier = suppliers.find(s => s.id === value);
                  setValue('supplier', supplier);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No supplier</SelectItem>
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

          {/* Product Variants Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Product Variants</Label>
              <Button type="button" variant="outline" size="sm" onClick={addVariant}>
                <Plus className="h-4 w-4 mr-2" />
                Add Variant
              </Button>
            </div>
            
            {variantFields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                <div className="space-y-2">
                  <Label>Variant Name</Label>
                  <Input
                    {...register(`variants.${index}.name`)}
                    placeholder="e.g., Size, Color"
                  />
                  {errors.variants?.[index]?.name && (
                    <p className="text-sm text-red-600">{errors.variants[index]?.name?.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label>Variant Value</Label>
                  <Input
                    {...register(`variants.${index}.value`)}
                    placeholder="e.g., Large, Red"
                  />
                  {errors.variants?.[index]?.value && (
                    <p className="text-sm text-red-600">{errors.variants[index]?.value?.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label>Stock</Label>
                  <Input
                    type="number"
                    {...register(`variants.${index}.stockQuantity`, { valueAsNumber: true })}
                    placeholder="0"
                  />
                  {errors.variants?.[index]?.stockQuantity && (
                    <p className="text-sm text-red-600">{errors.variants[index]?.stockQuantity?.message}</p>
                  )}
                </div>
                
                <div className="flex items-end">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeVariant(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-orange-600 hover:bg-orange-700"
            >
              {isSubmitting ? 'Saving...' : (isEditing ? 'Update Product' : 'Create Product')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

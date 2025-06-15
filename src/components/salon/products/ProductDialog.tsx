
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Product, ProductFormData } from '@/types/product';

const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().min(1, 'Description is required'),
  sku: z.string().min(1, 'SKU is required'),
  price: z.number().min(0.01, 'Price must be greater than 0'),
  costPrice: z.number().min(0, 'Cost price must be 0 or greater'),
  category: z.string().min(1, 'Category is required'),
  brand: z.string().optional(),
  stockQuantity: z.number().int().min(0, 'Stock quantity must be 0 or greater'),
  lowStockThreshold: z.number().int().min(0, 'Low stock threshold must be 0 or greater'),
  status: z.enum(['active', 'inactive', 'draft']),
});

interface ProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ProductFormData | { id: string; data: Partial<ProductFormData> }) => void;
  product?: Product | null;
  categories: string[];
}

export const ProductDialog = ({ isOpen, onClose, onSave, product, categories }: ProductDialogProps) => {
  const isEditing = !!product;
  
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: product ? {
      name: product.name,
      description: product.description,
      sku: product.sku,
      price: product.price,
      costPrice: product.costPrice,
      category: product.category,
      brand: product.brand || '',
      stockQuantity: product.stockQuantity,
      lowStockThreshold: product.lowStockThreshold,
      status: product.status,
    } : {
      name: '',
      description: '',
      sku: '',
      price: 0,
      costPrice: 0,
      category: '',
      brand: '',
      stockQuantity: 0,
      lowStockThreshold: 5,
      status: 'draft' as const,
    },
  });

  const status = watch('status');

  const onSubmit = async (data: ProductFormData) => {
    try {
      if (isEditing && product) {
        await onSave({ id: product.id, data });
      } else {
        await onSave(data);
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Selling Price *</Label>
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
              <Label htmlFor="costPrice">Cost Price</Label>
              <Input
                id="costPrice"
                type="number"
                step="0.01"
                {...register('costPrice', { valueAsNumber: true })}
                placeholder="0.00"
              />
              {errors.costPrice && (
                <p className="text-sm text-red-600">{errors.costPrice.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

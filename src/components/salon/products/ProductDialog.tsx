
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Product, ProductFormData, ProductSupplier } from '@/types/product';
import { ProductBasicInfoForm } from './ProductBasicInfoForm';
import { ProductDetailsForm } from './ProductDetailsForm';
import { ProductVariantsForm } from './ProductVariantsForm';
import { useLanguage } from '@/hooks/useLanguage';

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
  const { t } = useLanguage();
  
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
            {isEditing ? t('editProduct') : t('addProductTitle')}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <ProductBasicInfoForm 
            register={register} 
            errors={errors} 
          />

          <ProductDetailsForm
            register={register}
            setValue={setValue}
            watch={watch}
            errors={errors}
            categories={categories}
            suppliers={suppliers}
          />

          <ProductVariantsForm
            register={register}
            errors={errors}
            variantFields={variantFields}
            appendVariant={appendVariant}
            removeVariant={removeVariant}
          />

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              {t('cancel')}
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-orange-600 hover:bg-orange-700"
            >
              {isSubmitting ? t('saving') : (isEditing ? t('updateProduct') : t('createProduct'))}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

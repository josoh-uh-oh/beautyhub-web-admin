
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';
import { UseFormRegister, FieldErrors, UseFieldArrayReturn } from 'react-hook-form';
import { ProductFormData } from '@/types/product';

interface ProductVariantsFormProps {
  register: UseFormRegister<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
  variantFields: UseFieldArrayReturn<ProductFormData, 'variants', 'id'>['fields'];
  appendVariant: UseFieldArrayReturn<ProductFormData, 'variants', 'id'>['append'];
  removeVariant: UseFieldArrayReturn<ProductFormData, 'variants', 'id'>['remove'];
}

export const ProductVariantsForm = ({ 
  register, 
  errors, 
  variantFields, 
  appendVariant, 
  removeVariant 
}: ProductVariantsFormProps) => {
  const addVariant = () => {
    appendVariant({
      id: Date.now().toString(),
      name: '',
      value: '',
      stockQuantity: 0,
    });
  };

  return (
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
  );
};


export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  price?: number;
  sku?: string;
  stockQuantity: number;
}

export interface ProductSupplier {
  id: string;
  name: string;
  contactEmail?: string;
  contactPhone?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  sku: string;
  price: number;
  category: string;
  brand?: string;
  stockQuantity: number;
  lowStockThreshold: number;
  images: string[];
  status: 'active' | 'inactive' | 'draft';
  variants: ProductVariant[];
  supplier?: ProductSupplier;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductCategory {
  id: string;
  name: string;
  description?: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  sku: string;
  price: number;
  category: string;
  brand?: string;
  stockQuantity: number;
  lowStockThreshold: number;
  status: 'active' | 'inactive' | 'draft';
  variants: ProductVariant[];
  supplier?: ProductSupplier;
}

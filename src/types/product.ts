
export interface Product {
  id: string;
  name: string;
  description: string;
  sku: string;
  price: number;
  costPrice: number;
  category: string;
  brand?: string;
  stockQuantity: number;
  lowStockThreshold: number;
  images: string[];
  status: 'active' | 'inactive' | 'draft';
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
  costPrice: number;
  category: string;
  brand?: string;
  stockQuantity: number;
  lowStockThreshold: number;
  status: 'active' | 'inactive' | 'draft';
}

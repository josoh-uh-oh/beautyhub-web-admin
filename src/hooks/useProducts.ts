
import { useState, useCallback } from 'react';
import { Product, ProductFormData, ProductSupplier } from '@/types/product';

// Mock suppliers
const mockSuppliers: ProductSupplier[] = [
  {
    id: '1',
    name: 'Beauty Supply Co.',
    contactEmail: 'orders@beautysupply.com',
    contactPhone: '+1-555-0123',
  },
  {
    id: '2',
    name: 'Professional Hair Products',
    contactEmail: 'sales@profhair.com',
    contactPhone: '+1-555-0456',
  },
];

// Mock data for demonstration
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Hair Shampoo - Keratin Complex',
    description: 'Professional keratin shampoo for damaged hair',
    sku: 'HS-KC-500',
    price: 29.99,
    category: 'Hair Care',
    brand: 'Keratin Pro',
    stockQuantity: 45,
    lowStockThreshold: 10,
    images: ['https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop'],
    status: 'active',
    variants: [
      { id: 'v1', name: 'Size', value: '250ml', stockQuantity: 25 },
      { id: 'v2', name: 'Size', value: '500ml', stockQuantity: 20 },
    ],
    supplier: mockSuppliers[0],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Nail Polish - Ruby Red',
    description: 'Long-lasting gel nail polish in ruby red',
    sku: 'NP-RR-15',
    price: 12.99,
    category: 'Nail Care',
    brand: 'Beauty Nails',
    stockQuantity: 3,
    lowStockThreshold: 5,
    images: ['https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop'],
    status: 'active',
    variants: [
      { id: 'v3', name: 'Finish', value: 'Glossy', stockQuantity: 2 },
      { id: 'v4', name: 'Finish', value: 'Matte', stockQuantity: 1 },
    ],
    supplier: mockSuppliers[1],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  }
];

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const addProduct = useCallback((productData: ProductFormData) => {
    const newProduct: Product = {
      id: Date.now().toString(),
      ...productData,
      images: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setProducts(prev => [newProduct, ...prev]);
    return newProduct;
  }, []);

  const updateProduct = useCallback((id: string, productData: Partial<ProductFormData>) => {
    setProducts(prev => prev.map(product => 
      product.id === id 
        ? { ...product, ...productData, updatedAt: new Date() }
        : product
    ));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  }, []);

  const getProduct = useCallback((id: string) => {
    return products.find(product => product.id === id);
  }, [products]);

  const categories = Array.from(new Set(products.map(p => p.category)));
  const suppliers = mockSuppliers;

  return {
    products: filteredProducts,
    allProducts: products,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    statusFilter,
    setStatusFilter,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    categories,
    suppliers,
  };
};

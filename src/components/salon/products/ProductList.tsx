
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Edit, Trash2, AlertTriangle, Package } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Product } from '@/types/product';
import { useLanguage } from '@/hooks/useLanguage';

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export const ProductList = ({ products, onEdit, onDelete }: ProductListProps) => {
  const { t, language } = useLanguage();

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      draft: 'bg-yellow-100 text-yellow-800',
    };
    return variants[status as keyof typeof variants] || variants.draft;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(language === 'jp' ? 'ja-JP' : 'en-US', {
      style: 'currency',
      currency: language === 'jp' ? 'JPY' : 'USD',
    }).format(price);
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">{t('noProductsFound')}</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('product')}</TableHead>
            <TableHead>{t('sku')}</TableHead>
            <TableHead>{t('category')}</TableHead>
            <TableHead>{t('price')}</TableHead>
            <TableHead>{t('stock')}</TableHead>
            <TableHead>{t('variants')}</TableHead>
            <TableHead>{t('supplier')}</TableHead>
            <TableHead>{t('status')}</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="flex items-center space-x-3">
                  {product.images[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                      <Package className="h-5 w-5 text-gray-400" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500 truncate max-w-xs">
                      {product.description}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-mono text-sm">{product.sku}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{formatPrice(product.price)}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <span>{product.stockQuantity}</span>
                  {product.stockQuantity <= product.lowStockThreshold && (
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </TableCell>
              <TableCell>
                {product.variants.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {product.variants.slice(0, 2).map((variant, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {variant.name}: {variant.value}
                      </Badge>
                    ))}
                    {product.variants.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{product.variants.length - 2}
                      </Badge>
                    )}
                  </div>
                ) : (
                  <span className="text-gray-400 text-sm">{t('noVariants')}</span>
                )}
              </TableCell>
              <TableCell>
                {product.supplier ? (
                  <span className="text-sm">{product.supplier.name}</span>
                ) : (
                  <span className="text-gray-400 text-sm">{t('noSupplier')}</span>
                )}
              </TableCell>
              <TableCell>
                <Badge className={getStatusBadge(product.status)}>
                  {t(product.status as 'active' | 'inactive' | 'draft')}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(product)}>
                      <Edit className="h-4 w-4 mr-2" />
                      {t('edit')}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => onDelete(product.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      {t('delete')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

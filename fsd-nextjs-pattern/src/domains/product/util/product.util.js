import { PRODUCT_CATEGORIES } from '../schema/product.schema';

export const formatPrice = (price) => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(price);
};

export const calculateDiscount = (price, discountPercent) => {
  return Math.floor(price * (1 - discountPercent / 100));
};

export const filterProductsByPrice = (products, minPrice, maxPrice) => {
  return products.filter(p => p.price >= minPrice && p.price <= maxPrice);
};

export const sortProductsByPrice = (products, order = 'asc') => {
  return [...products].sort((a, b) => {
    return order === 'asc' ? a.price - b.price : b.price - a.price;
  });
};

export const getProductStockStatus = (stock) => {
  if (stock === 0) return 'out-of-stock';
  if (stock <= 10) return 'low-stock';
  return 'in-stock';
};

export const calculateCartTotal = (cart) => {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const validateProductData = (data) => {
  if (!data.name || data.name.length < 2) {
    throw new Error('Product name must be at least 2 characters');
  }
  if (!data.price || data.price <= 0) {
    throw new Error('Price must be greater than 0');
  }
  if (!Object.values(PRODUCT_CATEGORIES).includes(data.category)) {
    throw new Error('Invalid category');
  }
  if (data.stock < 0) {
    throw new Error('Stock cannot be negative');
  }
  return true;
};

export const isProductInStock = (product) => {
  return product.stock > 0;
};

export const isProductLowStock = (product, threshold = 10) => {
  return product.stock > 0 && product.stock <= threshold;
};

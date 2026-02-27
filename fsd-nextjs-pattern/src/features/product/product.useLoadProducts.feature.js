import { useState, useEffect } from 'react';
import { fetchProducts } from '@/domains/product/api/product.api';
import { productRepository } from '@/domains/product/store/product.repository';

export const useLoadProducts = () => {
  const products = productRepository.useStates(state => state.products);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const products = await fetchProducts();
      productRepository.setState({ products });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return { products, loading, error, refetch: loadProducts };
};

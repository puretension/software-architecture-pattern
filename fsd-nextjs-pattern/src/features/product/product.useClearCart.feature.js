import { productRepository } from '@/domains/product/store/product.repository';

export const useClearCart = () => {
  const handleClear = () => {
    productRepository.setState({ cart: [] });
  };

  return { clearCart: handleClear };
};

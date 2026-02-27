import { productRepository } from '@/domains/product/store/product.repository';
import { isProductInStock } from '@/domains/product/util/product.util';

export const useAddToCart = () => {
  const handleAddToCart = (product) => {
    if (!isProductInStock(product)) {
      throw new Error('Product is out of stock');
    }
    
    const { cart } = productRepository.getState();
    const existing = cart.find(item => item.id === product.id);
    
    if (existing) {
      productRepository.setState({
        cart: cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      productRepository.setState({
        cart: [...cart, { ...product, quantity: 1 }],
      });
    }
  };

  return { addToCart: handleAddToCart };
};

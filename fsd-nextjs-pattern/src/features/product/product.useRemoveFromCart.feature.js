import { productRepository } from '@/domains/product/store/product.repository';

export const useRemoveFromCart = () => {
  const cart = productRepository.useStates(state => state.cart);

  const handleRemove = (id) => {
    const { cart } = productRepository.getState();
    productRepository.setState({
      cart: cart.filter(item => item.id !== id),
    });
  };

  return { cart, removeFromCart: handleRemove };
};

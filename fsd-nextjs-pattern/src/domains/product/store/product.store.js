import { create } from 'zustand';

/**
 * 상품 전역 상태 선언 (Store)
 * @author (작성자)
 */
export const useProductStore = create(() => ({
  products: [],
  selectedProduct: null,
  cart: [],
}));

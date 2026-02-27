import { create } from 'zustand';

/**
 * 전역 상태 선언 (Store)
 * @author (작성자)
 */
export const useSampleStore = create((set) => ({
  numberState: 0,
  stringState: 'initial string state',
}));

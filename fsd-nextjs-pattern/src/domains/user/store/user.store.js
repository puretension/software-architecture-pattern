import { create } from 'zustand';

/**
 * 사용자 전역 상태 선언 (Store)
 * @author (작성자)
 */
export const useUserStore = create(() => ({
  users: [],
  currentUser: null,
}));

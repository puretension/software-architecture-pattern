import { useUserStore } from './user.store';

/**
 * 사용자 상태 접근용 레포지토리
 * @author (작성자)
 */
export const userRepository = {
  /** 비즈니스 로직에서 사용하는 현재 상태 가져오기 (.feature 파일) */
  getState: () => useUserStore.getState(),
  
  /** 비즈니스 로직에서 상태 업데이트하기 (.feature 파일) */
  setState: (state) => useUserStore.setState(state),
  
  /** 컴포넌트 내부에서 리액트 상태로 구독할 때 (UI 파일) */
  useStates: (selector) => useUserStore(selector),
};

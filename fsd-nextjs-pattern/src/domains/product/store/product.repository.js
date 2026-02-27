import { useProductStore } from './product.store';

/**
 * 상품 상태 접근용 레포지토리
 * @author (작성자)
 */
export const productRepository = {
  /** 비즈니스 로직에서 사용하는 현재 상태 가져오기 (.feature 파일) */
  getState: () => useProductStore.getState(),
  
  /** 비즈니스 로직에서 상태 업데이트하기 (.feature 파일) */
  setState: (state) => useProductStore.setState(state),
  
  /** 컴포넌트 내부에서 리액트 상태로 구독할 때 (UI 파일) */
  useStates: (selector) => useProductStore(selector),
};

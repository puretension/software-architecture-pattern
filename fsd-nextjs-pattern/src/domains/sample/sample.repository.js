import { useSampleStore } from './sample.store';

/**
 * 상태 접근용 레포지토리 (UI와 비즈니스 로직의 분리를 위해 사용)
 * @author (작성자)
 */
export const sampleRepo = {
  /** 비즈니스 로직에서 사용하는 현재 상태 가져오기 (.feature 파일) */
  getState: () => useSampleStore.getState(),
  
  /** 비즈니스 로직에서 상태 업데이트하기 (.feature 파일) */
  setState: (state) => useSampleStore.setState(state),
  
  /** 컴포넌트 내부에서 리액트 상태로 구독할 때 (UI 파일) */
  useStates: (selector) => useSampleStore(selector),
};

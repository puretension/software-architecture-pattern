import { sampleRepo } from '@/domains/sample/sample.repository';

/**
 * 숫자가 5보다 큰지 여부를 구독하는 Custom Hook
 * @author (작성자)
 */
export function useIsNumberOverFive() {
  const numberState = sampleRepo.useStates((state) => state.numberState);
  return numberState > 5;
}

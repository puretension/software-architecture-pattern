import { sampleRepo } from '@/domains/sample/sample.repository';

/**
 * 숫자를 1 증가시킵니다.
 * @author (작성자)
 */
export function increaseNumber() {
  const { numberState } = sampleRepo.getState();
  sampleRepo.setState({ numberState: numberState + 1 });
}

/**
 * 숫자를 1 감소시킵니다.
 * @author (작성자)
 */
export function decreaseNumber() {
  const { numberState } = sampleRepo.getState();
  sampleRepo.setState({ numberState: numberState - 1 });
}

# 8. 컴포넌트 내부 배치 순서

`.jsx` (혹은 `.tsx`) 파일의 컴포넌트 내부에서, 상태값, 상수, 함수 등은 **반드시 정해진 순서대로 선언**합니다. 순서가 중요한 이유는 **나중에 정의되는 객체가 앞서 정의된 객체에 의존성**을 가질 수 있기 때문입니다.

## 권장되는 선언 순서
1. `useState`, `useRef` 및 기본 내장/커스텀 훅
2. 전역 상태값 구독 (`zustand`, Redux 등 라이브러리)
3. 지역 상태값 구독 (`Context.Provider`)
4. 1~3번에 의해 조합/유도된 상태값 (`const isLoaded = count > 0;`)
5. UI / 사용자 상호작용 함수 (`handle~`, `onClick~` 등 앞선 상태들을 사용)
6. `useEffect` (side-effects 처리. 앞서 선언된 상태, 함수를 dependency 로 가짐)
7. 랜더링 파트 (`return (...)`)

## 예시
```javascript
// ✅ Good
import { useState, useEffect } from 'react';
import { useUserStore } from '@/domains/user/user.repository';
import { useSomePageContext } from '@/app-configs/someContext';

export function SomePage() {
  // 1. 기본 훅
  const [count, setCount] = useState(0);

  // 2. 전역 상태값 (zustand)
  const edge = useUserStore((state) => state.edge);
  
  // 3. 지역 상태값
  const { isLoading } = useSomePageContext();
  
  // 4. 의존/유도된 상태 (1, 2, 3번에 의존)
  const isCountOverEdge = count > edge;
  const countMutable = isLoading === false;
  
  // 5. 사용자 상호 작용/UI 로직 함수 (1~4번에 의존)
  function onPressBottomButton() {
    if (isLoading || isCountOverEdge) return;
    setCount((prev) => prev + 1);
  }
  
  // 6. useEffect (1~5번 상태 및 함수에 의존)
  useEffect(() => {
    onPressBottomButton();
  }, [edge, isCountOverEdge]); // eslint 등의 검증 통과를 위해서라도 순서가 중요함

  // 7. 반환(Render) 구문
  return (
    <div>
      <p>{count}</p>
      <button disabled={!countMutable} onClick={onPressBottomButton}>Click!</button>
    </div>
  );
}
```

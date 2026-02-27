# 2. Global State Management

이 문서는 Zustand를 활용한 전역 상태 선언 및 비즈니스 로직 연동 방법에 대한 가이드라인입니다.

## 상태 선언 및 Repository 패턴

1. **상태(Store) 정의**
   - 전역적으로 컴포넌트 간 공유될 상태나 값은 `zustand` 라이브러리를 사용하여 정의합니다.
   
   ```javascript
   // src/domains/sample/sample.store.js
   import { create } from 'zustand';
   
   export const useSampleStore = create((set) => ({
     numberState: 0,
     stringState: 'initial string state',
   }));
   ```

2. **Repository 구성 (구현 세부사항 캡슐화)**
   - 선언한 Store의 상태를 직접 비즈니스 로직 파트나 컴포넌트에서 가져다 쓰면 라이브러리 문법 종속성이 너무 강해집니다.
   - 이를 해결하기 위해 `getState`, `setState`, `useStates`를 감싸는 Wrapper 객체를 생성합니다.

   ```javascript
   // src/domains/sample/sample.repository.js
   import { useSampleStore } from './sample.store';
   
   export const sampleRepo = {
     /** .feature.ts 비즈니스 로직 파트에서 사용 */
     getState: () => useSampleStore.getState(),
     
     /** .feature.ts 비즈니스 로직에서 스토어를 갱신할 때 사용 */
     setState: (state) => useSampleStore.setState(state),
     
     /** UI(컴포넌트)에서 React 상태로 구독하고자 할 때 사용 */
     useStates: (selector) => useSampleStore(selector),
   };
   ```

## 비즈니스 로직(Feature) 구현
- 상태 변경이 필요한 로직은 컴포넌트 외부에 `**features**` 레이어 함수로 구현하여 순수 자바스크립트에 가깝게 작성합니다.
- `repo`의 `getState`/`setState`를 사용합니다.

```javascript
// src/features/sample/sample.increaseNumber.feature.js
import { sampleRepo } from '@/domains/sample/sample.repository';

export function increaseNumber() {
  const { numberState } = sampleRepo.getState();
  sampleRepo.setState({ numberState: numberState + 1 });
}

export function decreaseNumber() {
  const { numberState } = sampleRepo.getState();
  sampleRepo.setState({ numberState: numberState - 1 });
}

// src/features/sample/sample.useIsNumberOverFive.feature.js
export function useIsNumberOverFive() {
  const { numberState } = sampleRepo.useStates((state) => ({
    numberState: state.numberState,
  }));
  return numberState > 5;
}
```

## UI 연동 (Provider 혹은 Pages/Widgets)
- 컴포넌트 안에서는 `features`에 작성된 액션과 유도 상태를 활용합니다.
- View 단은 최소한의 로직만 가지며, 디자인에 초점을 맞춥니다.

```javascript
// src/app/sample/page.jsx
import { Button, Typography, Stack } from '@mui/material';
import { sampleRepo } from '@/domains/sample/sample.repository';
import { increaseNumber, decreaseNumber, useIsNumberOverFive } from '@/features/sample';

export default function SamplePage() {
  // Zustand hook으로 컴포넌트 랜더링 상태 구독
  const numberState = sampleRepo.useStates((state) => state.numberState);
  
  // Custom Feature 훅을 통한 파생 상태
  const isNumberOverFive = useIsNumberOverFive();

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Typography variant="h6">{numberState}</Typography>
      
      <Button variant="contained" onClick={increaseNumber}>
         + 
      </Button>
      <Button variant="contained" onClick={decreaseNumber}>
         - 
      </Button>
      
      <Typography variant="body1">
        is number over 5: {isNumberOverFive.toString()}
      </Typography>
    </Stack>
  );
}
```

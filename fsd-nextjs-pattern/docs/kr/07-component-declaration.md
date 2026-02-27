# 7. 함수 및 컴포넌트 선언 규칙

꼭 필요한 경우가 아니라면 함수와 React 컴포넌트는 **화살표 함수 선언을 지양하고 `function` 키워드**로 선언합니다.

## 이유 및 가이드라인
1. **시각적 분리**: 상수(`const`) 역할을 하는 객체들과 함수 역할을 하는 객체를 시각적으로 쉽게 구별할 수 있습니다.
2. **호이스팅 활용**: `function` 키워드는 자바스크립트 실행 시 호이스팅(hoisting)되므로, 객체를 정의하기 전 코드 상단에서도 자유롭게 호출하여 로직 배치를 유연하게 가져갈 수 있습니다.
   - 반면, `const foo = () => {}` 형태로 정의한 함수는 선언 전에 호출 시 에러(`ReferenceError` 등 잠재적 버그)를 발생시킬 위험이 있습니다.

```javascript
// ✅ Good

const currentState = getCurrentState(); // 함수 선언 전에도 호출 가능! (호이스팅)

/** */
function getCurrentState() {
  return 'GREEN';
}

/** */
export function SomeComponent() {
  return <div />;
}
```

```javascript
// ❌ Bad

// 🚨 에러 발생: Cannot access 'getCurrentState' before initialization
const currentState = getCurrentState();

/** */
const getCurrentState = () => {
  return 'RED';
}

/** */
export const SomeComponent = () => {
  return <div />;
}
```

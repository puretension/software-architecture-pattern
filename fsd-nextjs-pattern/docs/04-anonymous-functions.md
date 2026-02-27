# 4. 복잡한 조건 상수 및 익명 함수 활용

상수 값이 조건에 따라 여러 개로 분리되는 경우, 삼항 연산자를 중첩해서 가독성을 떨어뜨리기보다 **익명 함수(IIFE - Immediately Invoked Function Expression)를 활용**하여 가독성을 높입니다.

## 가이드라인
- 삼항 연산자가 중첩되면 추후 유지보수 시 상태를 파악하기 어려워집니다. `if-else` 블록이 들어간 함수를 통해 상태를 명확히 선언하고 반환(return)하세요.

```javascript
// ✅ Good

/** */
const value = Math.random() * 15 - 5;

/** */
const valueStatus = (() => {
  if (value < 0) return 'UNDER_ZERO';
  else if (value < 5) return 'NOT_BAD';
  else if (value < 8) return 'NICE';
  else return 'SUPERB';
})();
```

```javascript
// ❌ Bad

/** */
const value = Math.random() * 15 - 5;

/** */
const valueStatus = value < 0
  ? 'UNDER_ZERO'
  : value < 5
    ? 'NOT_BAD'
    : value < 8
      ? 'NICE'
      : 'SUPERB';
```

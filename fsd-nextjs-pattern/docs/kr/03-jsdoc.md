# 3. JSDoc 주석 작성 규칙

모든 상수와 함수에는 명시적으로 JSDoc을 작성합니다. (코드 가독성 향상)

## 가이드라인
- 시간이 부족하여 상세한 주석을 달지 못하는 경우나, 이름만으로 직관적이어서 주석이 무의미해 보이는 경우에도 **가독성과 통일성을 위하여 빈 JSDoc(`/** */`)을 유지해 주세요.**

```javascript
// ✅ Good

/**
 * 사용자 세션을 갱신하지만, 급하게 구현된 임시 함수입니다.
 * @author 도형
 */
function refreshUserSession() {
  // ...
}

/** */ 
// 설명이 필요없을 정도로 간단하더라도 빈 JSDoc 을 달아둡니다.
const MINUTE_IN_MS = 1000 * 60;
```

```javascript
// ❌ Bad

const someConst = 1000 * 60;

function alsoIDontKnow() {
  // ...
}
```

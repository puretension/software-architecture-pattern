# 5. Export Default 규칙

일반적으로 `export default`의 사용을 지양하며 Named Export(`export function`, `export const`)를 사용합니다. 단, Next.js의 App Router 처럼 반드시 사용해야 하는 경우 **함수 선언부에 `export default` 를 함께 동일한 줄에 작성합니다.**

## 가이드라인
- 의존성 관리 및 코드 리팩토링 시 이름이 보장되는 Named Export 를 권장합니다. 
- 함수 정의부와 Export 구문이 코드 상단/하단으로 분리되면 수정 범위 파악이 힘들어집니다. 동일한 줄에 묶어 가독성을 높이세요.

```javascript
// ✅ Good

// 일반 컴포넌트: Named Export 권장
/** */
export function SomeComponent() {
  return <div />;
}

// Next.js App Router용 페이지 컴포넌트: 한 줄에 함께 명시
/** */
export default function SomeAppRouterPage() {
  return <main />;
}
```

```javascript
// ❌ Bad

// 함수 정의부와 export 구문이 분리되어 있으면 파일이 길어질 때 불편
/** */
function SomeAppRouterPage() {
  return <main />;
}

export default SomeAppRouterPage;
```

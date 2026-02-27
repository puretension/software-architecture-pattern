# 5. Export Default Rules

Generally avoid using `export default` and use Named Export (`export function`, `export const`). However, when it must be used (like Next.js App Router), **write `export default` on the same line as the function declaration.**

## Guidelines
- Named Export is recommended for dependency management and code refactoring as it guarantees names.
- When function definition and export statement are separated at top/bottom of code, it becomes difficult to identify modification scope. Keep them on the same line for better readability.

```javascript
// ✅ Good

// Regular component: Named Export recommended
/** */
export function SomeComponent() {
  return <div />;
}

// Next.js App Router page component: specify together on one line
/** */
export default function SomeAppRouterPage() {
  return <main />;
}
```

```javascript
// ❌ Bad

// Separating function definition and export statement is inconvenient when file gets long
/** */
function SomeAppRouterPage() {
  return <main />;
}

export default SomeAppRouterPage;
```

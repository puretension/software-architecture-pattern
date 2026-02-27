# 4. Complex Conditional Constants and Anonymous Functions

When constant values are split into multiple cases based on conditions, use **anonymous functions (IIFE - Immediately Invoked Function Expression)** to improve readability rather than nesting ternary operators.

## Guidelines
- Nested ternary operators make it difficult to understand state during maintenance. Use functions with `if-else` blocks to clearly declare and return states.

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

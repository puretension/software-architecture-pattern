# 7. Function and Component Declaration Rules

Unless absolutely necessary, functions and React components should **avoid arrow function declarations and use the `function` keyword**.

## Reasons and Guidelines
1. **Visual Separation**: Easily distinguish between objects serving as constants (`const`) and objects serving as functions.
2. **Hoisting Utilization**: The `function` keyword is hoisted during JavaScript execution, allowing flexible logic placement by freely calling functions even before object definitions.
   - In contrast, functions defined as `const foo = () => {}` risk causing errors (`ReferenceError` and potential bugs) when called before declaration.

```javascript
// ✅ Good

const currentState = getCurrentState(); // Can call before function declaration! (hoisting)

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

// 🚨 Error: Cannot access 'getCurrentState' before initialization
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

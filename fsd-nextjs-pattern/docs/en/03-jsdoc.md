# 3. JSDoc Comment Rules

All constants and functions must have explicit JSDoc comments (improves code readability).

## Guidelines
- Even when time is limited or the name is self-explanatory making comments seem unnecessary, **maintain empty JSDoc (`/** */`) for readability and consistency.**

```javascript
// ✅ Good

/**
 * Refreshes user session, but this is a temporary function implemented hastily.
 * @author Dohyeong
 */
function refreshUserSession() {
  // ...
}

/** */ 
// Even if simple enough not to need explanation, keep empty JSDoc
const MINUTE_IN_MS = 1000 * 60;
```

```javascript
// ❌ Bad

const someConst = 1000 * 60;

function alsoIDontKnow() {
  // ...
}
```

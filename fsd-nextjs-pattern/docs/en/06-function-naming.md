# 6. Function Naming Rules

Function names are written in `camelCase`, starting with a **verb** or **adverb** to clearly indicate what action is performed or in what situation it is called.

## Guidelines
- **Starting with a verb**: Use the action the function will perform (fetch, save, create, calculate, etc.) as the first word.
- **Starting with an adverb**: Event Handlers (e.g., when clicked, when submitted) are usually named with `on` or `handle` followed by the action timing.

```javascript
// ✅ Good

/** Fetches user information. */
function fetchUserInfo() {
  // ...
}

/** Called when form is submitted. */
function handleFormSubmit() {
  // ...
}

/** Performs validation. */
function validateUserInput() {
  // ...
}
```

```javascript
// ❌ Bad

// Only nouns combined, no verb (role) visible
function userPassword() {
  // ... // Can't tell if it fetches or sets password
}

// Ambiguous action (hard to understand what it does at a glance)
function doAuth() {
  // ... // Can't tell if it's auth check, login, or logout
}
```

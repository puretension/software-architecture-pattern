# 8. Component Internal Ordering

Within `.jsx` (or `.tsx`) file components, state values, constants, and functions **must be declared in a specific order**. Order is important because **objects defined later may have dependencies on objects defined earlier**.

## Recommended Declaration Order
1. `useState`, `useRef`, and basic built-in/custom hooks
2. Global state subscription (`zustand`, Redux, etc.)
3. Local state subscription (`Context.Provider`)
4. Derived/computed state from 1-3 (`const isLoaded = count > 0;`)
5. UI / user interaction functions (`handle~`, `onClick~`, etc. using previous states)
6. `useEffect` (side-effects processing, having previously declared states and functions as dependencies)
7. Rendering part (`return (...)`)

## Example
```javascript
// ✅ Good
import { useState, useEffect } from 'react';
import { useUserStore } from '@/domains/user/user.repository';
import { useSomePageContext } from '@/app-configs/someContext';

export function SomePage() {
  // 1. Basic hooks
  const [count, setCount] = useState(0);

  // 2. Global state (zustand)
  const edge = useUserStore((state) => state.edge);
  
  // 3. Local state
  const { isLoading } = useSomePageContext();
  
  // 4. Dependent/derived state (depends on 1, 2, 3)
  const isCountOverEdge = count > edge;
  const countMutable = isLoading === false;
  
  // 5. User interaction/UI logic functions (depends on 1-4)
  function onPressBottomButton() {
    if (isLoading || isCountOverEdge) return;
    setCount((prev) => prev + 1);
  }
  
  // 6. useEffect (depends on states and functions from 1-5)
  useEffect(() => {
    onPressBottomButton();
  }, [edge, isCountOverEdge]); // Order is important for eslint validation

  // 7. Return (Render) statement
  return (
    <div>
      <p>{count}</p>
      <button disabled={!countMutable} onClick={onPressBottomButton}>Click!</button>
    </div>
  );
}
```

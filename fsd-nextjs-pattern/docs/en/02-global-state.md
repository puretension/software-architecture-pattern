# 2. Global State Management

This document provides guidelines for declaring global state using Zustand and integrating business logic.

## State Declaration and Repository Pattern

1. **State (Store) Definition**
   - Global state shared across components is defined using the `zustand` library.
   
   ```javascript
   // src/domains/sample/sample.store.js
   import { create } from 'zustand';
   
   export const useSampleStore = create((set) => ({
     numberState: 0,
     stringState: 'initial string state',
   }));
   ```

2. **Repository Structure (Encapsulating Implementation Details)**
   - Directly using Store state in business logic or components creates strong library syntax dependency.
   - To solve this, create a wrapper object that encapsulates `getState`, `setState`, and `useStates`.

   ```javascript
   // src/domains/sample/sample.repository.js
   import { useSampleStore } from './sample.store';
   
   export const sampleRepo = {
     /** Used in .feature.js business logic */
     getState: () => useSampleStore.getState(),
     
     /** Used to update store in .feature.js business logic */
     setState: (state) => useSampleStore.setState(state),
     
     /** Used to subscribe as React state in UI (components) */
     useStates: (selector) => useSampleStore(selector),
   };
   ```

## Business Logic (Feature) Implementation
- Logic requiring state changes is implemented as `**features**` layer functions outside components, written close to pure JavaScript.
- Uses `repo`'s `getState`/`setState`.

```javascript
// src/features/sample/sample.increaseNumber.feature.js
import { sampleRepo } from '@/domains/sample/sample.repository';

export function increaseNumber() {
  const { numberState } = sampleRepo.getState();
  sampleRepo.setState({ numberState: numberState + 1 });
}

export function decreaseNumber() {
  const { numberState } = sampleRepo.getState();
  sampleRepo.setState({ numberState: numberState - 1 });
}

// src/features/sample/sample.useIsNumberOverFive.feature.js
export function useIsNumberOverFive() {
  const { numberState } = sampleRepo.useStates((state) => ({
    numberState: state.numberState,
  }));
  return numberState > 5;
}
```

## UI Integration (Provider or Pages/Widgets)
- Components use actions and derived states written in `features`.
- View layer has minimal logic and focuses on design.

```javascript
// src/app/sample/page.jsx
import { Button, Typography, Stack } from '@mui/material';
import { sampleRepo } from '@/domains/sample/sample.repository';
import { increaseNumber, decreaseNumber, useIsNumberOverFive } from '@/features/sample';

export default function SamplePage() {
  // Subscribe to component rendering state with Zustand hook
  const numberState = sampleRepo.useStates((state) => state.numberState);
  
  // Derived state through custom feature hook
  const isNumberOverFive = useIsNumberOverFive();

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Typography variant="h6">{numberState}</Typography>
      
      <Button variant="contained" onClick={increaseNumber}>
         + 
      </Button>
      <Button variant="contained" onClick={decreaseNumber}>
         - 
      </Button>
      
      <Typography variant="body1">
        is number over 5: {isNumberOverFive.toString()}
      </Typography>
    </Stack>
  );
}
```

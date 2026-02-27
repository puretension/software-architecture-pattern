# 1. Directory Layer (Feature-Sliced Design)

This document explains the project's directory structure, the role of each layer, and dependency rules. This architecture is inspired by [Feature-Sliced Design](https://feature-sliced.design/).

## Core Rule: Unidirectional Reference
- The `src/` directory consists of 7 subdirectories (layers).
- Features within a layer **can only reference features from the same level or lower layers, and cannot reference upper layers.**

## 7-Layer Architecture

1. **`/app` (Top Layer)**
   - Can reference all lower layers.
   - Handles Next.js App Router functionality and defines page routing.
   - Can have `.provider.jsx` files to provide local state for pages, which can also reference all lower layers.

2. **`/app-configs`**
   - Stores global configurations and functions needed to configure the service (e.g., Next.js middleware, global theme, routing rules).

3. **`/widgets`**
   - Complete UI components that fully display a feature.
   - Combines features, domains, and shared elements to create independent and reusable components.

4. **`/features`**
   - A complete business logic unit.
   - Each file contains one logic unit, written as custom hooks that manage loading or error states when necessary.

5. **`/domains`**
   - Defines business state and core data schemas related to specific entities (e.g., User, Product, Post).
   - Recommended structure within entity directories:
     - `/api`
     - `/schema`
     - `/store`: Global state (e.g., `.repository.js` and `.store.js` using zustand)
     - `/util`

6. **`/libs`**
   - Helper functions for using external libraries (axios, dayjs, etc.).
   - **Core responsibility is to provide wrappers so library syntax is not directly exposed to other layers** (exceptions: axios, zustand, etc.).
   - Items combining 2+ dependencies are stored under `/combined` directory.

7. **`/shared` (Bottom Layer)**
   - Collection of independent common features not dependent on libraries.
   - Includes common UI components, utility functions, global constants, etc.

## Structure Example
```bash
src
├── app // #1 Layer
│   ├── [route-name]
│   │   ├── _assets
│   │   ├── _modals
│   │   ├── _sections
│   │   ├── ~.provider.jsx
│   │   └── page.jsx
├── app-configs // #2 Layer
├── widgets // #3 Layer
├── features // #4 Layer
├── domains // #5 Layer (Entity-centric)
├── libs // #6 Layer (Library Wrapper)
└── shared // #7 Layer (Common features)
```

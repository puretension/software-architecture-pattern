# FSD Next.js Reference - 프로젝트 구조

실제 프로젝트 규모의 Feature-Sliced Design 아키텍처 예시입니다.

## 도메인 구조

### User Domain
```
src/domains/user/
├── api/
│   └── user.api.js          # Mock API (fetchUsers, fetchUserById, createUser)
├── schema/
│   └── user.schema.js       # 스키마 정의 및 검증 (USER_ROLES, validateUserData)
├── store/
│   ├── user.store.js        # Zustand 전역 상태
│   └── user.repository.js   # Repository 패턴
└── util/
    └── user.util.js         # 유틸리티 함수 (formatUserName, getUserInitials)
```

### Product Domain
```
src/domains/product/
├── api/
│   └── product.api.js       # Mock API (fetchProducts, createProduct, updateProductStock)
├── schema/
│   └── product.schema.js    # 스키마 정의 및 검증 (PRODUCT_CATEGORIES, validateProductData)
├── store/
│   ├── product.store.js     # Zustand 전역 상태 (장바구니 포함)
│   └── product.repository.js # Repository 패턴
└── util/
    └── product.util.js      # 유틸리티 함수 (formatPrice, calculateCartTotal)
```

## Features

- `user.useLoadUsers.feature.js` - 사용자 목록 로드
- `user.useCreateUser.feature.js` - 사용자 생성
- `product.useLoadProducts.feature.js` - 상품 목록 로드
- `product.useAddToCart.feature.js` - 장바구니 추가

## Widgets

- `UserListWidget` - 사용자 목록 표시
- `ProductListWidget` - 상품 목록 및 장바구니 추가
- `CartWidget` - 장바구니 관리

## 실행

```bash
bun dev
```

http://localhost:3000 에서 확인

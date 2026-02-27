# FSD Next.js Reference - Project Structure

A production-scale Feature-Sliced Design architecture example.

## Domain Structure

### User Domain
```
src/domains/user/
├── api/
│   └── user.api.js          # Mock API (fetchUsers, fetchUserById, createUser)
├── schema/
│   └── user.schema.js       # Schema definition and validation (USER_ROLES, validateUserData)
├── store/
│   ├── user.store.js        # Zustand global state
│   └── user.repository.js   # Repository pattern
└── util/
    └── user.util.js         # Utility functions (formatUserName, getUserInitials)
```

### Product Domain
```
src/domains/product/
├── api/
│   └── product.api.js       # Mock API (fetchProducts, createProduct, updateProductStock)
├── schema/
│   └── product.schema.js    # Schema definition and validation (PRODUCT_CATEGORIES, validateProductData)
├── store/
│   ├── product.store.js     # Zustand global state (includes cart)
│   └── product.repository.js # Repository pattern
└── util/
    └── product.util.js      # Utility functions (formatPrice, calculateCartTotal)
```

## Features

- `user.useLoadUsers.feature.js` - Load user list
- `user.useCreateUser.feature.js` - Create user
- `product.useLoadProducts.feature.js` - Load product list
- `product.useAddToCart.feature.js` - Add to cart
- `product.useRemoveFromCart.feature.js` - Remove from cart
- `product.useClearCart.feature.js` - Clear cart

## Widgets

- `UserListWidget` - Display user list
- `CreateUserWidget` - Create new user form
- `ProductListWidget` - Product list and add to cart
- `CartWidget` - Shopping cart management

## Run

```bash
bun dev
```

Open http://localhost:3000

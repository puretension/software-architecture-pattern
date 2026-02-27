/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {number} price
 * @property {string} category
 * @property {number} stock
 * @property {string} description
 * @property {string} imageUrl
 * @property {string} createdAt
 */

const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 89000,
    category: 'electronics',
    stock: 45,
    description: 'High-quality wireless headphones with noise cancellation',
    imageUrl: '/products/headphones.jpg',
    createdAt: '2024-01-10',
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 299000,
    category: 'electronics',
    stock: 23,
    description: 'Advanced smartwatch with health tracking features',
    imageUrl: '/products/watch.jpg',
    createdAt: '2024-01-15',
  },
  {
    id: '3',
    name: 'Running Shoes',
    price: 129000,
    category: 'sports',
    stock: 67,
    description: 'Comfortable running shoes for all terrains',
    imageUrl: '/products/shoes.jpg',
    createdAt: '2024-02-01',
  },
  {
    id: '4',
    name: 'Coffee Maker',
    price: 159000,
    category: 'home',
    stock: 12,
    description: 'Automatic coffee maker with programmable settings',
    imageUrl: '/products/coffee.jpg',
    createdAt: '2024-02-10',
  },
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * @returns {Promise<Product[]>}
 */
export const fetchProducts = async () => {
  await delay(600);
  return MOCK_PRODUCTS;
};

/**
 * @param {string} id
 * @returns {Promise<Product>}
 */
export const fetchProductById = async (id) => {
  await delay(300);
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  if (!product) throw new Error('Product not found');
  return product;
};

/**
 * @param {string} category
 * @returns {Promise<Product[]>}
 */
export const fetchProductsByCategory = async (category) => {
  await delay(400);
  return MOCK_PRODUCTS.filter(p => p.category === category);
};

/**
 * @param {Omit<Product, 'id' | 'createdAt'>} productData
 * @returns {Promise<Product>}
 */
export const createProduct = async (productData) => {
  await delay(500);
  return {
    id: String(Date.now()),
    ...productData,
    createdAt: new Date().toISOString(),
  };
};

/**
 * @param {string} id
 * @param {number} quantity
 * @returns {Promise<Product>}
 */
export const updateProductStock = async (id, quantity) => {
  await delay(300);
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  if (!product) throw new Error('Product not found');
  return { ...product, stock: product.stock - quantity };
};

/**
 * @typedef {Object} ProductSchema
 * @property {string} id
 * @property {string} name
 * @property {number} price
 * @property {'electronics' | 'sports' | 'home' | 'fashion'} category
 * @property {number} stock
 * @property {string} description
 * @property {string} imageUrl
 * @property {string} createdAt
 */

export const PRODUCT_CATEGORIES = {
  ELECTRONICS: 'electronics',
  SPORTS: 'sports',
  HOME: 'home',
  FASHION: 'fashion',
};

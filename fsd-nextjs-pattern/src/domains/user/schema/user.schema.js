/**
 * @typedef {Object} UserSchema
 * @property {string} id
 * @property {string} email
 * @property {string} name
 * @property {'admin' | 'user' | 'guest'} role
 * @property {string} createdAt
 */

export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
};

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} name
 * @property {string} role
 * @property {string} createdAt
 */

const MOCK_USERS = [
  { id: '1', email: 'admin@example.com', name: 'Admin User', role: 'admin', createdAt: '2024-01-01' },
  { id: '2', email: 'user@example.com', name: 'John Doe', role: 'user', createdAt: '2024-01-15' },
  { id: '3', email: 'jane@example.com', name: 'Jane Smith', role: 'user', createdAt: '2024-02-01' },
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * @returns {Promise<User[]>}
 */
export const fetchUsers = async () => {
  await delay(500);
  return MOCK_USERS;
};

/**
 * @param {string} id
 * @returns {Promise<User>}
 */
export const fetchUserById = async (id) => {
  await delay(300);
  const user = MOCK_USERS.find(u => u.id === id);
  if (!user) throw new Error('User not found');
  return user;
};

/**
 * @param {Omit<User, 'id' | 'createdAt'>} userData
 * @returns {Promise<User>}
 */
export const createUser = async (userData) => {
  await delay(500);
  return {
    id: String(Date.now()),
    ...userData,
    createdAt: new Date().toISOString(),
  };
};

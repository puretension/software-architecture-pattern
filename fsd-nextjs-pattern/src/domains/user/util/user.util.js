export const formatUserName = (user) => {
  if (!user) return '';
  return `${user.name} (${user.role})`;
};

export const getUserInitials = (name) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const filterUsersByRole = (users, role) => {
  return users.filter(user => user.role === role);
};

export const sortUsersByDate = (users, order = 'desc') => {
  return [...users].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
};

export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validateUserData = (data) => {
  if (!data.email || !validateEmail(data.email)) {
    throw new Error('Invalid email');
  }
  if (!data.name || data.name.length < 2) {
    throw new Error('Name must be at least 2 characters');
  }
  return true;
};

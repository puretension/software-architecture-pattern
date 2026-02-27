import { useState, useEffect } from 'react';
import { fetchUsers } from '@/domains/user/api/user.api';
import { userRepository } from '@/domains/user/store/user.repository';

export const useLoadUsers = () => {
  const users = userRepository.useStates(state => state.users);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const users = await fetchUsers();
      userRepository.setState({ users });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return { users, loading, error, refetch: loadUsers };
};

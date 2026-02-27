import { useState } from 'react';
import { createUser } from '@/domains/user/api/user.api';
import { validateUserData } from '@/domains/user/util/user.util';
import { userRepository } from '@/domains/user/store/user.repository';

export const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createNewUser = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      validateUserData(userData);
      const newUser = await createUser(userData);
      
      const { users } = userRepository.getState();
      userRepository.setState({ users: [...users, newUser] });
      
      return newUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createNewUser, loading, error };
};

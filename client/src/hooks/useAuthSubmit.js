import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApiError } from '../utils/apiError';

export const useAuthSubmit = (action, fallbackError) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e, ...args) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await action(...args);
      navigate('/chat');
    } catch (err) {
      setError(getApiError(err, fallbackError));
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, handleSubmit };
};

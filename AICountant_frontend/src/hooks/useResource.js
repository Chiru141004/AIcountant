import { useEffect, useState } from 'react';
import { getJson } from '../api';

export default function useResource(path, initialValue = []) {
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    getJson(path)
      .then((result) => {
        if (mounted) {
          setData(result);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err.message || 'Unable to load data');
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [path]);

  return { data, loading, error };
}

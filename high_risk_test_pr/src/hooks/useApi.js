/**
 * useApi Custom Hook
 * Manages API calls with loading, error, and data states
 */

import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Custom hook for API operations
 * @param {Function} apiFunction - API function to call
 * @param {Array} dependencies - Dependencies for effect
 * @returns {Object} API state and methods
 */
function useApi(apiFunction, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isMounted = useRef(true);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  /**
   * Execute API call
   */
  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiFunction(...args);
      if (isMounted.current) {
        setData(result);
      }
      return result;
    } catch (err) {
      if (isMounted.current) {
        setError(err.message || 'An error occurred');
      }
      throw err;
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, [apiFunction]);

  /**
   * Reset state
   */
  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset,
    setData,
    setError
  };
}

/**
 * Custom hook for paginated API calls
 * @param {Function} apiFunction - API function to call
 * @param {number} pageSize - Items per page
 * @returns {Object} Paginated API state
 */
function usePaginatedApi(apiFunction, pageSize = 10) {
  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState([]);
  const api = useApi(apiFunction, []);

  const loadMore = useCallback(async () => {
    try {
      const newData = await api.execute(page, pageSize);
      setAllData(prev => [...prev, ...newData]);
      setPage(prev => prev + 1);
    } catch (err) {
      console.error('Failed to load more data:', err);
    }
  }, [api, page, pageSize]);

  const reset = useCallback(() => {
    setAllData([]);
    setPage(1);
    api.reset();
  }, [api]);

  return {
    ...api,
    data: allData,
    page,
    loadMore,
    reset
  };
}

/**
 * Custom hook for API with caching
 * @param {Function} apiFunction - API function to call
 * @param {number} cacheTime - Cache duration in ms
 * @returns {Object} Cached API state
 */
function useCachedApi(apiFunction, cacheTime = 5 * 60 * 1000) {
  const cache = useRef(new Map());
  const api = useApi(apiFunction);

  const execute = useCallback(async (...args) => {
    const key = JSON.stringify(args);
    const cached = cache.current.get(key);

    if (cached && Date.now() - cached.timestamp < cacheTime) {
      api.setData(cached.data);
      return cached.data;
    }

    const result = await api.execute(...args);
    cache.current.set(key, { data: result, timestamp: Date.now() });
    return result;
  }, [api, cacheTime]);

  const clearCache = useCallback(() => {
    cache.current.clear();
  }, []);

  return {
    ...api,
    execute,
    clearCache
  };
}

export { useApi, usePaginatedApi, useCachedApi };

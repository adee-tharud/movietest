import { useEffect, useRef, useState } from 'react';
import { searchShows } from '../api/tvmaze';

export function useShowSearch(options = {}) {
  const { minLength = 3, debounceMs = 300 } = options;

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const debounceRef = useRef(null);
  const abortRef = useRef(null);

  useEffect(() => {
    const trimmed = query.trim();

    if (trimmed.length < minLength) {
      setSuggestions([]);
      setShowDropdown(false);

      clearTimeout(debounceRef.current);
      abortRef.current?.abort();
      return;
    }

    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      abortRef.current?.abort();
      abortRef.current = new AbortController();

      setLoading(true);

      try {
        const data = await searchShows(trimmed, abortRef.current.signal);

        setSuggestions(data);
        setShowDropdown(data.length > 0);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    }, debounceMs);

    return () => {
      clearTimeout(debounceRef.current);
      abortRef.current?.abort();
    };
  }, [query, minLength, debounceMs]);

  return {
    query,
    setQuery,
    suggestions,
    loading,
    showDropdown,
    clear: () => {
      setQuery('');
      setSuggestions([]);
      setShowDropdown(false);
      abortRef.current?.abort();
    },
  };
}

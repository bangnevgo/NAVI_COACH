'use client';

import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        setValue(JSON.parse(stored));
      } catch {
        setValue(defaultValue);
      }
    }
  }, [key]);

  const setStoredValue = useCallback((newValue: T | ((prev: T) => T)) => {
    setValue((prev) => {
      const resolved = typeof newValue === 'function' ? (newValue as (prev: T) => T)(prev) : newValue;
      localStorage.setItem(key, JSON.stringify(resolved));
      return resolved;
    });
  }, [key]);

  return [value, setStoredValue];
}

export function useStateManager() {
  const [sidebarCollapsed, setSidebarCollapsed] = useLocalStorage('coachflo_sidebar_collapsed', false);

  return {
    sidebarCollapsed,
    setSidebarCollapsed,
  };
}

export default useLocalStorage;

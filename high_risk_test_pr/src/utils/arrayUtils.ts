/**
 * Array Utility Functions
 * Helper functions for array operations
 */

export const chunk = <T>(arr: T[], size: number): T[][] => {
  const chunks: T[][] = [];

  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }

  return chunks;
};

export const flatten = <T>(arr: (T | T[])[]): T[] => {
  return arr.reduce((flat, item) => {
    return flat.concat(Array.isArray(item) ? flatten(item) : item);
  }, [] as T[]);
};

export const unique = <T>(arr: T[]): T[] => {
  return [...new Set(arr)];
};

export const shuffle = <T>(arr: T[]): T[] => {
  const result = [...arr];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
};

export const groupBy = <T, K extends string | number | symbol>(
  arr: T[],
  key: (item: T) => K
): Record<K, T[]> => {
  return arr.reduce(
    (groups, item) => {
      const groupKey = key(item);
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(item);
      return groups;
    },
    {} as Record<K, T[]>
  );
};

export const findIndex = <T>(arr: T[], predicate: (item: T) => boolean): number => {
  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i])) return i;
  }
  return -1;
};

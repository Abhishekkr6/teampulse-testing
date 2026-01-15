/**
 * String Utility Functions
 * Common string manipulation functions
 */

export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const camelToKebab = (str: string): string => {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
};

export const kebabToCamel = (str: string): string => {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
};

export const truncate = (str: string, length: number = 50): string => {
  if (str.length <= length) return str;
  return str.substring(0, length) + '...';
};

export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const reverseString = (str: string): string => {
  return str.split('').reverse().join('');
};

export const countOccurrences = (str: string, searchStr: string): number => {
  if (!searchStr) return 0;
  return str.split(searchStr).length - 1;
};

export const removeDuplicates = (str: string): string => {
  return [...new Set(str)].join('');
};

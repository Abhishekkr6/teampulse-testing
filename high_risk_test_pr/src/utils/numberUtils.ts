/**
 * Number Utility Functions
 * Mathematical and numerical helper functions
 */

export const isEven = (num: number): boolean => num % 2 === 0;

export const isOdd = (num: number): boolean => num % 2 !== 0;

export const isPrime = (num: number): boolean => {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;

  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }

  return true;
};

export const factorial = (num: number): number => {
  if (num < 0) throw new Error('Factorial is not defined for negative numbers');
  if (num === 0 || num === 1) return 1;
  return num * factorial(num - 1);
};

export const fibonacci = (n: number): number[] => {
  const result: number[] = [0, 1];

  for (let i = 2; i < n; i++) {
    result.push(result[i - 1] + result[i - 2]);
  }

  return result.slice(0, n);
};

export const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};

export const lcm = (a: number, b: number): number => {
  return Math.abs(a * b) / gcd(a, b);
};

export const round = (num: number, decimals: number = 0): number => {
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

export const clamp = (num: number, min: number, max: number): number => {
  return Math.min(Math.max(num, min), max);
};

export const percentage = (num: number, total: number): number => {
  return (num / total) * 100;
};

export const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

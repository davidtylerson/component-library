import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class values into a single className string
 * with proper Tailwind CSS class merging.
 * 
 * @param inputs - Class values to merge
 * @returns Merged className string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Utility function to generate a unique ID.
 * Useful for ensuring unique IDs for form elements.
 * 
 * @param prefix - Optional prefix for the ID
 * @returns A unique ID string
 */
export function generateId(prefix = 'id'): string {
  const randomId = Math.random().toString(36).substring(2, 9);
  return `${prefix}-${randomId}`;
}

/**
 * Type guard to check if a value is not null or undefined
 * 
 * @param value - Value to check
 * @returns True if value is not null or undefined
 */
export function isNotNullOrUndefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Returns only the props that are safe to spread onto a DOM element
 * by filtering out custom props
 * 
 * @param props - The props object
 * @param propNames - Names of custom props to filter out
 * @returns Object with only DOM-safe props
 */
export function filterDOMProps<T extends Record<string, any>, K extends keyof T>(
  props: T, 
  propNames: K[]
): Omit<T, K> {
  const result = { ...props };
  propNames.forEach(name => delete result[name]);
  return result;
}
/**
 * Re-exports all token definitions for easy consumption
 */

export * from './colors';
export * from './typography';
export * from './spacing';
export * from './radius';
export * from './shadows';

// Export a consolidated tokens object
import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { radius } from './radius';
import { shadows } from './shadows';

export const tokens = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
};

export type Tokens = typeof tokens;

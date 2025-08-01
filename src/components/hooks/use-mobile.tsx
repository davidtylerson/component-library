"use client";

import { useMediaQuery } from "../../hooks/use-media-query";

// Function that returns true if the current viewport is mobile size
export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 768px)");
} 
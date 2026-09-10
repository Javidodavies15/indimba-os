export const a11yDefaults = {
  focusRing: `focus-visible:outline-none focus-visible:ring-2 
              focus-visible:ring-indimba-gold-500 
              focus-visible:ring-offset-2 
              focus-visible:ring-offset-surface-900`,
  skipLink: `sr-only focus:not-sr-only focus:absolute focus:top-4 
             focus:left-4 focus:z-50 focus:px-4 focus:py-2
             focus:bg-indimba-red-500 focus:text-white focus:rounded-md`,
  srOnly: 'sr-only',
};

export function useReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

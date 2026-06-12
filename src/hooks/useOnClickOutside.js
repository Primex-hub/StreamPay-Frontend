import { useEffect } from 'react';

/**
 * Call a handler when a pointer or touch event happens outside the ref'd
 * element. Useful for dismissing menus, popovers and modals.
 * @param {import('react').RefObject<HTMLElement>} ref - element to watch
 * @param {(event: Event) => void} handler - called on an outside interaction
 * @param {boolean} [enabled] - skip listening when false
 */
export function useOnClickOutside(ref, handler, enabled = true) {
  useEffect(() => {
    if (!enabled) return undefined;

    const listener = (event) => {
      const el = ref.current;
      if (!el || el.contains(event.target)) return;
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler, enabled]);
}

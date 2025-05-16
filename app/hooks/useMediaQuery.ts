import { useState, useEffect } from 'react';

interface UseMediaQueryProps {
  query?: string;
}
/**
 * @description Hook to check if the user's browser matches the media query
 * @param query - The media query to check
 * @returns true if the user's browser matches the media query, false otherwise
 */
export const useMediaQuery = ({
  query = "(max-width: 768px)",
}: UseMediaQueryProps): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
};

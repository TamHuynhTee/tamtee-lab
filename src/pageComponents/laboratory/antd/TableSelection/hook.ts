import { useInView } from '@/hooks/useIntersectionObserver';
import { useRef } from 'react';

export const useLoadMoreOptions = () => {
  const refLoadMoreOptions = useRef<HTMLParagraphElement>(null);
  //   console.log(`file: hook.ts:6 => refLoadMoreOptions:`, refLoadMoreOptions);
  const loadMoreOptions = useInView(refLoadMoreOptions, {
    threshold: 1,
    rootMargin: '-100px',
    root: null,
  });
  return {
    refLoadMoreOptions,
    loadMoreOptions,
  };
};

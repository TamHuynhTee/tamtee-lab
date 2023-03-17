import { useEffect, useMemo, useState } from 'react';

export const useInView = (
  targetRef: any,
  options: IntersectionObserverInit
) => {
  const [inView, setInView] = useState<boolean>(false);

  const optionsMemo = useMemo(() => {
    return options;
  }, [options]);

  const callBackFunc = (entries: Array<IntersectionObserverEntry>) => {
    const [entry] = entries;
    setInView(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callBackFunc, optionsMemo);
    const currentTarget = targetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [optionsMemo]);

  return inView;
};

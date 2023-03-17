import { Spin } from 'antd';
import { useEffect, useRef, useState } from 'react';
import styles from './style.module.css';

type Props = {};

const data = Array(200)
  .fill(0)
  .map((_, i) => i);

const LIMIT = 50;

const getData = ({
  limit = LIMIT,
  skip = 0,
}: {
  limit?: number;
  skip?: number;
}): Promise<number[]> => {
  const start = skip,
    end = skip + limit;
  const response = data.slice(start, end);

  return new Promise((res, rej) => {
    if (response) return res(response);
    return rej('Failed to retrieve from DB');
  });
};

const LoadMoreObserver = (props: Props) => {
  const [list, setList] = useState<number[]>([]);
  const [currentSkip, setCurrentSkip] = useState<number>(0);

  const [isVisible, setIsVisible] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const callbackFn = (entries: Array<IntersectionObserverEntry>) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
    if (entry.isIntersecting)
      setTimeout(() => {
        if (!isVisible) fetchData(currentSkip);
      }, 1000);
  };

  const options = {
    root: null,
    rootMargin: '100%',
    threshold: 1,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFn, options);
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [loadMoreRef, options]);

  const total = data.length;

  const showLoadMore = currentSkip < total;

  const fetchData = async (skip: number, limit = LIMIT) => {
    const result = await getData({ limit, skip });
    setList([...list, ...result]);
    setCurrentSkip(skip + LIMIT);
  };

  useEffect(() => {
    fetchData(currentSkip);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        {list.map((e) => (
          <div className={[styles.item].join(' ')} key={e}>
            {e}
          </div>
        ))}
        {showLoadMore && (
          <div className={styles.load_more} ref={loadMoreRef}>
            {isVisible ? <Spin /> : 'Load more'}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadMoreObserver;

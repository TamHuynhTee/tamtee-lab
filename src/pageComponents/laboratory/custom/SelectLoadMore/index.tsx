import SelectCustom from '@/components/SelectCustom';
import { useEffect, useState } from 'react';
import styles from './style.module.css';

type Props = {};

type Option = {
  label: string;
  value: any;
  key: number | string;
};

const dbData = [
  2, 3, 137, 4, 382, 54, 361, 246, 24, 84, 237, 352, 75, 38, 31, 35, 7, 5, 25,
  6752, 72, 58, 36, 64,
];

const getData = ({
  limit = 5,
  skip = 0,
}: {
  limit?: number;
  skip?: number;
}): Promise<number[]> => {
  const start = skip,
    end = skip + limit;
  const response = dbData.slice(start, end);

  return new Promise((res, rej) => {
    if (response) return res(response);
    return rej('Failed to retrieve from DB');
  });
};

const formatOption = (data: number[]): Option[] => {
  return data.map((e, i) => ({
    label: e.toString(),
    value: e,
    key: Math.random() * 100 + e,
  }));
};

const LIMIT = 10;

const SelectLoadMore = (props: Props) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [skip, setSkip] = useState<number>(0);

  const isEnough = dbData.length < skip;

  useEffect(() => {
    (async () => {
      const response = await getData({
        limit: LIMIT,
        skip,
      });
      setOptions(formatOption(response));
    })();
  }, []);

  const handleLoadMore = async () => {
    try {
      const nextSkip = skip + LIMIT;
      const response = await getData({ skip: nextSkip, limit: LIMIT });
      setOptions((opts) => [...opts, ...formatOption(response)]);
      setSkip(nextSkip);
    } catch (error) {
      console.log('error');
    }
  };

  const loadMore = {
    onLoadMore: handleLoadMore,
    isEnough,
  };

  return (
    <div className={styles.wrapper}>
      <SelectCustom
        options={options}
        loadMore={loadMore}
        label={'Hello'}
        // searchable
      />
    </div>
  );
};

export default SelectLoadMore;

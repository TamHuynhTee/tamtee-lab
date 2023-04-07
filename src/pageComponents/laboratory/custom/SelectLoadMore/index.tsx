import SelectCustom from '@/components/SelectCustom';
import { useEffect, useState } from 'react';
import styles from './style.module.css';
import { Select } from 'antd';

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

const LIMIT = 10;

const SelectLoadMore = (props: Props) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [skip, setSkip] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const [total, setTotal] = useState<number>(0);

  const isEnough = total < skip;

  const getData = ({
    limit = 5,
    skip = 0,
  }: {
    limit?: number;
    skip?: number;
  }): Promise<{ list: number[]; total: number }> => {
    setLoading(true);
    const start = skip,
      end = skip + limit;
    const response = dbData.slice(start, end);

    return new Promise((res, rej) => {
      setTimeout(() => {
        setLoading(false);
        if (response)
          return res({
            total: dbData.length,
            list: response,
          });
        return rej('Failed to retrieve from DB');
      }, 500);
    });
  };

  const formatOption = (data: number[]): Option[] => {
    return data.map((e, i) => ({
      label: e.toString(),
      value: e,
      key: Math.random() * 100 + e,
    }));
  };

  useEffect(() => {
    (async () => {
      const response = await getData({
        limit: LIMIT,
        skip,
      });
      setOptions(formatOption(response.list));
      setTotal(response.total);
    })();
  }, []);

  const handleLoadMore = async () => {
    try {
      const nextSkip = skip + LIMIT;
      const response = await getData({ skip: nextSkip, limit: LIMIT });
      setOptions((opts) => [...opts, ...formatOption(response.list)]);
      setSkip(nextSkip);
    } catch (error) {
      console.log('error');
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* <SelectCustom
        options={options}
        loadMore={loadMore}
        label={'Hello'}
        // searchable
      /> */}
      <Select
        style={{
          minWidth: '200px',
        }}
        loading={loading}
        options={options}
        onPopupScroll={async (e: any) => {
          const { target } = e;
          if (
            (target as any).scrollTop + (target as any).offsetHeight ===
            (target as any).scrollHeight
          ) {
            // if not load all;
            if (!isEnough) {
              handleLoadMore();
            }
          }
        }}
      />
    </div>
  );
};

export default SelectLoadMore;

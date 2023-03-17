import { useLoadMoreOptions } from '@/pageComponents/laboratory/antd/TableSelection/hook';
import { useEffect, useRef, useState } from 'react';
import styles from './style.module.css';

type Props = {
  options: any[];
  loadMore?: {
    onLoadMore?: () => void;
    isEnough?: boolean;
  };
  value?: any;
  label?: string;
  searchable?: boolean;
};

const SelectCustom = (props: Props) => {
  const { options, loadMore = {}, value, label, searchable = false } = props;
  const { onLoadMore, isEnough = false } = loadMore;
  const { loadMoreOptions, refLoadMoreOptions } = useLoadMoreOptions();

  const refDropdown = useRef<HTMLDivElement>(null);

  const [currentValue, setCurrentValue] = useState(() => {
    return options.find((e) => value == e.value);
  });

  useEffect(() => {
    if (onLoadMore && loadMoreOptions && !isEnough) onLoadMore();
  }, [onLoadMore, loadMoreOptions, isEnough]);

  const openDropdown = () => {
    if (refDropdown.current) {
      if (refDropdown.current.classList.contains(styles.show))
        refDropdown.current.classList.remove(styles.show);
      else refDropdown.current.classList.add(styles.show);
    }
  };

  const handlePick = (data: any) => {
    setCurrentValue(data);
    if (refDropdown.current) refDropdown.current.classList.remove(styles.show);
  };

  return (
    <div className={styles.selectContainer}>
      {searchable ? (
        <SelectSearch
          currentValue={currentValue}
          label={label}
          openDropdown={openDropdown}
        />
      ) : (
        <SelectZone
          currentValue={currentValue}
          label={label}
          openDropdown={openDropdown}
        />
      )}

      <div className={styles.selectDropdown} ref={refDropdown}>
        <ul className={styles.selectList}>
          {options.map((e) => (
            <li
              key={e.key}
              title={e.label}
              onClick={() => handlePick(e)}
              className={currentValue?.value == e.value ? styles.active : ''}
            >
              {e.label}
            </li>
          ))}
          {!isEnough &&
            (loadMoreOptions ? (
              'Loading ...'
            ) : (
              <p ref={refLoadMoreOptions}></p>
            ))}
        </ul>
      </div>
    </div>
  );
};

const SelectZone = (props: any) => {
  const { currentValue, label, openDropdown } = props;
  const setFocus = () => {
    if (openDropdown) openDropdown();
  };

  return (
    <div className={styles.selectPickZone} onClick={setFocus}>
      {currentValue ? (
        <span className={styles.selectValue}>{currentValue?.label}</span>
      ) : label ? (
        <span className={styles.selectLabel}>{label}</span>
      ) : (
        ''
      )}
    </div>
  );
};

const SelectSearch = (props: any) => {
  const { currentValue, label, openDropdown } = props;

  const [searchText, setSearchText] = useState('');

  const refInput = useRef<HTMLInputElement>(null);

  const setFocus = () => {
    if (refInput.current) refInput.current.focus();
    if (openDropdown) openDropdown();
  };

  return (
    <div
      className={[styles.selectPickZone, styles.search].join(' ')}
      onClick={setFocus}
    >
      <input
        type="text"
        className={styles.selectValue}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        ref={refInput}
      />
      {!searchText && currentValue ? (
        <span className={styles.selectValue}>{currentValue?.label}</span>
      ) : !searchText && label ? (
        <span className={styles.selectLabel}>{label}</span>
      ) : (
        ''
      )}
    </div>
  );
};

export default SelectCustom;

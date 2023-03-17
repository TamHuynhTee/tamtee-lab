import { Button, Form, Select } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import { useLoadMoreOptions } from '../TableSelection/hook';
import styles from './style.module.css';

// FAILED
const { Option: SelectOption } = Select;

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

const formatOption = (data: number[]) => {
  return data.map((e, i) => ({ label: e.toString(), value: e, key: i }));
};

const SelectLoadMore = (props: Props) => {
  const form = Form.useFormInstance();
  const [options, setOptions] = useState<Option[]>([]);
  const [skip, setSkip] = useState<number>(0);
  const refLoadMoreOptions = useRef<HTMLParagraphElement>(null);

  const { loadMoreOptions } = useLoadMoreOptions();
  console.log(`file: index.tsx:46 => refLoadMoreOptions:`, refLoadMoreOptions);
  //   console.log(`file: index.tsx:46 => loadMoreOptions:`, loadMoreOptions);

  const onSearch = (value: string) => {
    // dispatch(
    //   ActionCRUD.RequestSearchList({
    //     keyName: keyName,
    //     baseURL,
    //     entity,
    //     params: { limit: limit, page: 1, search: value },
    //   })
    // );
  };

  const onChange = (value: any) => {
    // form.setFieldsValue({ [name]: value });
    // formSetValue({ form, name, value });
    // setValue(value);
    // clearDataSearch();
  };

  useEffect(() => {
    (async () => {
      const response = await getData({
        limit: 10,
        skip,
      });
      setOptions(formatOption(response));
    })();
  }, []);

  const onSubmit = (formData: any) => {
    console.log(`file: index.tsx:76 => formData:`, formData);
  };

  return (
    <div className={styles.wrapper}>
      <Form form={form} onFinish={onSubmit}>
        <Form.Item name={'select'} label={'Select'}>
          <Select
            showSearch
            // value={value}
            style={{ width: 200 }}
            placeholder="Tìm và chọn"
            filterOption={false}
            optionFilterProp="children"
            onSearch={onSearch}
            onChange={onChange}
            // virtual={false}
            // options={options}
          >
            {options.map((e) => {
              return <SelectOption key={e.key}>{e.label}</SelectOption>;
            })}
            <SelectOption disabled value="">
              <p ref={refLoadMoreOptions}>Loading</p>
            </SelectOption>
          </Select>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SelectLoadMore;

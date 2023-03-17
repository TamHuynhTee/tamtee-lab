import { Cascader, Form, Input, Button, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { AxiosClient } from '@/axios';
import styles from './style.module.css';
import { BASE_URL } from '@/constant';
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from '@/helpers/localStorage';

type AdministrativeUnit = 'province' | 'district' | 'ward';

interface Option {
  value: string | number;
  label: string;
  children?: Option[];
  isLeaf?: boolean;
  loading?: boolean;
  administrativeUnit?: AdministrativeUnit;
}

const fetchProvince = async (): Promise<Option[]> => {
  const data: any = await new AxiosClient({ baseURL: BASE_URL })
    .getInstance()
    .get('/tinh_tp.json');

  return Object.keys(data).map((code) => ({
    value: code,
    label: data[code].name_with_type,
    isLeaf: false,
    administrativeUnit: 'province',
  }));
};
const fetchDistrict = async (
  provinceCode: string | number
): Promise<Option[]> => {
  const data: any = await new AxiosClient({ baseURL: BASE_URL })
    .getInstance()
    .get(`/quan-huyen/${provinceCode}.json`);

  return Object.keys(data).map((code) => ({
    value: code,
    label: data[code].name_with_type,
    isLeaf: false,
    administrativeUnit: 'district',
  }));
};
const fetchWard = async (districtCode: string | number): Promise<Option[]> => {
  const data: any = await new AxiosClient({ baseURL: BASE_URL })
    .getInstance()
    .get(`/xa-phuong/${districtCode}.json`);

  return Object.keys(data).map((code) => ({
    value: code,
    label: data[code].name_with_type,
    administrativeUnit: 'ward',
  }));
};

// Component
const CascaderAddress = () => {
  const [form] = Form.useForm();

  const keyName = CascaderAddress.name;

  //   const defaultVal = {
  //     province: '11',
  //     district: '102',
  //     ward: '03292',
  //   };

  const name = 'address';

  const [options, setOptions] = useState<Option[]>([]);
  const [defaultVal, setDefaultVal] = useState<any>();

  const [value, setValue] = useState<(string | number)[]>([]);

  useEffect(() => {
    const data = getFromLocalStorage(keyName);
    if (data) setDefaultVal(data);
  }, []);

  useEffect(() => {
    (async () => {
      if (defaultVal && value.length == 0) {
        const { province, district, ward } = defaultVal;
        if (province) {
          const districts = await fetchDistrict(province);
          const detailProvince = options.find((e) => e.value == province);
          if (detailProvince) {
            detailProvince.children = districts;

            if (district) {
              const wards = await fetchWard(district);
              const detailDistrict = detailProvince.children.find(
                (e) => e.value == district
              );
              if (detailDistrict) detailDistrict.children = wards;
              setOptions([...options]);
              setValue([province, district, ward]);
              form.setFieldsValue({
                [name]: {
                  province,
                  district,
                  ward,
                },
              });
              console.log('success updated');
            }
          }
        }
      }
    })();
  }, [defaultVal, value]);

  useEffect(() => {
    (async () => {
      const fetchProvinces = await fetchProvince();
      setOptions(fetchProvinces);
    })();
  }, []);

  const onChange = (val: any) => {
    setValue(val);
    form.setFieldsValue({
      [name]: {
        province: val[0],
        district: val[1],
        ward: val[2],
      },
    });
  };

  const loadData = (selectedOptions: Option[]) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    if (!targetOption.isLeaf) {
      targetOption.loading = true;
      (async () => {
        if (targetOption.administrativeUnit === 'province') {
          const districts = await fetchDistrict(targetOption.value);
          targetOption.children = districts;
        }
        if (targetOption.administrativeUnit === 'district') {
          const wards = await fetchWard(targetOption.value);
          targetOption.children = wards;
        }
        targetOption.loading = false;
        setOptions([...options]);
      })();
    }
  };

  const handleSubmit = (formData: any) => {
    saveToLocalStorage(keyName, formData[name]);
    notification.open({
      type: 'success',
      message: 'Saved',
      description: 'Result saved to local storage',
    });
    // console.log(`file: antd.tsx:104 => formData:`, formData);
  };

  return (
    <div className={styles.wrapper}>
      <Form
        layout="vertical"
        form={form}
        className={styles.antd_form}
        onFinish={handleSubmit}
      >
        <Form.Item label="Province / District / Ward">
          <Cascader
            options={options}
            onChange={onChange}
            placeholder="Pick a location"
            loadData={loadData as any}
            value={value}
          />
        </Form.Item>
        <Form.Item hidden required name={[name, 'province']}>
          <Input />
        </Form.Item>
        <Form.Item hidden required name={[name, 'district']}>
          <Input />
        </Form.Item>
        <Form.Item hidden required name={[name, 'ward']}>
          <Input />
        </Form.Item>

        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CascaderAddress;

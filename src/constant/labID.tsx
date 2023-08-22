import AntdLaboratory from '@/pageComponents/laboratory/antd';
import CascaderAddress from '@/pageComponents/laboratory/antd/CascaderAddress';
import SelectLoadMore from '@/pageComponents/laboratory/antd/SelectLoadMore';
import CustomSelectLoadMore from '@/pageComponents/laboratory/custom/SelectLoadMore';
import TableSelection from '@/pageComponents/laboratory/antd/TableSelection';
import CustomLaboratory from '@/pageComponents/laboratory/custom';
import ErrorBoundaryPage from '@/pageComponents/laboratory/custom/ErrorBoundaries';
import LoadMoreObserver from '@/pageComponents/laboratory/custom/LoadMoreObserver';
import ScanBarcode from '@/pageComponents/laboratory/custom/ScanBarcode';

export type ILabIDItem = {
  path: string;
  component: JSX.Element | React.ReactNode;
  children?: ILabIDItem[];
};
export type ILabIDList = ILabIDItem[];

export const LAB_ID_PATH: ILabIDList = [
  {
    path: 'antd',
    component: <AntdLaboratory />,
    children: [
      {
        path: 'cascader-address',
        component: <CascaderAddress />,
      },
      {
        path: 'table-selection',
        component: <TableSelection />,
      },
      {
        path: 'select-load-more',
        component: <SelectLoadMore />,
      },
    ],
  },
  {
    path: 'custom',
    component: <CustomLaboratory />,
    children: [
      {
        path: 'load-more-observer',
        component: <LoadMoreObserver />,
      },
      {
        path: 'select-load-more',
        component: <CustomSelectLoadMore />,
      },
      {
        path: 'error-boundaries',
        component: <ErrorBoundaryPage />,
      },
      {
        path: 'scan-barcode',
        component: <ScanBarcode />,
      },
    ],
  },
];

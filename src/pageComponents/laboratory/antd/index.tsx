import { LAB_ID_PATH } from '@/constant/labID';
import LabPageLayout from '../LabPageLayout';

const AntdLaboratory = (props: any) => {
  return <LabPageLayout labPaths={LAB_ID_PATH} labTitle={'ANTD'} />;
};

export default AntdLaboratory;

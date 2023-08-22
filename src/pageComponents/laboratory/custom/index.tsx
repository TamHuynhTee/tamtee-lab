import { LAB_ID_PATH } from '@/constant/labID';
import LabPageLayout from '../LabPageLayout';

type Props = {};

const CustomLaboratory = (props: Props) => {
  return <LabPageLayout labPaths={LAB_ID_PATH} labTitle={'CUSTOM'} />;
};

export default CustomLaboratory;

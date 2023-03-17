import { ILabIDItem, LAB_ID_PATH } from '@/constant/labID';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';

type Props = {};

const LabID = (props: Props) => {
  const router = useRouter();

  const { labID } = router.query;

  const LabComponent = useCallback(
    (parent: ILabIDItem) => {
      const childPath = (labID as string[])?.[1];
      if (!childPath || !parent.children) return parent.component;
      const childID = parent.children.find((e) => e.path == childPath);
      return childID?.component;
    },
    [labID]
  );

  const LabPath = useMemo(() => {
    const level0Path = (labID as string[])?.[0];

    const level0ID = LAB_ID_PATH.find((e) => e.path == level0Path);

    if (!level0ID) return <>No lab id match</>;

    return LabComponent(level0ID);
  }, [labID]);

  return <>{LabPath}</>;
};

export default LabID;

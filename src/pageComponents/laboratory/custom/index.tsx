import { LAB_ID_PATH } from '@/constant/labID';
import { useRouter } from 'next/router';
import React from 'react';
import style from './style.module.css';

type Props = {};

const CustomLaboratory = (props: Props) => {
  const { query, push, asPath } = useRouter();
  const currentURL = query?.['labID']?.[0] as string;

  const paths = React.useMemo(() => {
    const thisPath = LAB_ID_PATH.find((e) => e.path == currentURL);
    return thisPath ? thisPath.children || [] : [];
  }, [currentURL]);

  const navigate = (url: string) => push(`${asPath}/${url}`);

  return (
    <div className={style.container}>
      <p className={style.path_name}>{currentURL + ' lab'}</p>
      <div className={style.grid}>
        {paths.map((e) => (
          <div className={style.item} onClick={() => navigate(e.path)}>
            {e.path}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomLaboratory;

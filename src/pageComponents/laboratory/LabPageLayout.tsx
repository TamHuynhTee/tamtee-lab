import { ILabIDList } from '@/constant/labID';
import style from '@/styles/LabListPageLayout.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useMemo } from 'react';

type Props = {
  labPaths: ILabIDList;
  labTitle: ReactNode;
};

const LAB_ID_KEY = 'labID';

const LabPageLayout = ({ labPaths, labTitle }: Props) => {
  const { query, asPath } = useRouter();
  const currentURL = query?.[LAB_ID_KEY]?.[0] as string;

  const paths = useMemo(() => {
    const thisPath = labPaths.find((e) => e.path == currentURL);
    return thisPath ? thisPath.children || [] : [];
  }, [currentURL]);

  return (
    <div className={style.container}>
      <p className={style.path_name}>{labTitle} LABORATORY</p>
      <div className={style.grid}>
        {paths.map((e, i) => (
          <Link key={i} href={`${asPath}/${e.path}`} className={style.item}>
            {e.path}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LabPageLayout;

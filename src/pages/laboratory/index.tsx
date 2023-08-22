import { LAB_ID_PATH } from '@/constant/labID';
import style from '@/styles/LabListPageLayout.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = {};

const Laboratory = (props: Props) => {
  const { asPath } = useRouter();
  return (
    <div className="pageContainer">
      <div className={style.container}>
        <p className={style.path_name}>Laboratory Category</p>
        <div className={style.grid}>
          {LAB_ID_PATH.map((e, i) => (
            <Link key={i} className={style.item} href={`${asPath}/${e.path}`}>
              {e.path}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Laboratory;

import styles from '@/styles/Home.module.css';
import Image from 'next/image';
import Link from 'next/link';
import style from '@/styles/LabListPageLayout.module.css';

export default function Home() {
  return (
    <div className="pageContainer">
      <div className={style.container}>
        <p className={style.path_name}>MAIN MENU</p>
        <div className={style.grid}>
          <Link className={style.item} href={`/laboratory`}>
            LABORATORY
          </Link>
        </div>
      </div>
    </div>
  );
}

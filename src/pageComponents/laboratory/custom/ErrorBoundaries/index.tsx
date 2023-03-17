import { ErrorBoundary } from '@/components/ErrorBoundariesClass';
import React from 'react';
import styles from './style.module.css';

type Props = {};

const ErrorBoundaryPage = (props: Props) => {
  return (
    <div className={styles.wrapper}>
      <p>Hello</p>
      <CustomComponent b={'Tam'} />
    </div>
  );
};

const CustomComponent = (props: any) => {
  return (
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <div>{props.b}</div>
    </ErrorBoundary>
  );
};

export default ErrorBoundaryPage;

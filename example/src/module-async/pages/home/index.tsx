import * as React from 'react';
import { css, cx } from '@emotion/css';

const styles = {
  page: css`
    min-height: 100vh;
  `,
};

export default function Home() {
  return <div className={styles.page}>Async Sub Module: Home</div>;
}

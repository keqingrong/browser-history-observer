import * as React from 'react';
import { css, cx } from '@emotion/css';

const styles = {
  page: css`
    min-height: 100vh;
  `,
};

export default function NotFound() {
  return <div className={styles.page}>404 Not Found</div>;
}

import * as React from 'react';
import { Suspense } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { css } from '@emotion/css';
import { RoutesWrapper } from './routes';
import ErrorBoundary from './pages/error';

const styles = {
  app: css`
    position: relative;
  `
};

const Loading = () => <div>Loading...</div>;

export function App() {
  return (
    <div className={styles.app}>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Router>
            <RoutesWrapper />
          </Router>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

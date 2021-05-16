import React, { ErrorInfo } from 'react';
import { css, cx } from '@emotion/css';

const styles = {
  page: css`
    min-height: 100vh;
  `,
};

const logErrorToMyService = (error: Error, errorInfo: ErrorInfo) => {
  console.error('logErrorToMyService', error, errorInfo);
};

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error) {
    console.error(error);
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className={styles.page}>
          <h1>Something went wrong.</h1>
        </div>
      );
    }

    return this.props.children;
  }
}

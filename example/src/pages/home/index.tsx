import * as React from 'react';
import { css, cx } from '@emotion/css';
import { Link } from 'react-router-dom';

const styles = {
  page: css`
    min-height: 100vh;
  `
};

function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <Link to="/topics">Topics</Link>
        </li>
        <li>
          <Link to="/404">404</Link>
        </li>
        <li>
          <Link to="/module-sync">Sync Sub Module: Home</Link>
        </li>
        <li>
          <Link to="/module-sync/about">Sync Sub Module: Async About</Link>
        </li>
        <li>
          <Link to="/module-async">Async Sub Module: Home</Link>
        </li>
        <li>
          <Link to="/module-async/about">Async Sub Module: Async About</Link>
        </li>
      </ul>
    </nav>
  );
}

export default function Home() {
  return (
    <div className={styles.page}>
      <h1>Home</h1>
      <Nav />
    </div>
  );
}

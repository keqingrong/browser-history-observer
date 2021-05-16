import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './app';
import { injectGlobal } from '@emotion/css';
import './observer';

injectGlobal`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Roboto, 'Segoe UI',
      'Helvetica Neue', Helvetica, Arial, 'PingFang SC', 'Source Han Sans SC',
      'Mi Lan Pro VF', 'Mi Lanting', 'Noto Sans CJK SC', 'Microsoft YaHei',
      'Heiti SC', 'DengXian', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: Menlo, Monaco, 'Cascadia Mono', Consolas, 'Courier New',
      'PingFang SC', 'Source Han Sans SC', 'Mi Lan Pro VF', 'Mi Lanting',
      'Noto Sans CJK SC', 'Microsoft YaHei', 'Heiti SC', 'DengXian', NSimSun,
      SimSun, monospace;
  }

  body,
  #root {
    background-color: #f2f2f2;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

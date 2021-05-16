# browser-history-observer (WIP)

[![npm version](https://img.shields.io/npm/v/browser-history-observer.svg)](https://www.npmjs.com/package/browser-history-observer)

Observer for HTML5 History API

## Installation

```bash
# npm
npm install browser-history-observer

# yarn
yarn add browser-history-observer
```

## Usage

```ts
import { HistoryObserver } from 'browser-history-observer';

const observer = new HistoryObserver();

// `popstate`
observer.onPopState(payload => {
  console.log(payload);
});

// `hashchange`
observer.onHashChange(payload => {
  console.log(payload);
});

// `popstate`/`history.pushState()`/`history.replaceState()`
observer.onHistoryChange(payload => {
  console.log(payload);
});

// `hashchange`/`history.pushState()`/`history.replaceState()`
observer.onHistoryHashChange(payload => {
  console.log(payload);
});
```

## APIs

- HistoryObserver
  - `new HistoryObserver(options)`
    - `options.debug`
  - `HistoryObserver.prototype.dispose()`
  - `HistoryObserver.prototype.on(type, handler)`
  - `HistoryObserver.prototype.onLoad(handler)`
  - `HistoryObserver.prototype.onPopState(handler)`
  - `HistoryObserver.prototype.onHashChange(handler)`
  - `HistoryObserver.prototype.onPushState(handler)`
  - `HistoryObserver.prototype.onReplaceState(handler)`
  - `HistoryObserver.prototype.onHistoryChange(handler)`
  - `HistoryObserver.prototype.onHistoryHashChange(handler)`
- Utils
  - `interceptHistory()`
  - `undoInterceptHistory()`

## License

MIT © Qingrong Ke

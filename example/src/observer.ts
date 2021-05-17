import { HistoryObserver } from 'browser-history-observer';

const observer = new HistoryObserver();

// `popstate`
observer.onPopState(payload => {
  console.log('onPopState', payload);
});

// `hashchange`
observer.onHashChange(payload => {
  console.log('onHashChange', payload);
});

// `popstate`/`history.pushState()`/`history.replaceState()`
observer.onHistoryChange(payload => {
  console.log('onHistoryChange', payload);
});

// `hashchange`/`history.pushState()`/`history.replaceState()`
observer.onHistoryHashChange(payload => {
  console.log('onHistoryHashChange', payload);
});

// `history.pushState()`
observer.onPushState(payload => {
  console.log('onPushState', payload);
});

// `history.replaceState()`
observer.onReplaceState(payload => {
  console.log('onReplaceState', payload);
});

const observer2 = new HistoryObserver();

observer2.onHistoryChange(payload => {
  console.log('onHistoryChange2', payload);
});

import { HistoryObserver } from '../src';

const observer = new HistoryObserver();

observer.onLoad(payload => {
  console.log(payload);
});

observer.onHistoryChange(payload => {
  console.log(payload);
});

observer.onHistoryHashChange(payload => {
  console.log(payload);
});

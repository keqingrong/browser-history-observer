export interface LoadPayload {
  url: string;
}

export interface PopStatePayload<T = any> {
  url: string;
  state: T;
}

export interface HashChangePayload {
  oldURL: string;
  newURL: string;
}

export interface HistoryChangePayload<T = any> {
  type: 'load' | 'popstate' | 'pushstate' | 'replacestate';
  url: string;
  state: T;
}

export interface HistoryHashChangePayload {
  type: 'hashchange' | 'pushstate' | 'replacestate';
  oldURL: string;
  newURL: string;
}

export interface Options {
  debug: boolean;
}

export type EventType =
  | 'load'
  | 'hashchange'
  | 'popstate'
  | 'pushstate'
  | 'replacestate'
  | 'historychange'
  | 'historyhashchange';

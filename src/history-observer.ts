import mitt, { Handler } from 'mitt';
import { PushStateEvent, ReplaceStateEvent } from './event';
import { interceptHistory, undoInterceptHistory } from './history-interceptor';
import { isHashEqual, log } from './utils';
import {
  EventType,
  HashChangePayload,
  HistoryChangePayload,
  HistoryHashChangePayload,
  LoadPayload,
  PopStatePayload,
  Options
} from './types';

export class HistoryObserver {
  private emitter = mitt();
  private debug = false;

  constructor(options: Partial<Options> = {}) {
    if (options.debug) {
      this.debug = options.debug;
    }
    interceptHistory();
    this.subscribe();
  }

  private subscribe() {
    const on = window.addEventListener;
    on('load', this._onLoad.bind(this), false);
    on('popstate', this._onPopState.bind(this), false);
    on('hashchange', this._onHashChange.bind(this), false);
    on<any>('pushstate', this._onPushState.bind(this), false);
    on<any>('replacestate', this._onReplaceState.bind(this), false);
  }

  private unsubscribe() {
    const off = window.removeEventListener;
    off('load', this._onLoad.bind(this), false);
    off('popstate', this._onPopState.bind(this), false);
    off('hashchange', this._onHashChange.bind(this), false);
    off<any>('pushstate', this._onPushState.bind(this), false);
    off<any>('replacestate', this._onReplaceState.bind(this), false);
  }

  /**
   * 发送消息
   */
  private emit(type: EventType, payload: any) {
    this.debug && log(type, payload);
    this.emitter.emit(type, payload);
  }

  /**
   * 监听 `load` 事件
   */
  private _onLoad() {
    const type = 'load';
    const payload = { url: window.location.href };
    this.emit(type, payload);
    this._onHistoryChange({ type, state: null, ...payload });
  }

  /**
   * 监听 `popstate` 事件
   */
  private _onPopState(event: PopStateEvent) {
    const type = 'popstate';
    const payload = { url: window.location.href, state: event.state };
    this.emit(type, payload);
    this._onHistoryChange({ type, ...payload });
  }

  /**
   * 监听 `history.pushState()` 操作
   */
  private _onPushState(event: PushStateEvent) {
    const { oldURL, newURL, state } = event;
    const type = 'pushstate';
    const payload = { url: window.location.href, state };
    this.emit(type, payload);
    this._onHistoryChange({ type, ...payload });
    if (!isHashEqual(oldURL, newURL)) {
      this._onHistoryHashChange({ type, oldURL, newURL });
    }
  }

  /**
   * 监听 `history.replaceState()` 操作
   */
  private _onReplaceState(event: ReplaceStateEvent) {
    const { oldURL, newURL, state } = event;
    const type = 'replacestate';
    const payload = { url: window.location.href, state };
    this.emit(type, payload);
    this._onHistoryChange({ type, ...payload });
    if (!isHashEqual(oldURL, newURL)) {
      this._onHistoryHashChange({ type, oldURL, newURL });
    }
  }

  /**
   * 监听合成的 `historychange` 事件
   */
  private _onHistoryChange(params: HistoryChangePayload) {
    const { type, url, state } = params;
    const syntheticType = 'historychange';
    const payload = { type, url, state };
    this.emit(syntheticType, payload);
  }

  /**
   * 监听 `hashchange` 事件
   */
  private _onHashChange(event: HashChangeEvent) {
    const { oldURL, newURL } = event;
    const type = 'hashchange';
    const payload = { oldURL, newURL };
    this.emit(type, payload);
    this._onHistoryHashChange({ type, ...payload });
  }

  /**
   * 监听合成的 `historyhashchange` 事件
   */
  private _onHistoryHashChange(params: HistoryHashChangePayload) {
    const { type, oldURL, newURL } = params;
    const syntheticType = 'historyhashchange';
    const payload = { type, oldURL, newURL };
    this.emit(syntheticType, payload);
  }

  /**
   * 释放资源
   */
  dispose() {
    this.emitter.all.clear();
    this.unsubscribe();
    undoInterceptHistory();
  }

  /**
   * 监听路由历史变化
   */
  on<T>(type: EventType, handler: Handler<T>) {
    this.emitter.on(type, handler);
    return () => this.emitter.off(type, handler);
  }

  /**
   * 监听原生 `load` 事件
   */
  onLoad(handler: Handler<LoadPayload>) {
    return this.on('load', handler);
  }

  /**
   * 监听原生 `popstate` 事件
   */
  onPopState(handler: Handler<PopStatePayload>) {
    return this.on('popstate', handler);
  }

  /**
   * 监听原生 `hashchange` 事件
   */
  onHashChange(handler: Handler<HashChangePayload>) {
    return this.on('hashchange', handler);
  }

  /**
   * 监听自定义的 `pushstate` 事件
   */
  onPushState(handler: Handler<PopStatePayload>) {
    return this.on('pushstate', handler);
  }

  /**
   * 监听自定义的 `replacestate` 事件
   */
  onReplaceState(handler: Handler<PopStatePayload>) {
    return this.on('replacestate', handler);
  }

  /**
   * 监听路由变化
   */
  onHistoryChange(handler: Handler<HistoryChangePayload>) {
    return this.on('historychange', handler);
  }

  /**
   * 监听路由 hash 变化
   */
  onHistoryHashChange(handler: Handler<HistoryHashChangePayload>) {
    return this.on('historyhashchange', handler);
  }
}

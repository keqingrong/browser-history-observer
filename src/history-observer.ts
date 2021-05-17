import mitt, { Handler } from 'mitt';
import { PushStateEventDetail } from './event';
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
  private debug = false;
  private emitter = mitt();
  private eventTarget: EventTarget = interceptHistory();

  constructor(options: Partial<Options> = {}) {
    if (options.debug) {
      this.debug = options.debug;
    }
    this.subscribe();
  }

  private subscribe = () => {
    const et = this.eventTarget;
    et.addEventListener('pushstate', this.onPushStateInternal, false);
    et.addEventListener('replacestate', this.onReplaceStateInternal, false);

    window.addEventListener('load', this.onLoadInternal, false);
    window.addEventListener('popstate', this.onPopStateInternal, false);
    window.addEventListener('hashchange', this.onHashChangeInternal, false);
  };

  private unsubscribe = () => {
    const et = this.eventTarget;
    et.removeEventListener('pushstate', this.onPushStateInternal, false);
    et.removeEventListener('replacestate', this.onReplaceStateInternal, false);

    window.removeEventListener('load', this.onLoadInternal, false);
    window.removeEventListener('popstate', this.onPopStateInternal, false);
    window.removeEventListener('hashchange', this.onHashChangeInternal, false);
  };

  /**
   * 发送消息
   */
  private emit = (type: EventType, payload: any) => {
    this.debug && log(type, payload);
    this.emitter.emit(type, payload);
  };

  /**
   * 监听 `load` 事件
   */
  private onLoadInternal = () => {
    const type = 'load';
    const payload = { url: window.location.href };
    this.emit(type, payload);
    this.onHistoryChangeInternal({ type, state: null, ...payload });
  };

  /**
   * 监听 `popstate` 事件
   */
  private onPopStateInternal = (event: PopStateEvent) => {
    const type = 'popstate';
    const payload = { url: window.location.href, state: event.state };
    this.emit(type, payload);
    this.onHistoryChangeInternal({ type, ...payload });
  };

  /**
   * 监听 `history.pushState()` 操作
   */
  private onPushStateInternal = (event: Event) => {
    const { detail } = event as CustomEvent<PushStateEventDetail>;
    const { oldURL, newURL, state } = detail;
    const type = 'pushstate';
    const payload = { url: window.location.href, state };
    this.emit(type, payload);
    this.onHistoryChangeInternal({ type, ...payload });
    if (!isHashEqual(oldURL, newURL)) {
      this.onHistoryHashChangeInternal({ type, oldURL, newURL });
    }
  };

  /**
   * 监听 `history.replaceState()` 操作
   */
  private onReplaceStateInternal = (event: Event) => {
    const { detail } = event as CustomEvent<PushStateEventDetail>;
    const { oldURL, newURL, state } = detail;
    const type = 'replacestate';
    const payload = { url: window.location.href, state };
    this.emit(type, payload);
    this.onHistoryChangeInternal({ type, ...payload });
    if (!isHashEqual(oldURL, newURL)) {
      this.onHistoryHashChangeInternal({ type, oldURL, newURL });
    }
  };

  /**
   * 监听合成的 `historychange` 事件
   */
  private onHistoryChangeInternal = (params: HistoryChangePayload) => {
    const { type, url, state } = params;
    const syntheticType = 'historychange';
    const payload = { type, url, state };
    this.emit(syntheticType, payload);
  };

  /**
   * 监听 `hashchange` 事件
   */
  private onHashChangeInternal = (event: HashChangeEvent) => {
    const { oldURL, newURL } = event;
    const type = 'hashchange';
    const payload = { oldURL, newURL };
    this.emit(type, payload);
    this.onHistoryHashChangeInternal({ type, ...payload });
  };

  /**
   * 监听合成的 `historyhashchange` 事件
   */
  private onHistoryHashChangeInternal = (params: HistoryHashChangePayload) => {
    const { type, oldURL, newURL } = params;
    const syntheticType = 'historyhashchange';
    const payload = { type, oldURL, newURL };
    this.emit(syntheticType, payload);
  };

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

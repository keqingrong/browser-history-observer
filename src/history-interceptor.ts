import { PushStateEventDetail } from './event';

const ps = Object.getOwnPropertyDescriptor(History.prototype, 'pushState');
const rs = Object.getOwnPropertyDescriptor(History.prototype, 'replaceState');

let oldPushState = history.pushState;
let oldReplaceState = history.replaceState;

/**
 * 拦截 `history.pushState()`/`history.replaceState()` 补发自定义事件
 */
export function interceptHistory(overwrite = false) {
  const eventTarget = new EventTarget();

  if (ps && ps.configurable && typeof ps.value === 'function') {
    oldPushState = history.pushState;
    const pushState = overwrite
      ? (ps.value as History['pushState'])
      : oldPushState;
    Object.defineProperty(history, 'pushState', {
      configurable: true,
      enumerable: true,
      value: (data: any, title: string, url?: string | null) => {
        const oldURL = window.location.href;
        pushState.call(history, data, title, url);
        eventTarget.dispatchEvent(
          new CustomEvent<PushStateEventDetail>('pushstate', {
            detail: {
              state: data,
              oldURL,
              newURL: window.location.href
            }
          })
        );
      },
      writable: true
    });
  } else {
    console.error('[history-interceptor] 不支持拦截 `history.pushState()`');
  }

  if (rs && rs.configurable && typeof rs.value === 'function') {
    oldReplaceState = history.replaceState;
    const replaceState = overwrite
      ? (rs.value as History['replaceState'])
      : oldReplaceState;
    Object.defineProperty(history, 'replaceState', {
      configurable: true,
      enumerable: true,
      value: (data: any, title: string, url?: string | null) => {
        const oldURL = window.location.href;
        replaceState.call(history, data, title, url);
        eventTarget.dispatchEvent(
          new CustomEvent<PushStateEventDetail>('replacestate', {
            detail: {
              state: data,
              oldURL,
              newURL: window.location.href
            }
          })
        );
      },
      writable: true
    });
  } else {
    console.error('[history-interceptor] 不支持拦截 `history.replaceState()`');
  }

  return eventTarget;
}

/**
 * 恢复 `history.pushState()`/`history.replaceState()` 原始行为
 */
export function undoInterceptHistory(overwrite = false) {
  if (ps && ps.configurable && typeof ps.value === 'function') {
    const pushState = overwrite
      ? (ps.value as History['pushState'])
      : oldPushState;
    Object.defineProperty(history, 'pushState', {
      configurable: true,
      enumerable: true,
      value: pushState.bind(history),
      writable: true
    });
  } else {
    console.error('[history-interceptor] 不支持拦截 `history.pushState()`');
  }

  if (rs && rs.configurable && typeof rs.value === 'function') {
    const replaceState = overwrite
      ? (rs.value as History['replaceState'])
      : oldReplaceState;
    Object.defineProperty(history, 'replaceState', {
      configurable: true,
      enumerable: true,
      value: replaceState.bind(history),
      writable: true
    });
  } else {
    console.error('[history-interceptor] 不支持拦截 `history.replaceState()`');
  }
}

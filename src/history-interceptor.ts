import { PushStateEventDetail } from './event';

/**
 * 拦截 `history.pushState()`/`history.replaceState()` 补发自定义事件
 */
export function interceptHistory() {
  const ps = Object.getOwnPropertyDescriptor(History.prototype, 'pushState');
  const rs = Object.getOwnPropertyDescriptor(History.prototype, 'replaceState');

  if (ps && ps.configurable && typeof ps.value === 'function') {
    const pushState = ps.value as History['pushState'];
    Object.defineProperty(history, 'pushState', {
      configurable: true,
      enumerable: true,
      value: (data: any, title: string, url?: string | null) => {
        const oldURL = window.location.href;
        pushState.call(history, data, title, url);
        window.dispatchEvent(
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
    console.error('[interceptHistory] 不支持拦截 `history.pushState()`');
  }

  if (rs && rs.configurable && typeof rs.value === 'function') {
    const replaceState = rs.value as History['replaceState'];
    Object.defineProperty(history, 'replaceState', {
      configurable: true,
      enumerable: true,
      value: (data: any, title: string, url?: string | null) => {
        const oldURL = window.location.href;
        replaceState.call(history, data, title, url);
        window.dispatchEvent(
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
    console.error('[interceptHistory] 不支持拦截 `history.replaceState()`');
  }
}

/**
 * 恢复 `history.pushState()`/`history.replaceState()` 原始行为
 */
export function undoInterceptHistory() {
  const ps = Object.getOwnPropertyDescriptor(History.prototype, 'pushState');
  const rs = Object.getOwnPropertyDescriptor(History.prototype, 'replaceState');

  if (ps && ps.configurable && typeof ps.value === 'function') {
    const pushState = ps.value as History['pushState'];
    Object.defineProperty(history, 'pushState', {
      configurable: true,
      enumerable: true,
      value: pushState.bind(history),
      writable: true
    });
  } else {
    console.error('[undoInterceptHistory] 不支持拦截 `history.pushState()`');
  }

  if (rs && rs.configurable && typeof rs.value === 'function') {
    const replaceState = rs.value as History['replaceState'];
    Object.defineProperty(history, 'replaceState', {
      configurable: true,
      enumerable: true,
      value: replaceState.bind(history),
      writable: true
    });
  } else {
    console.error('[undoInterceptHistory] 不支持拦截 `history.replaceState()`');
  }
}

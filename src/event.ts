export interface PushStateEventDetail {
  state: any;
  newURL: string;
  oldURL: string;
}

export interface PushStateEventInit extends EventInit {
  state?: any;
  newURL?: string;
  oldURL?: string;
}

export class PushStateEvent extends PopStateEvent {
  get [Symbol.toStringTag]() {
    return 'PushStateEvent';
  }

  oldURL = '';
  newURL = '';
  state = null;

  constructor(typeArg: string, eventInitDict?: PushStateEventInit) {
    super(typeArg, eventInitDict);

    if (eventInitDict) {
      const { oldURL = '', newURL = '', state = null } = eventInitDict;
      this.oldURL = oldURL;
      this.newURL = newURL;
      this.state = state;
    }
  }
}

export class ReplaceStateEvent extends PushStateEvent {
  get [Symbol.toStringTag]() {
    return 'ReplaceStateEvent';
  }
}

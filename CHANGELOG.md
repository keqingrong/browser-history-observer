# CHANGELOG

## v0.2.0 (2021-05-17)

1. Fix `this` is `undefined` in `this.emit()`
2. Degrade custom events from inheriting `PopStateEvent` to `new CustomEvent` for class fields compatibility issues
3. Dispatch custom events with `new EventTarget` instead of `window`

## v0.1.0 (2021-05-16)

1. Initial release

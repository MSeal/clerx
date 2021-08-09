# clerx 💁

A Timely Suite of RxJS Operators and Observables

## Install

```
npm install clerx
```

[Try out the example](https://stackblitz.com/edit/ugxk9f-c24puf?devtoolsheight=33&file=index.ts)

## Operators

### `rateLimiter`

Defer sending events if `count` events occur within `slidingWindowTime`. Optionally,
stop deferring if the wait time goes past `timeoutDue`.

## Observables

### `postDelay`

Creates an observable that emits the `event` then waits `dueTime` before
closing the observable, like so:

```
event--{ dueTime }--|
```

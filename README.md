# clerx 💁

A Timely Suite of RxJS Operators and Observables

## Install

```
npm install clerx
```

[Try out the example](https://stackblitz.com/edit/ugxk9f-c24puf?devtoolsheight=33&file=index.ts)

## Operators

### `rateLimiter(count, slidingWindowTime)`

Defer sending events if `count` events occur within `slidingWindowTime`. Optionally,
stop deferring if the wait time goes past `timeoutDue`.

#### Examples

**Only two events within three ticks**

```
abcdef--g-|

> rateLimiter(2, 3)

ab-cd-ef-g--|
```

![image](https://user-images.githubusercontent.com/836375/128750726-76d84850-3fdb-46b8-a4d6-4cb08de1f8d4.png)

**Only one event within five ticks**

```
-(abc)def

> rateLimiter(1, 5)

-a----b----c----d----e----f----
```

![image](https://user-images.githubusercontent.com/836375/128751509-fc2601f9-f313-4c75-bd50-0f3b4c93fa24.png)

## Observables

### `postDelay(event: T, dueTime): Observable<T>`

Creates an observable that emits the `event` then waits `dueTime` before
closing the observable, like so:

```
event--{ dueTime }--|
```

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

**Only two events within three seconds**

```
abcdef--g---

> rateLimiter(2, 3000)

ab-cd-ef-g--
```

![rate-limiter](https://user-images.githubusercontent.com/836375/128755753-a8fc35d1-3f28-47b6-b4a3-c6b1a9115dde.png)

**Only one event within five seconds**

```
-(abc)def

> rateLimiter(1, 5000)

-a----b----c----d----e----f----
```

![rate-limit-five-tick](https://user-images.githubusercontent.com/836375/128755783-81846f03-3d23-4bfd-a4e8-7f4685e84cc5.png)

## Observables

### `postDelay(event: T, dueTime): Observable<T>`

Creates an observable that emits the `event` then waits `dueTime` before
closing the observable, like so:

```
event--{ dueTime }--|
```

**Delay 5 seconds after emitting an event**

```
> postDelay("a", 5000)

a----|
```

![post-delay](https://user-images.githubusercontent.com/836375/128756533-e76982b2-0e6c-417d-827f-06cb9cfe22ec.png)

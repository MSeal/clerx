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

![image](https://user-images.githubusercontent.com/836375/128755519-03754982-7b25-4057-9ab6-4030ecace685.png)

**Only one event within five seconds**

```
-(abc)def

> rateLimiter(1, 5000)

-a----b----c----d----e----f----
```

![image](https://user-images.githubusercontent.com/836375/128753824-c10c7ce8-ecaf-462e-83af-72b1c8dcc91d.png)

## Observables

### `postDelay(event: T, dueTime): Observable<T>`

Creates an observable that emits the `event` then waits `dueTime` before
closing the observable, like so:

```
event--{ dueTime }--|
```

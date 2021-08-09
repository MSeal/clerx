import { Observable, EMPTY, TimeoutError } from "rxjs";

import {
  mergeMap,
  tap,
  finalize,
  mergeMapTo,
  timeout,
  catchError,
} from "rxjs/operators";

import { Semaphore } from "./semaphore";
import { postDelay } from "./post-delay";

/**
 * Defer sending events if {count} events occur within {slidingWindowTime}. Optionally,
 * stop deferring if the wait time goes past {timeoutDue}
 *
 * @param count number of items allowed within the window
 * @param slidingWindowTime the length of the window to count items in
 * @param timeoutDue the maximum length to delay before dropping events
 * @returns Observable
 */
export function rateLimiter<T>(
  count: number,
  slidingWindowTime: number,
  timeoutDue?: number
) {
  const semaphore = new Semaphore(count);
  return (source: Observable<T>): Observable<T> => {
    return source.pipe(
      mergeMap((event: T) => {
        // Acquire a lock so we can send our event
        return semaphore.acquire().pipe(
          // If it doesn't get the lock in time, drop the event so we aren't clogging memory up
          timeoutDue ? timeout(timeoutDue) : tap(),

          mergeMapTo(
            // Send the event and then wait {slidingWindowTime} to release the lock
            postDelay(event, slidingWindowTime).pipe(
              finalize(() => {
                // Release the lock once the post delay timer is finished
                semaphore.release();
              })
            )
          ),
          catchError((err) => {
            if (err instanceof TimeoutError) {
              // Drop the event
              return EMPTY;
            } else {
              // If it's an entirely different kind of error, something is *very* wrong
              throw err;
            }
          })
        );
      })
    );
  };
}

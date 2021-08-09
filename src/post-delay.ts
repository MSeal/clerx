import { merge, of, timer, EMPTY, Observable } from "rxjs";

import { mergeMapTo } from "rxjs/operators";

/**
 * Creates an observable that emits the {event} then waits {dueTime} before
 * closing the observable, like so:
 *
 *       event--{ dueTime }--|
 *
 * @param event T
 * @param dueTime duration to delay after the {event} is sent
 * @returns Observable<T>
 */
export function postDelay<T>(event: T, dueTime: number): Observable<T> {
  return merge(of(event), timer(dueTime).pipe(mergeMapTo(EMPTY)));
}

import { Observable, of, timer } from "rxjs";
import { expand, mapTo } from "rxjs/operators";

/**
 * Each iteration will be 2x the previous iteration
 */
export function exponentialBackoffDelay(
  iteration: number,
  initialInterval: number
) {
  return Math.pow(2, iteration) * initialInterval;
}

export interface IntervalBackoffConfig {
  initialInterval: number;
  maxInterval?: number;
}
/**
 * Creates an Observable that emits sequential numbers in an exponentially
 * increasing interval of time.
 */
export function intervalBackoff(
  backoff: number | IntervalBackoffConfig
): Observable<number> {
  let { initialInterval, maxInterval = Infinity } =
    typeof backoff === "number" ? { initialInterval: backoff } : backoff;

  initialInterval = initialInterval < 0 ? 0 : initialInterval;

  // Start at the 0th iteration
  return of(0).pipe(
    expand((iteration) =>
      // On each iteration we delay using a power of the current interval
      timer(
        Math.min(
          exponentialBackoffDelay(iteration, initialInterval),
          // The biggest we allow our interval to be is `maxInterval`,
          // so the user doesn't get stuck waiting infinitely
          maxInterval
        )
      )
        // After the timer emits, we're on the next iteration
        .pipe(mapTo(iteration + 1))
    )
  );
}

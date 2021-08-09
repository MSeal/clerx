import { BehaviorSubject, Observable } from "rxjs";

import { take, tap, filter, mapTo } from "rxjs/operators";

// This may not technically match the definition of a semaphore, but it's a similar primitive here
export class Semaphore {
  private counter: number;
  private counter$: BehaviorSubject<number>;
  private available: any;

  constructor(count: number) {
    // Track how many
    this.counter = count;
    this.counter$ = new BehaviorSubject(this.counter);

    this.available = this.counter$.pipe(filter(() => this.counter > 0));
  }

  acquire(): Observable<Semaphore> {
    return this.available.pipe(
      take(1),
      tap(() => {
        this.counter = this.counter - 1;
        this.counter$.next(this.counter);
      }),
      mapTo(this)
    );
  }

  release() {
    this.counter = this.counter + 1;
    this.counter$.next(this.counter);
  }
}
